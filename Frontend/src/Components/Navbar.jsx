import React from 'react'
import {useNavigate , Link} from 'react-router-dom'



const Navbar = () => {

    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("token") ? true : false;


    const handleLogout  = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }


  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      
      <Link to="/" className="text-xl font-bold hover:text-gray-300">Campaign Tracker</Link>

      <div className="flex gap-6 items-center">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Campaigns</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar