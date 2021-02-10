import React from 'react';
import Toast from 'Utils/Toast';

interface Props {
  value: string;
}

const Copy = ({ value }: Props) => {
  return (
    <i
      className="far fa-copy cursor-pointer mr-1 text-blue-400 text-sm"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard
          .writeText(value)
          .then(() => Toast({ msg: 'copied', type: 'success' }))
          .catch(() => Toast({ msg: 'copy unsuccessful', type: 'warning' }));
      }}
    />
  );
};

export default Copy;
