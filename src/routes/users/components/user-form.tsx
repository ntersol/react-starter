import { InputText } from 'primereact/inputtext';
import { FormEvent, useState } from 'react';
import { Models, removeNils } from 'shared';

interface UserFormProps {
  user?: Models.User;
  createUser?: (user: Models.User) => void;
  updateUser?: (user: Models.User) => void;
}

const defaultUser: Models.User = {
  id: undefined,
  name: '',
  username: '',
  email: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    geo: {
      lat: '',
      lng: '',
    },
  },
  phone: '',
  website: '',
  company: {
    name: '',
    catchPhrase: '',
    bs: '',
  },
};

export function UserForm({ user, createUser, updateUser }: UserFormProps) {
  const [userForm, setUser] = useState<Models.User>(user || defaultUser);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('user', removeNils(userForm));
  };

  return (
    <div>
      <h3>Create User</h3>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Username</label>
          <br />
          <InputText value={userForm.name} onChange={e => setUser(userSrc => ({ ...userSrc, name: e.target.value }))} />
        </p>
        <p>
          <label>Email</label>
          <br />
          <InputText value={userForm.email} onChange={e => setUser(userSrc => ({ ...userSrc, email: e.target.value }))} />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
