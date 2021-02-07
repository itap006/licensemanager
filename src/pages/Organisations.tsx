import Button from 'components/Button';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import mutate from './api';
import CreateOrganisation from './forms/CreateOrganisation';

interface Props {}

const Organisations = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState<any>();

  const { data, refetch } = useQuery<any[]>('getorganisations');
  const { mutate: deleteOrganisation } = useMutation((data: number) => mutate('deleteorganisation/' + data, null, 'delete'), {
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <Container>
      <div>
        <Button variant="blue" onClick={() => setOpen(true)}>
          Create
        </Button>
      </div>
      <div className="mt-2">
        {data?.map((e) => (
          <div key={e.id} className="flex items-center mb-2">
            <div className="w-40">{e.name}</div>
            <i
              className="fa fa-edit ml-1 cursor-pointer text-blue-400"
              onClick={() => {
                setUpdateData(e);
                setUpdate(true);
              }}
            />
            <i
              className="fa fa-trash ml-1 cursor-pointer text-red-600"
              onClick={() => {
                if (!window.confirm('This will be deleted permanently! Continue?')) return;
                deleteOrganisation(e.id);
              }}
            />
          </div>
        ))}
      </div>
      {open && (
        <CreateOrganisation
          close={() => {
            refetch();
            setOpen(false);
          }}
        />
      )}
      {update && (
        <CreateOrganisation
          data={updateData}
          close={() => {
            refetch();
            setUpdate(false);
          }}
        />
      )}
    </Container>
  );
};

export default Organisations;
