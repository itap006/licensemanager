import React from 'react';
import Close from './Close';

interface Props {
  close: () => void;
  title?: string;
  children: any;
}

const Modal = ({ close, title, children }: Props) => {
  return (
    <div className="absolute h-full top-0 right-0 left-0 bg-white">
      <div>{title}</div>
      {children}
      <Close onClick={close} />
    </div>
  );
};

export default Modal;
