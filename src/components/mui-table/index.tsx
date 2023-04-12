import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import style from './mui-table.module.css';
import { Models } from '$models';
const NUM_ITEMS = 25;

export default function MUITable() {
  const [JSONdata, setJSONdata] = useState<Models.IAdaptedMUIdata[] | any[]>([]);
  useEffect(() => {}, []);
  const url = `https://randomuser.me/api?results=${NUM_ITEMS}`;
  const fetchData = async (url: string) => {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setJSONdata(adaptToFourColumns(data.results));
      })
      .catch(e => console.log(`fetch error.  No network connection?  randomuser.me is down? error = ${e}`));
  };
  useEffect(() => {
    fetchData(url);
  }, []); // Empty array for 2nd arg means this will be called once in component lifecycle
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'phone',
        id: 'phone',
        header: 'Phone',
      },
    ],
    [],
  );
  const adaptToFourColumns = (data: Models.IResult[]): Models.IAdaptedMUIdata[] => {
    return data.map((user, i) => {
      const name = `${user.name.title} ${user.name.first} ${user.name.last}`;
      const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`;
      return {
        name: name.trim(),
        email: user.email.trim(),
        address: address.trim(),
        phone: user.phone.trim(),
      };
    });
  };

  return (
    <div id={style.container}>
      <MaterialReactTable
        columns={columns}
        data={JSONdata}
        enableColumnOrdering // enable some features
        enableStickyHeader
        initialState={{ pagination: { pageSize: 5, pageIndex: 0 } }}
      />
    </div>
  );
}
