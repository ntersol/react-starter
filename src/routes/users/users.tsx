import { FormEvent, useState } from 'react';
import { Masterpage } from '../../components';
import { UserList } from './components/user-list';
import { Models, useUiStore } from '../../shared';

export function Users() {
  /**
  const uiState = useUiStore<Models.User>({
    id: 1,
    username: 'Test',
  });
  console.log(uiState);
   */
  /**
  const uiState2 = useUiGlobal;

  const [name2, setName2] = useState(uiState2.name);

  const handleSubmit2 = (e: FormEvent) => {
    e.preventDefault();
    uiState2.update({ name });
  };
   */

  // const uiState = useUiGlobal();
  // const [name, setName] = useState(uiState.Context.state.name);
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // uiState.Context.update({ name });
  };

  return (
    <Masterpage>
      <form onSubmit={handleSubmit}>
        <input value={name || ''} onChange={e => setName(e.target.value)} />
        <button type="submit">Update Name</button>
      </form>
      <UserList></UserList>
    </Masterpage>
  );
}
