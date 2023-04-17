import { FormEvent, useState } from 'react';
import { Masterpage } from '../../components';
import { UserList } from './components/user-list';
import { Models, useUiStore } from '../../shared';

const uiState = useUiStore<Models.User>({
  id: 1,
  username: 'test@test.com',
});

export function Users() {
  console.log(uiState.Context().state, uiState.Context().state.username);
  const userContext = uiState.Context();
  /**
  const uiState = useUiStore<Models.User>({
    id: 1,
    username: 'Test',
  });
   console.log(uiState.Context());
 */
  const [username, setUsername] = useState(userContext.state.username);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(username);
    userContext.update({ username });
  };

  return (
    <uiState.Provider>
      <Masterpage>
        <form onSubmit={handleSubmit}>
          <h1>{userContext.state.username}</h1>
          <input value={username || ''} onChange={e => setUsername(e.target.value)} />
          <button type="submit">Update Name</button>
        </form>
        <UserList></UserList>
      </Masterpage>
    </uiState.Provider>
  );
}
