import { useUserRole } from '../hooks/useUserRole';
import { useRouter } from 'next/router';
import { useEffect } from 'react';  

const ProtectedRoute = ({ roles, children }) => {
  const userRole = useUserRole();
  
  const router = useRouter();
  console.log('userRole', userRole, roles);
  console.log('roles.includes(userRole)', roles.includes(userRole));

  useEffect(() => {
    if (userRole && !roles.includes(userRole)) {
      router.push('/'); // Redirect to an unauthorized page if the user's role is not allowed
    }
  }, [userRole]);

  return roles.includes(userRole) ? children : null;
};

export default ProtectedRoute;
