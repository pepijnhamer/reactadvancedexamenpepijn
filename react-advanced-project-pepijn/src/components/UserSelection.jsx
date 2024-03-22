export const UserSelection = ({ users, selectedUser, onUserChange }) => {
  return (
    <select value={selectedUser} onChange={onUserChange}>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
