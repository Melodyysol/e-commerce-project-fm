import { Link, useNavigate } from "react-router";
import Navbar from "../layouts/Navbar";
import { ThemeProvider } from "../contexts/ThemeContext";
import { useAuth } from "../custom-hooks/useAuth";
import { supabase } from "../lib/supabase";

const Header = () => {
  const navigate = useNavigate();
  const context = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-neutral text-neutral-content p-2 flex">
        <div className="flex mx-auto justify-center md:justify-end w-4/5 items-center gap-4">
          {context.user ? (
            <>
              <h1 className="text-[12px] sm:text-sm text-gray-400">
                Hello! {context.user?.email || "demo user"}
              </h1>

              <button
                onClick={handleLogout}
                className="hover:bg-blue-700 hover:text-white cursor-pointer font-bold text-blue-500 border border-blue-500 py-0.5 px-2 rounded-lg text-[12px] sm:text-sm transition-all duration-500"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[12px] sm:text-[14px] text-gray-300 cursor-pointer hover:underline transition-all duration-500"
              >
                Sign in/Guest
              </Link>
              <Link
                to="/register"
                className="text-[12px] sm:text-[14px] text-gray-300 cursor-pointer hover:underline transition-all duration-500"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </header>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    </>
  );
};

export default Header;
