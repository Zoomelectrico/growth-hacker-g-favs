import React from 'react';
import { useRouter } from 'next/router';

const Items = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push('/users/favorites/[page]', '/users/favorites/1');
  });
  return <></>;
};

export default Items;
