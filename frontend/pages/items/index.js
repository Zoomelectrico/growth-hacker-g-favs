import React from 'react';
import { useRouter } from 'next/router';

const Items = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push('/items/[page]', '/items/1');
  });
  return <></>;
};

export default Items;
