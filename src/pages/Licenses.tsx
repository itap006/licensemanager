import Button from 'components/Button';
import Copy from 'components/Copy';
import Divider from 'components/Divider';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CreateLicense from './forms/CreateLicense';

const Licenses = () => {
  const { id } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery<any[]>(`getlicenses/${id}`);

  return (
    <Container>
      <div>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      <div className="mt-2 flex flex-wrap">
        {data?.map((e) => (
          <div key={e.id} className="text-sm p-3 rounded mb-3 w-max ml-2 border border-solid border-gray-400">
            <div className="">Created: {e.createdDate}</div>
            <div className="w-60 break-words">Name: {e.name}</div>
            <div className="w-60 break-words">Email: {e.email}</div>
            <Divider />
            <div className="w-60 break-words text-xs">
              <Copy value={e.licenseKey} />
              {e.licenseKey}
            </div>
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
    </Container>
  );
};

export default Licenses;
