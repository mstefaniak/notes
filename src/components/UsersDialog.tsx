import { useGetUsers } from "../hooks/useGetUsers";
import { User } from "../types";
interface Props {
  isOpen: boolean;
  onClick: (user: User) => void;
  position: {
    top: number;
    left: number;
  };
  searchPhrase: string;
}

const MAX_USERS = 5;

export const UsersDialog = ({
  isOpen,
  onClick,
  position,
  searchPhrase,
}: Props) => {
  const users = useGetUsers(searchPhrase, MAX_USERS);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="usersDialog"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {users.map((user) => (
        <div key={user.username} className="user" onClick={() => onClick(user)}>
          {user.first_name} {user.last_name}
        </div>
      ))}
    </div>
  );
};
