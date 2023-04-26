import { InputText } from 'primereact/inputtext';
import { FormEvent, useEffect, useState } from 'react';
import { Models, removeNils } from 'shared';

interface UserFormProps {
  user?: Models.User | null;
  userUpdated?: (user: Models.User) => void;
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

export function UserForm({ user, userUpdated }: UserFormProps) {
  const [userForm, setUser] = useState<Models.User>({ ...defaultUser });

  useEffect(() => {
    setUser({ ...defaultUser, ...user }); // On input, update user in form
  }, [user]);

  /**
   * Reset form state
   * @returns
   */
  const reset = () => setUser({ ...defaultUser });

  /**
   * Handle form submit
   * @param e
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    userUpdated && userUpdated(removeNils(userForm));
    reset();
  };

  return (
    <div>
      {userForm?.id && (
        <a style={{ float: 'right' }} onClick={() => reset()}>
          Cancel
        </a>
      )}

      <h3>{userForm?.id ? 'Update User' : ' Create User'}</h3>
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
        <p className="mb-0">
          <button type="submit">{userForm?.id ? 'Update User' : ' Create User'}</button>
        </p>
      </form>
    </div>
  );
}
