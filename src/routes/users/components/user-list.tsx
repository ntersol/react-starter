import { Models } from 'shared';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function UserList({ users }: { users?: Models.User[] | null }) {
  return (
    <div>
      <DataTable value={users || []} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="ID"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Phone"></Column>
        <Column field="" header="Actions"></Column>
      </DataTable>
    </div>
  );
}
