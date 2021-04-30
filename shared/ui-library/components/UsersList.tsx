import { memo } from 'react';
import { User } from '../types/graphql';

interface Props {
  data: User[];
}

const UsersList: React.FC<Props> = ({ data }) => {
  return (
    <div className="listWrapper">
      {data && (
        <ol className="list">
          {data.map(({ id, name, email }: User) => (
            <li className="listItem" key={`user-list-item-${id}`}>
              ID: {id} &gt; {name} | {email}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default memo(UsersList);
