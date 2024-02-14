import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useUserRole = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('details'));
    setUserRole(userDetails?.role);
  }, []);

  return userRole;
};
