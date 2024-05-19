import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const {user, logout} = useAuth()
  const [carts] = useCart()
    const navLinks = <>
 <li><Link to="/">Home</Link></li>
 <li><Link to="/menu">Menu</Link></li>
 <li><Link to="/order/salad">Order Food</Link></li>
 <li><Link to="/">
 <button className="btn">
  <FaCartPlus/>
  <div className="badge badge-secondary">+{carts?.length}</div>
</button>
  </Link></li>

 
    {
      !user &&  (<>
     <li><Link to="/login">Login</Link></li>
     <li><Link to="/sign-up">Sign Up</Link></li>
      </> )
       
      
    }  
     
    </>
    return (
        <div>
           <div className="navbar fixed max-w-screen-xl mx-auto opacity-30 text-white z-10  bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {navLinks}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navLinks}
    </ul>
  </div>
  <div className="navbar-end">
    {
      user &&  (<>
      <img src={user?.photoURL}  className="w-12 h-12 tooltip tooltip-bottom rounded-full cursor-pointer" data-tip={user?.displayName} alt="" />
             <button className="btn btn-ghost" onClick={()=>logout()}>Logout</button>
      </>)
    }
   
  </div>
</div> 
        </div>
    );
};

export default Navbar;