import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ApiState, Models } from 'shared';
import { UserForm } from './components/user-form';
import { UserList } from './components/user-list';
import { usersStore } from './shared/stores/api.store';
import './users.page.scss';

export function Users() {
  const { data: usersData, state: usersState, refresh, reset, get, post, put, patch, remove } = usersStore.useContext();

  /** Stuff to do on load */
  useEffect(() => {}, []);

  const [user, setUser] = useState<Models.User | null>(null);

  /**
   * Delete a user
   * @param user
   */
  const deleteUser = (user: Models.User) => {
    const c = confirm(`Are you sure you want to remove ${user.name}?`);
    if (c) {
      remove(user);
    }
  };

  /**
   * Add/update a user
   * @param userUpdated
   */
  const upsertUser = (userUpdated: Models.User) => {
    userUpdated.id ? put(userUpdated) : post(userUpdated);
  };

  // UI Store
  // const { state, update } = routeUiStore.useContext();
  // const [username, setUsername] = useState(state.username);

  return (
    <div id="users-page">
      <Helmet>
        <title>Manage Users</title>
        <meta name="description" content="Starter Application for NTERSOL React projects" />
      </Helmet>
      <div className="page-content">
        <div className="container-fluid">
          <div style={{ float: 'right' }}>
            <Button onClick={() => refresh()}>Refresh</Button> <Button onClick={() => reset()}>Reset</Button>
          </div>
          <h1>Current Users</h1>
          {/**
          <form onSubmit={handleSubmit}>
            <h1>{state.username}</h1>
            <input value={username || ''} onChange={e => setUsername(e.target.value)} />
            <button type="submit">Update Name</button>
          </form>
          <hr />
           */}
          <div className="row">
            <div className="col col-12 col-md-8">
              <ApiState state={usersState}>
                <UserList users={usersData} editUser={setUser} deleteUser={deleteUser}></UserList>
              </ApiState>
            </div>
            <div className="col col-12 col-md-4">
              <Card>
                <UserForm user={user} userUpdated={upsertUser}></UserForm>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
