import React from 'react';

type Props = {
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
} & React.InputHTMLAttributes<HTMLElement>;

const Input = ({ label, name, ...props }: Props) => {
  return (
    <div>
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} {...props} />
    </div>
  );
};

export default Input;
