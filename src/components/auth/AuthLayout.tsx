
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  type: "login" | "signup" | "forgot";
}

const AuthLayout = ({ children, title, subtitle, type }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mentor-purple/10 to-mentor-lightPurple/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-3xl font-display font-bold text-mentor-purple">CareerCompass</h2>
          </Link>
          <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-gray-500">{subtitle}</p>
        </div>
        
        <div className="mt-8">
          {children}
        </div>
        
        <div className="text-center mt-6">
          {type === "login" && (
            <>
              <p className="text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-mentor-purple hover:underline">
                  Sign up
                </Link>
              </p>
              <p className="text-sm mt-2">
                <Link to="/forgot-password" className="font-medium text-mentor-purple hover:underline">
                  Forgot your password?
                </Link>
              </p>
            </>
          )}
          
          {type === "signup" && (
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-mentor-purple hover:underline">
                Sign in
              </Link>
            </p>
          )}
          
          {type === "forgot" && (
            <p className="text-sm">
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-mentor-purple hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
