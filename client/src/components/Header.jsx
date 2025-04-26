import { BiUser } from "react-icons/bi";
import Logo from "./../assets/Logo.svg";
import { CgClose, CgMenuRight } from "react-icons/cg";

import { Link, useLocation } from "react-router-dom"; // Import useLocation hook
import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext"; // Import the AuthContext

import { PiDiamondsFourBold } from "react-icons/pi";

const navItems = [
  { item: "Plagiarism Checker", path: "/plagiarism-checker" },
  { item: "Summarize Text", path: "/summarize" },
];

const premiumBtn = "Get Premium";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { authData, logout } = useContext(AuthContext); // Access authData and logout function from context
  const location = useLocation(); // Get current location
  const headerRef = useRef(null); // Ref to the header element
  // Toggle blur class on the content
  const toggleBodyBlur = () => {
    const bodyContent = document.querySelector(".main-content"); // Select the main content (exclude header)
    if (bodyContent) {
      bodyContent.classList.toggle("blurred", isMenuOpen); // Apply blur when menu is open
    }
  };

  // Remove blur when the page route changes
  useEffect(() => {
    toggleBodyBlur(); // Remove the blur when location changes

    // Cleanup function to remove blur when the component unmounts
    return () => {
      const bodyContent = document.querySelector(".main-content");
      if (bodyContent) {
        bodyContent.classList.remove("blurred");
      }
    };
  }, [location, isMenuOpen]); // Depend on location and isMenuOpen state

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false); // Close the menu when route changes
  }, [location]); // Trigger when location changes (page navigation)

  // Close the menu when clicked outside the header
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMenuOpen(false); // Close menu if clicked outside header
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Listen for clicks outside

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to extract the first name from full name
  const getFirstName = (fullName) => {
    const nameParts = fullName.split(" "); // Split by space to get individual name parts
    return nameParts[0]; // Return the first name (first part)
  };

  // Modified logout function to close the menu
  const handleLogout = () => {
    logout(); // Call the original logout function
    setIsMenuOpen(false); // Explicitly close the menu on logout
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="container">
          <header
            ref={headerRef}
            className="flex justify-between items-center py-6 shadow-2xs px-6 xl:px-0 relative"
          >
            <Link to={"/"}>
              <img src={Logo} alt="Logo" className="w-36 md:w-40 lg:w-48" />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex font-poppins font-medium">
                {navItems.map((n, index) => (
                  <Link
                    to={n.path}
                    key={index}
                    className="text-gray-800 hover:text-main transition duration-150 px-3.5 py-2"
                  >
                    {n.item}
                  </Link>
                ))}
              </nav>
              <Link className="text-white flex items-center gap-1 font-poppins font-medium transition duration-150 px-3.5 py-2.5 bg-teal-500 rounded-lg hover:bg-teal-600">
                <PiDiamondsFourBold className="text-white" />
                {premiumBtn}
              </Link>

              {/* If logged in, display "Hello [First Name]" */}
              {authData ? (
                <div className="flex items-center space-x-2 text-gray-700 font-bona">
                  <Link
                    to={"/dashboard"}
                    className="flex place-items-center gap-2"
                  >
                    <span className="text-lg md:text-xl font-bold">
                      {getFirstName(authData.user.name)}{" "}
                    </span>
                    <span className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
                      <BiUser size={20} />
                    </span>
                  </Link>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="flex items-center space-x-2 text-gray-700 hover:cursor-pointer font-bona"
                >
                  <span className="text-lg md:text-xl font-bold">Login</span>
                  <span className="w-8 h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center">
                    <BiUser size={20} />
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex gap-6">
              <Link className="hidden sm:flex lg:hidden text-white font-poppins font-medium transition duration-150 px-3.5 py-2.5 bg-teal-500 rounded-lg hover:bg-teal-600">
                {premiumBtn}
              </Link>
              <button
                className="lg:hidden flex items-center text-gray-800 focus:outline-none font-poppins hover:cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="mr-2">Menu</span>

                {isMenuOpen ? (
                  <CgClose className="w-6 h-6" />
                ) : (
                  <CgMenuRight className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <>
                <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden z-10">
                  <nav className="flex flex-col items-center space-y-4 py-4 font-poppins">
                    {navItems.map((n, index) => (
                      <Link
                        to={n.path}
                        key={index}
                        className="text-gray-800 hover:text-main transition duration-150 px-3.5 py-2"
                      >
                        {n.item}
                      </Link>
                    ))}
                    <Link className="text-white sm:hidden font-poppins font-medium transition duration-150 px-3.5 py-2.5 bg-teal-500 rounded-lg hover:bg-teal-600">
                      {premiumBtn}
                    </Link>
                  </nav>
                  {/* If logged in, show Hello and Logout */}
                  {authData ? (
                    <div className="flex flex-col items-center space-y-4 py-4 font-bona border-t">
                      <span className="text-lg font-bold">
                        {getFirstName(authData.user.name)}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="w-full text-center text-lg font-bold py-4 text-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={"/login"}
                      className="flex items-center justify-center space-x-2 text-gray-700 w-full py-4 font-bona border-t"
                    >
                      <span className="text-lg font-bold">Login</span>
                      <span className="w-8 h-8 bg-[#D9D9D9] rounded-full flex items-center justify-center">
                        <BiUser size={20} />
                      </span>
                    </Link>
                  )}
                </div>
              </>
            )}
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
