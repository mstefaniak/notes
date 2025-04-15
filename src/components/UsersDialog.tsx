import { ForwardedRef, forwardRef } from "react";

interface Props {
  isOpen: boolean;
  position: {
    top: number;
    left: number;
  };
  searchPhrase: string;
}

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
  { id: 4, name: "Jane Smith" },
];

export const UsersDialog = forwardRef(function UsersDialog(
  { isOpen, position, searchPhrase }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const visibleUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchPhrase.toLowerCase()) // TODO: add limit (max 5)
  );

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
      {visibleUsers.map((user, index) => (
        <div key={user.id} className="user" tabIndex={index}>
          {user.name}
        </div>
      ))}
    </div>
  );
});
