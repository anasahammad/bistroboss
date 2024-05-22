import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart";
import PrivateRoutes from "./PrivateRoutes";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";

export const router = createBrowserRouter([ 
    { 
    path: "/", 
    element: <Main/>,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/menu',
            element: <Menu/>
        },
        {
            path: 'order/:category',
            element: <Order/>
        },
        
        {
            path: '/login',
            element: <Login/>
        }
        ,
        {
            path: '/sign-up',
            element: <SignUp/>
        }
    ] 
    }, 
    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard/></PrivateRoutes>,
        children: [
            {
                path: 'cart',
                element: <Cart/>
            },

            // Admin dashboard
            {
                path: 'users',
                element: <AllUsers/>
            }
        ]
    }
   ]); 