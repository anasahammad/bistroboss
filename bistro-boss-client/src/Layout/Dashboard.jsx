import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils, FaVoicemail } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {

    const isAdmin = true;
    return (
        <div className="flex">
           <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">

                   {
                    isAdmin ? <>
                    
                    <li><NavLink to="/dashboard/adminHome">
                        <FaHome/>
                        Admin Home</NavLink></li>
                    <li><NavLink to="/dashboard/addItems">
                        <FaUtensils/>
                        Add Itmes</NavLink></li>
                    <li><NavLink to="/dashboard/manageItems">
                        <FaList/>
                        Manage Items</NavLink></li>
                    <li><NavLink to="/dashboard/manageBookings">
                        <FaBook/>
                        Manage Bookings</NavLink></li>
                    <li><NavLink to="/dashboard/users">
                        <FaUsers/>
                        All Users</NavLink></li>
                    </> : <>
                    <li><NavLink to="/dashboard/userHome">
                        <FaHome/>
                        User Home</NavLink></li>
                    <li><NavLink to="/dashboard/reservation">
                        <FaCalendar/>
                        Reservation</NavLink></li>
                    <li><NavLink to="/dashboard/cart">
                        <FaShoppingCart/>
                        My Cart</NavLink></li>
                    <li><NavLink to="/dashboard/review">
                        <FaAd/>
                        Add a Review</NavLink></li>
                    <li><NavLink to="/dashboard/bookings">
                        <FaList/>
                        My Bookings</NavLink></li>
                    
                    </>
                   }
                        <div className="divider"></div>
                            {/* Shared links */}
                        <li><NavLink to="/">
                        <FaHome/>
                         Home</NavLink></li>
                        <li><NavLink to="/menu">
                        <IoMenu/>
                         Menu</NavLink></li>
                        <li><NavLink to="/contact">
                        <FaVoicemail/>
                         Contact</NavLink></li>
                </ul>
            </div> 

            <div className="flex-1 p-8">
                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;