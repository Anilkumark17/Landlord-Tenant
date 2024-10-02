import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "../db/appWriteClient"; // Ensure the import path is correct

const ProtectedRouter = () => {
  const [userData, setUserData] = useState(null); // Renamed to userData for clarity
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = await account.get(); // Fetch the current user
        setUserData(user); // Set userData state if authenticated
      } catch (err) {
        console.error("Authentication error:", err); // Improved error logging
        setUserData(null); // Set userData to null if authentication fails
      } finally {
        setLoading(false); // Set loading to false after checking
        // my pull request
      }
    };

    checkAuthentication(); // Call the authentication check
  }, []); // Empty dependency array means this runs once on component mount

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>; 
  }

  // Navigate based on authentication status
  return userData ? <Outlet /> : <Navigate to="/login" />; 
};

export default ProtectedRouter;
