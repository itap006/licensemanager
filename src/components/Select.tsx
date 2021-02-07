import React from 'react';

type Props = {
  label: string;
  options: any[];
  dataName: string;
  dataValue: string;
} & React.SelectHTMLAttributes<HTMLElement>;

const Select = ({ label, name, options = [], dataName, dataValue, ...props }: Props) => {
  return (
    <div>
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} {...props}>
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {options.map((e, i) => (
          <option key={i} value={e[dataValue]}>
            {e[dataName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
