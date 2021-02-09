import Container from 'layout/Container';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import mutate from './api';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import { produce } from 'immer';

interface Props {}

const GenerateToken = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ expiryDate: '', productId: '', organisationId: '' });
  const { data, refetch } = useQuery<any>(`gettokensforlicensechange`);
  const { data: organisations } = useQuery<any[]>('getorganisations');
  const { data: products } = useQuery<any[]>('getproducts');

  const { mutate: generateToken } = useMutation((data: any) => mutate('generatetokenforlicensechange', data), {
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement & { name: any; value: any }>) => {
    setFormData(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    generateToken(formData);
  };

  return (
    <Container>
      <div>
        <Button onClick={() => setOpen(true)}>Create</Button>
      </div>
      <div>
        {data?.map((e: any) => (
          <div className="border border-solid border-gray-400 rounded" key={e.id}>
            <div>Created: {e.createdDate}</div>
            <div>Expiry: {e.expiryDate}</div>
            <div>Token: {e.guid}</div>
          </div>
        ))}
      </div>
      {open && (
        <Modal title="Generate Token" close={() => setOpen(false)}>
          <form onSubmit={handleSubmit}>
            <Select
              label="Organisation"
              placeholder="Organisation"
              name="organisationId"
              value={formData.organisationId}
              dataName="name"
              dataValue="id"
              onChange={handleChange}
              options={organisations || []}
            />
            <Select
              label="Product"
              placeholder="Product"
              name="productId"
              value={formData.productId}
              dataName="name"
              dataValue="id"
              onChange={handleChange}
              options={products || []}
              className="mt-2"
            />
            <Input label="Expiry" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} />
            <div className="mt-2">
              <Button>Submit</Button>
            </div>
          </form>
        </Modal>
      )}
    </Container>
  );
};

export default GenerateToken;
