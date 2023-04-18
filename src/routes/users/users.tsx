import { FormEvent, useState } from 'react';
import { Masterpage } from '../../components';
import { UserList } from './components/user-list';
import { usersUiStore } from './users.route';

export function Users() {
  const { state, update } = usersUiStore.useContext();

  const [username, setUsername] = useState(state.username);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update({ username });
  };

  return (
    <Masterpage>
      <form onSubmit={handleSubmit}>
        <h1>{state.username}</h1>
        <input value={username || ''} onChange={e => setUsername(e.target.value)} />
        <button type="submit">Update Name</button>
      </form>
      <UserList></UserList>
    </Masterpage>
  );
}
