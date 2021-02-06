import mutate from 'pages/api';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { produce } from 'immer';
import Modal from 'components/Modal';

interface Props {
  close: () => void;
  data?: any;
}

const CreateOrganisation = ({ close, data }: Props) => {
  const [formData, setFormData] = useState({ name: data?.name ?? '', passPhrase: '' });

  const { mutate: createOrUpdateOrganisation } = useMutation((data: any) => mutate('createorupdateorganisation', data), {
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
      return createOrUpdateOrganisation({ name: formData.name, id: data.id });
    }
    createOrUpdateOrganisation(formData);
  };

  return (
    <Modal title="Create Organisation" close={close}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name"></label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        {!data && (
          <div>
            <label htmlFor="passPhrase"></label>
            <input id="passPhrase" name="passPhrase" value={formData.passPhrase} onChange={handleChange} />
          </div>
        )}
        <div>
          <button>Submit</button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrganisation;
