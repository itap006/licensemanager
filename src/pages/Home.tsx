import Button from 'components/Button';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import mutate from './api';
import CreateOrganisation from './forms/CreateOrganisation';

interface Props {}

const Home = (props: Props) => {
  const history = useHistory();
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
    <div className="h-full overflow-auto">
      <div className="py-2 px-4">
        <Button variant="blue" onClick={() => setOpen(true)}>
          Create
        </Button>
      </div>
      <div className="mt-2 px-4">
        {data?.map((e) => (
          <div key={e.id} className="flex items-center mb-2">
            <div className="cursor-pointer w-40" onClick={() => history.push('/license/' + e.id)}>
              {e.name}
            </div>
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
    </div>
  );
};

export default Home;
