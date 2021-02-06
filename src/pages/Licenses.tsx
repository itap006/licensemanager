import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CreateLicense from './forms/CreateLicense';

interface Props {}

const Licenses = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery<any[]>('getlicenses/' + id);

  return (
    <div className="h-full overflow-auto">
      <div>
        <button onClick={() => setOpen(true)}>Create</button>
      </div>
      <div>
        {data?.map((e) => (
          <div>
            <div>Created: {e.createdDate}</div>
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
