import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { children } from 'react';

const PrivateRoute=({children})=>{
    const{ auth} = useAuth();
    return auth?.token ? children :<Navigate to ="/login"/>;

}
export default PrivateRoute;