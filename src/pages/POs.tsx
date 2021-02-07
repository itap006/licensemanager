import Button from 'components/Button';
import Key from 'components/Key';
import Container from 'layout/Container';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import mutate from './api';
import CreatePO from './forms/CreatePO';

interface Props {}

const POs = (props: Props) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const { data, refetch } = useQuery<any[]>('getproductorganisations');
  const { mutate: deletePO } = useMutation(
    ({ pId, oId }: any) => mutate('unlinkproductorganisation/' + pId + '/' + oId, null, 'delete'),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return (
    <Container>
      <div>
        <Button variant="blue" onClick={() => setOpen(true)}>
          Create
        </Button>
      </div>
      <div className="mt-2">
        {data?.map((e) => (
          <div key={`${e.productId}${e.organisationId}`} className="flex items-center mb-2">
            <div className="cursor-pointer w-40" onClick={() => history.push(`/license/${e.productId}/${e.organisationId}`)}>
              {e.organisation.name}-{e.product.name}
            </div>
            <Key keys={[e.publicKey, e.privateKey]} />
            <i
              className="fa fa-trash ml-1 cursor-pointer text-red-600"
              onClick={() => {
                if (!window.confirm('This will be deleted permanently! Continue?')) return;
                deletePO({ pId: e.productId, oId: e.organisationId });
              }}
            />
          </div>
        ))}
      </div>
      {open && (
        <CreatePO
          close={() => {
            refetch();
            setOpen(false);
          }}
        />
      )}
    </Container>
  );
};

export default POs;
