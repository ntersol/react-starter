import { FormEvent, useState } from 'react';
import { UserList } from './components/user-list';
import { routeUiStore } from './shared/stores/ui.store';

export function Users() {
  const { state, update } = routeUiStore.useContext();

  const [username, setUsername] = useState(state.username);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update({ username });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{state.username}</h1>
        <input value={username || ''} onChange={e => setUsername(e.target.value)} />
        <button type="submit">Update Name</button>
      </form>
      <UserList></UserList>
    </>
  );
}
