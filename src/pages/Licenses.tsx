import Button from 'components/Button';
import Divider from 'components/Divider';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CreateLicense from './forms/CreateLicense';

const Licenses = () => {
  const { id } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery<any[]>('getlicenses/' + id);

  return (
    <div className="h-full overflow-auto">
      <div className="py-2 px-4">
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      <div className="mt-2 px-4 flex flex-wrap">
        {data?.map((e) => (
          <div style={{ border: 'grey solid 0.1px' }} className="p-3 rounded mb-3 w-max ml-2">
            <div className="mb-2">Created: {e.createdDate}</div>
            <Divider />
            <textarea className="w-60 h-60">{e.licenseKey}</textarea>
          </div>
        ))}
      </div>
      {open && (
        <CreateLicense
          id={id}
          close={() => {
            refetch();
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Licenses;
