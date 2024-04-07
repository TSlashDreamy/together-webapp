import { FC } from 'react';

import BottomBlob from '~/assets/svg/BottomBlob.svg?react';
import MiddleBlob from '~/assets/svg/MiddleBlob.svg?react';
import TopBlob from '~/assets/svg/TopBlob.svg?react';

const Blobs: FC = () => {
  return (
    <div className='fixed right-0 top-0 z-[-1]'>
      <BottomBlob className='absolute right-0' />
      <MiddleBlob className='absolute right-0' />
      <TopBlob className='absolute right-0' />
    </div>
  );
};

export default Blobs;
