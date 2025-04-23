import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { getUsers } from "../utils/api";

export interface User {
  birthdate: number; // timestamp
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  location: Record<string, string>;
  phone_number: string;
  title: string;
  username: string;
}

interface Props {
  isOpen: boolean;
  onClick: (user: User) => void;
  position: {
    top: number;
    left: number;
  };
  searchPhrase: string;
}

export const UsersDialog = forwardRef(function UsersDialog(
  { isOpen, onClick, position, searchPhrase }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((fetchedUsers) => {
      setUsers(fetchedUsers);
    });
  }, []);

  const visibleUsers = users
    .filter(({ first_name, last_name }) => {
      const userName = `${first_name} ${last_name}`;
      return userName.includes(searchPhrase.toLowerCase());
    })
    .splice(0, 5);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="usersDialog"
      ref={ref}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {visibleUsers.map((user) => (
        <div key={user.username} className="user" onClick={() => onClick(user)}>
          {user.first_name} {user.last_name}
        </div>
      ))}
    </div>
  );
});
