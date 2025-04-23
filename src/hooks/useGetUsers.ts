import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { User } from "../types";

export const useGetUsers = (searchPhrase: string, maxUsers: number) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  if (searchPhrase.length === 0) {
    return users.splice(0, maxUsers);
  }

  return users
    .filter(({ first_name, last_name }) => {
      const userName = `${first_name} ${last_name}`;
      return userName.includes(searchPhrase.toLowerCase());
    })
    .splice(0, maxUsers);
};