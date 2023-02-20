import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { MdOutlineNoAccounts } from 'react-icons/md';

interface IProps {
  text: string;
  isFindAcc: boolean
}

const NoVideos = ({ text, isFindAcc }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-7xl'>
        {isFindAcc ?  <MdOutlineNoAccounts /> : <MdOutlineVideocamOff />}
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoVideos;