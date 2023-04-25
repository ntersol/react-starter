import { FormEvent, useState } from 'react';
import { UserList } from './components/user-list';
import { routeUiStore } from './shared/stores/ui.store';
import { Helmet } from 'react-helmet-async';
import './users.page.scss';
import { usersStore } from './shared/stores/api.store';

export function Users() {
  const { state, update } = routeUiStore.useContext();
  const temp = usersStore.useContext();
  console.log(temp);

  const [username, setUsername] = useState(state.username);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    update({ username });
  };

  return (
    <div id="users-page">
      <Helmet>
        <title>Manage Users</title>
        <meta name="description" content="Starter Application for NTERSOL React projects" />
      </Helmet>
      <div className="page-content">
        <form onSubmit={handleSubmit}>
          <h1>{state.username}</h1>
          <input value={username || ''} onChange={e => setUsername(e.target.value)} />
          <button type="submit">Update Name</button>
        </form>

        <UserList></UserList>
      </div>
    </div>
  );
}
