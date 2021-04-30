import { Query, Resolver, Mutation, Arg, ID, Subscription, PubSub, PubSubEngine, Root, Args } from 'type-graphql';
import { User, UserInput } from '../schemas/User';

const defaultUser = {
  id: '-1',
  name: '',
  email: '',
  status: false,
};

@Resolver((of) => User)
class UserResolver {
  private users: User[] = [];

  @Query((returns) => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    return await this.users;
  }

  @Mutation((returns) => User)
  async addUser(@Arg('userInput') { name, email }: UserInput, @PubSub() pubSub: PubSubEngine): Promise<User> {
    const id = Math.random().toString(36).substring(8);
    const user = {
      id,
      name,
      email,
      status: false,
    };

    await this.users.push(user);
    await pubSub.publish('USER_ADDED', user);

    return user;
  }

  @Subscription({
    topics: 'USER_ADDED',
    defaultValue: defaultUser,
  })
  userAdded(@Root() payload: User): User {
    return payload;
  }
}

export default UserResolver;
