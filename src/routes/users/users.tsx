import { FormEvent, useState } from 'react';
import { Masterpage } from '../../components';
import { UserList } from './components/user-list';
import { useUiGlobal } from '../../shared';

export function Users() {
  const uiState = useUiGlobal();
  const [name, setName] = useState(uiState.name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uiState.update({ name });
  };

  return (
    <Masterpage>
      {uiState.name}
      <form onSubmit={handleSubmit}>
        <input value={name || ''} onChange={e => setName(e.target.value)} />
        <button type="submit">Update Name</button>
      </form>
      <UserList></UserList>
    </Masterpage>
  );
}
