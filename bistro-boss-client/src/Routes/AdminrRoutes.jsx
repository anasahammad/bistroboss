import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";


const AdminrRoutes = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if(user &&  isAdmin) return children;
    if(loading || isAdminLoading){
        return <p>Loading hocche</p>
    }
    
    return <Navigate to="/" state={location.pathname} replace></Navigate>
};

export default AdminrRoutes;