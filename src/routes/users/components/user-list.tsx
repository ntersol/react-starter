import { Models } from '$shared';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Link } from 'react-router-dom';

interface UserListProps {
  users?: Models.User[] | null;
  editUser?: (user: Models.User) => void;
  deleteUser?: (user: Models.User) => void;
}

export function UserList({ users, editUser, deleteUser }: UserListProps) {
  return (
    <div>
      {users?.length ? (
        <DataTable value={users || []} tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Name" body={user => <Link to={'view/' + user.id}>{user.name}</Link>}></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column
            field=""
            header="Actions"
            body={user => (
              <div>
                <a onClick={() => editUser && editUser(user)}>Edit User</a>
                <br />
                <a onClick={() => deleteUser && deleteUser(user)}>Delete User</a>
              </div>
            )}
          ></Column>
        </DataTable>
      ) : (
        <div>No users found</div>
      )}
    </div>
  );
}
