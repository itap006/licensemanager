import React, { useState } from 'react';

interface Props {
  keys: [string, string];
}

const Key = ({ keys }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <i
      className="fa fa-key text-blue-600 ml-1 cursor-pointer relative focus:outline-none"
      onClick={() => setShow(true)}
      onBlur={() => setShow(false)}
      tabIndex={-1}
    >
      {show && (
        <div className="absolute w-60 break-words rounded border border-solid border-gray-400 p-2 text-gray-500 text-sm cursor-text">
          <span className="text-green-400">Public</span>
          <div>{keys[0]}</div>
          <span className="text-red-500">Private</span>
          <div>{keys[1]}</div>
        </div>
      )}
    </i>
  );
};

export default Key;
