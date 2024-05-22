import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    if(user) return children;
    if(loading){
        return <p>Loading hocche</p>
    }
    
    return <Navigate to="/login" state={location.pathname} replace></Navigate>
    
};

export default PrivateRoutes;