import { useEffect, useState } from 'react';

export const useResize = () => {
  const [isPhone, setIsPhone] = useState(
    window.innerWidth < 768 ? true : false
  );

  const handleResize = () => {
    if (window.innerWidth >= 768) setIsPhone(false);
    else setIsPhone(true);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return { isPhone };
};
