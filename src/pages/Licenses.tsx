import Button from 'components/Button';
import Divider from 'components/Divider';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CreateLicense from './forms/CreateLicense';

const Licenses = () => {
  const { pId, oId } = useParams<{ pId: string; oId: string }>();

  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery<any[]>(`getlicenses/${pId}/${oId}`);

  return (
    <Container>
      <div>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      <div className="mt-2 flex flex-wrap">
        {data?.map((e) => (
          <div className="p-3 rounded mb-3 w-max ml-2 border border-solid border-gray-400">
            <div className="mb-2">Created: {e.createdDate}</div>
            <Divider />
            <div className="w-60 break-words">{e.licenseKey}</div>
          </div>
        ))}
      </div>
      {open && (
        <CreateLicense
          ids={[pId, oId]}
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
