import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// apollo client graphql
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!, $role: Role!) {
    createUser(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
    }
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUser({ variables: { name, email, password, role } });
      // Manejar el éxito, por ejemplo, redirigir al usuario o mostrar un mensaje de éxito
    } catch (err) {
      console.error(err);
      // Manejar el error, por ejemplo, mostrar un mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <button type="submit" disabled={loading}>Register</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Register;
