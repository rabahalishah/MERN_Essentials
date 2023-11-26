//This hook is just here to attach the interceptors with the new instance of axios that we created (axiosPrivate)
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        //checking authorization headers doesn't exist (means its a first request so adding token to it)
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          console.log("In useAxiosPrivate hook auth?.accessToken: ",auth?.accessToken)
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccesstoken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccesstoken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    // clearing function for removing the interceptors once our job has done
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate; //this hook will return an instance that we created but with attached interceptors
};

export default useAxiosPrivate;
