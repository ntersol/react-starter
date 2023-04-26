import { FormEvent, useEffect, useState } from 'react';
import { UserList } from './components/user-list';
import { routeUiStore } from './shared/stores/ui.store';
import { ApiState, Models } from 'shared';
import { Helmet } from 'react-helmet-async';
import './users.page.scss';
import { usersStore } from './shared/stores/api.store';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { UserForm } from './components/user-form';

export function Users() {
  const users = usersStore.useContext();
  const { data: usersData, state: usersState, refresh, reset, get, post, put, patch, remove } = users;

  /** Stuff to do on load */
  useEffect(() => {}, []);

  // UI Store
  // const { state, update } = routeUiStore.useContext();
  // const [username, setUsername] = useState(state.username);
  const [user, setUser] = useState<Models.User>({ name: '' });

  return (
    <div id="users-page">
      <Helmet>
        <title>Manage Users</title>
        <meta name="description" content="Starter Application for NTERSOL React projects" />
      </Helmet>
      <div className="page-content">
        <div className="container-fluid">
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
                <UserList users={usersData}></UserList>
              </ApiState>
            </div>
            <div className="col col-12 col-md-4">
              <Card>
                <UserForm></UserForm>
                <hr />
                <p>
                  <button onClick={() => refresh()}>Refresh</button>
                </p>
                <p>
                  <button onClick={() => refresh()}>Refresh</button>
                </p>
                <p>
                  <button onClick={() => reset()}>Reset</button>
                </p>
                <p>
                  <button
                    onClick={() =>
                      post({
                        name: 'Jane Doe',
                        username: 'Jane',
                        email: 'Jane@Jane.biz',
                      })
                    }
                  >
                    Create User
                  </button>
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
