import mutate from 'pages/api';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { produce } from 'immer';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import Select from 'components/Select';

interface Props {
  close: () => void;
  data?: any;
}

const CreatePO = ({ close }: Props) => {
  const [formData, setFormData] = useState({ productId: '', organisationId: '', passPhrase: '' });

  const { data: organisations } = useQuery<any[]>('getorganisations');
  const { data: products } = useQuery<any[]>('getproducts');

  const { mutate: linkProductToOrganisation } = useMutation((data: any) => mutate('LinkProductToOrganisation', data), {
    onSuccess: () => {
      close();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement & { name: any; value: any }>) => {
    setFormData(
      produce((draft) => {
        draft[e.target.name] = e.target.value;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    linkProductToOrganisation(formData);
  };

  return (
    <Modal title="Create Organisation" close={close}>
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
        <Input className="mt-2" label="PassPhrase" name="passPhrase" value={formData.passPhrase} onChange={handleChange} />
        <div className="mt-2">
          <Button>Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePO;
