import mutate from 'pages/api';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { produce } from 'immer';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';

interface Props {
  close: () => void;
  id: string;
}

const CreateLicense = ({ close, id }: Props) => {
  const [formData, setFormData] = useState({ publicPrivateId: id, expiry: '', count: '1', name: '', email: '' });

  const { mutate: createLicense } = useMutation((data: any) => mutate('generatelicense', data), {
    onSuccess: () => {
      close();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement & { name: any; value: any }>) => {
    setFormData(
      produce((draft) => {
        draft[e.target.name] = e.target.name === 'count' ? +e.target.value : e.target.value;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createLicense(formData);
  };

  return (
    <Modal title="Create License" close={close}>
      <form onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
        <Input label="Expiry" name="expiry" type="date" value={formData.expiry} onChange={handleChange} />
        <Input label="Count" name="count" value={formData.count} onChange={handleChange} />
        <div className="mt-2">
          <Button>Submit</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateLicense;
