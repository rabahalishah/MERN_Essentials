import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  //here by using this "state={{from : location}} replace" we are making our browser to the location where the user is coming from.
  // for example for unauthorized user he will be directed to login page if he try to access the protected routes. Now from login page
  // If he press back button then he should go back the page from he was coming from.
};

// here auth?.roles?.find((role) => allowedRoles?.includes(role)) "role" is the each role in "roles" array coming from backend and comparing each value by looping over
// allowedRoles (array which we will provide)
export default RequireAuth;
