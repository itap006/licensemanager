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
      <div>
        <button onClick={() => setOpen(true)}>Create</button>
      </div>
      <div>
        {data?.map((e) => (
          <div key={e.id} className="flex items-center">
            <div
              className="cursor-pointer"
              onDoubleClick={() => {
                setUpdateData(e);
                setUpdate(true);
              }}
              onClick={() => history.push('/license/' + e.id)}
            >
              {e.name}
            </div>
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
