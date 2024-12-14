// import React, { useState, useEffect, useRef } from 'react';

// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { User, ChevronDown } from 'lucide-react';
// import useAuthStore from '../store/authStore';

// const Navbar = () => {
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const { isAuthenticated, user, logout } = useAuthStore();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isHovering, setIsHovering] = useState(false);
//   const profileMenuRef = useRef(null);

//   // Get first name from full name
//   const firstName = user?.fullName?.split(' ')[0] || '';

//   useEffect(() => {
//     let timeoutId;
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
//       const isScrollingUp = prevScrollPos > currentScrollPos;
//       const isAtTop = currentScrollPos < 10;
//       const shouldShow = isScrollingUp || isAtTop || isHovering;

//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         setVisible(shouldShow);
//         setPrevScrollPos(currentScrollPos);
//       }, 50);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       clearTimeout(timeoutId);
//     };
//   }, [prevScrollPos, isHovering]);

//   // Handle clicks outside profile menu
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setShowProfileMenu(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setShowProfileMenu(false);
//     navigate('/');
//   };

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth' });
//     } else if (location.pathname !== '/') {
//       navigate('/', { state: { scrollTo: sectionId } });
//     }
//   };

//   return (
//     <nav
//       className={`fixed w-full z-50 bg-dark-100/80 backdrop-blur-md transition-all duration-300 ${
//         visible ? 'translate-y-0' : '-translate-y-full'
//       }`}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
//         <Link to="/" className="flex items-center">
//           <img
//             src="/logo.png"
//             alt="Logo"
//             className="h-12 w-auto"
//           />
//         </Link>

//         <div className="hidden md:flex items-center space-x-8">
//           <button
//             onClick={() => scrollToSection('home')}
//             className="text-white hover:text-accent-100 transition-colors"
//           >
//             Home
//           </button>
//           <button
//             onClick={() => scrollToSection('features')}
//             className="text-white hover:text-accent-100 transition-colors"
//           >
//             Features
//           </button>
//           <button
//             onClick={() => scrollToSection('about')}
//             className="text-white hover:text-accent-100 transition-colors"
//           >
//             About Us
//           </button>
//           {isAuthenticated && (
//             <Link
//               to="/dashboard"
//               className="text-white hover:text-accent-100 transition-colors"
//             >
//               Dashboard
//             </Link>
//           )}
//           <Link
//             to="/contact"
//             className="text-white hover:text-accent-100 transition-colors"
//           >
//             Contact
//           </Link>
//         </div>

//         <div className="flex items-center space-x-4">
//           {!isAuthenticated ? (
//             <>
//               <Link
//                 to="/signin"
//                 className="px-4 py-2 rounded-full text-white hover:text-accent-100 transition-colors"
//               >
//                 Sign In
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 hover:opacity-90 transition-opacity"
//               >
//                 Sign Up
//               </Link>
//             </>
//           ) : (
//             <div className="relative" ref={profileMenuRef}>
//               <button
//                 onClick={() => setShowProfileMenu(!showProfileMenu)}
//                 className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark-200/50 hover:bg-dark-300/50 transition-colors"
//               >
//                 <div className="w-8 h-8 rounded-full overflow-hidden">
//                   <img
//                     src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
//                     alt={user?.fullName}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="text-left">
//                   <p className="text-sm font-medium text-white">Hi, {firstName}</p>
//                   <p className="text-xs text-gray-400">ID: {user?.accountId}</p>
//                 </div>
//                 <ChevronDown className="w-4 h-4 text-gray-400" />
//               </button>

//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-200/90 backdrop-blur-sm">
//                   <div className="py-1">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-300/50"
//                       onClick={() => setShowProfileMenu(false)}
//                     >
//                       Profile Settings
//                     </Link>
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-300/50"
//                       onClick={() => setShowProfileMenu(false)}
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-dark-300/50"
//                     >
//                       Sign Out
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logout, setloginId } from "@/features/auth/authSlice";
import { useMeQuery } from "@/features/api/userApiSlice";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const { data: user } = useMeQuery();

  const { isAuthenticated } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.auth);

  const firstName = user?.me?.firstName || "User";

  useEffect(() => {
    if (user) {
      dispatch(
        setloginId({
          email: user.me.email,
          username: user.me.username,
        })
      );
    }
  }, [user]);

  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTopPosition = currentScrollPos < 10;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setVisible(isScrollingUp || isAtTopPosition);
        setPrevScrollPos(currentScrollPos);
        setIsAtTop(isAtTopPosition); // Update isAtTop state
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 ${
        isAtTop
          ? "bg-transparent" // Fully transparent at the top
          : "bg-dark-100/80 backdrop-blur-md" // Background with blur when scrolled
      } transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* <nav
      className={`${
        visible
          ? prevScrollPos === 0
            ? "relative"
            : "fixed"
          : "-translate-y-full"
      } w-full z-50 bg-dark-100/80 backdrop-blur-md transition-all duration-300`}
    > */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        {/* <Link to="/" className="flex items-center">
          <img
            src="/public/SacredSecret logo color-01.svg"
            alt="Logo"
            className="h-20 w-auto"
          />
        </Link> */}

        <Link to="/" className="flex items-center  rounded-lg ">
          <img
            src="/SacredSecret logo color white.svg"
            alt="Logo"
            className="h-20 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-white hover:text-accent-100 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="text-white hover:text-accent-100 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-white hover:text-accent-100 transition-colors"
          >
            About Us
          </button>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-white hover:text-accent-100 transition-colors"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/contact"
            className="text-white hover:text-accent-100 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Authentication/Profile */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 rounded-full text-white hover:text-accent-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full bg-accent-100 text-dark-100 hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              {/* Profile Button */}

              {user && (
                <>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-dark-200 hover:bg-dark-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent-100">
                      <img
                        src={
                          user?.me?.profileImgUrl
                          // ||
                          // "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                        }
                        alt={
                          user?.me?.firstName
                          // || "User"
                        }
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-white">
                        Hi, {firstName}
                      </p>
                      <p className="text-xs text-gray-400">
                        ID: {user?.me?.displayId}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark-300 border border-dark-400 sm:w-56 z-10">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-400 hover:text-white transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Profile Settings
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-400 hover:text-white transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-full left-0 w-full bg-dark-100/90 backdrop-blur-md rounded-lg shadow-lg z-10"
          ref={mobileMenuRef}
        >
          <div className="flex flex-col py-4 px-6 space-y-6">
            {/* Profile Section */}
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent-100">
                  <img
                    src={
                      user?.me?.profileImgUrl ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                    }
                    crossOrigin="anonymous"
                    alt={user?.me?.firstName || "User"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">
                    Hi, {firstName}
                  </p>
                  <p className="text-xs text-gray-400">
                    ID: {user?.me?.displayId || "N/A"}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              About Us
            </button>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-white hover:text-accent-100 transition-colors w-full text-left"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/contact"
              className="text-white hover:text-accent-100 transition-colors w-full text-left"
            >
              Contact
            </Link>

            {/* Profile Actions */}
            {isAuthenticated && (
              <div className="border-t border-dark-400 pt-4">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-300 hover:text-white transition-colors rounded-lg"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-500 hover:text-white transition-colors rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Authentication Links for Non-Authenticated Users */}
            {!isAuthenticated && (
              <div className="space-y-4">
                <Link
                  to="/signin"
                  className="block px-4 py-2 text-sm text-white hover:text-accent-100 transition-colors rounded-lg text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm bg-accent-100 text-dark-100 hover:opacity-90 transition-opacity rounded-lg text-center"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
