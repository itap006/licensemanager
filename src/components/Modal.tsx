import React from 'react';
import Close from './Close';
import Divider from './Divider';

interface Props {
  close: () => void;
  title?: string;
  children: any;
}

const Modal = ({ close, title, children }: Props) => {
  return (
    <div className="absolute h-full top-0 right-0 left-0 bg-white">
      <div className="px-4 py-2">{title}</div>
      <Divider />
      <div className="mt-4 px-4">{children}</div>
      <Close onClick={close} />
    </div>
  );
};

export default Modal;
