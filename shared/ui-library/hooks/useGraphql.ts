import { useAddUserMutation, useGetUsersQuery, useOnUserAddedSubscription } from '..//types/graphql';

export const useAddUser = () => {
  const [addUserMutation, response] = useAddUserMutation();
  return { addUser: addUserMutation, ...response };
};

export const useGetUsers = () => {
  const { data, loading, error, refetch } = useGetUsersQuery();
  return { loading, error, users: data?.getUsers, refetch };
};

export const useOnUserAdded = () => {
  const { data } = useOnUserAddedSubscription();
  return data?.userAdded;
};
