import mutate from 'pages/api';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { produce } from 'immer';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';

interface Props {
  close: () => void;
  data?: any;
}

const CreateProduct = ({ close, data }: Props) => {
  const [formData, setFormData] = useState({ name: data?.name ?? '' });

  const { mutate: createOrUpdateProduct } = useMutation((data: any) => mutate('createorupdateproduct', data), {
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
    if (data) {
      return createOrUpdateProduct({ name: formData.name, id: data.id });
    }
    createOrUpdateProduct(formData);
  };

  return (
    <Modal title="Create Organisation" close={close}>
      <form onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <div className="mt-2">
          <Button>Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateProduct;
