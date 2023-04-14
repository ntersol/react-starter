import { useState } from 'react';
import { Masterpage } from '../../components';
import { createApiContext } from '../../shared';

interface User {
  name?: string | null;
  setName: (name: string) => void;
}

export function Users() {
  const users = createApiContext<User>(() => {
    const [name, setUserName] = useState<string | null>();
    return {
      name,
      setName: name => setUserName(name),
    };
  });
  console.log(users);

  return (
    <users.provider>
      <Masterpage>User page coming soon!</Masterpage>
    </users.provider>
  );
}
