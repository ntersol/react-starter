import { FormEvent, useContext, useState } from 'react';
import { Masterpage } from '../../components';
import { UserList } from './components/user-list';
import { Models, useUiStore } from '../../shared';
import TodoProvider, { TodoContext, TodoContextType } from '../../shared/hooks/use-todo.hook';

export function Users() {
  /**
  const uiState = useUiStore<Models.User>({
    id: 1,
    username: 'test@test.com',
  });
 */
  const { saveTodo } = useContext(TodoContext) as TodoContextType;
  console.log(saveTodo);
  const [username, setUsername] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Masterpage>
      <form onSubmit={handleSubmit}>
        <h1>{username}</h1>
        <input value={username || ''} onChange={e => setUsername(e.target.value)} />
        <button type="submit">Update Name</button>
      </form>
      <UserList></UserList>
    </Masterpage>
  );
}
