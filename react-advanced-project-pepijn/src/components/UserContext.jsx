import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});
UserContext.displayName = "UserContext";

export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const usersData = await response.json();
      const parsedUsers = usersData.map((user) => ({
        ...user,
        id: parseInt(user.id),
      }));
      setUsers(parsedUsers);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>{children}</UserContext.Provider>
  );
};
