import React from 'react';

type Props = {
  children: any;
  variant?: 'blue';
} & React.ButtonHTMLAttributes<HTMLElement>;

const classes = {
  blue: 'bg-color2',
};

const Button = ({ children, className, variant = 'blue', ...props }: Props) => {
  return (
    <button className={`${classes[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
