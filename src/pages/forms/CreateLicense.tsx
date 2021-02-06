import mutate from 'pages/api';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { produce } from 'immer';
import Modal from 'components/Modal';

interface Props {
  close: () => void;
  id: string;
}

const CreateLicense = ({ close, id }: Props) => {
  const [formData, setFormData] = useState({ id, expiry: '' });

  const { mutate: createLicense } = useMutation((data: any) => mutate('generatelicense', data), {
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
    createLicense(formData);
  };

  return (
    <Modal title="Create License" close={close}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expiry"></label>
          <input id="expiry" name="expiry" type="date" value={formData.expiry} onChange={handleChange} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateLicense;
