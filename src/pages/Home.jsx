import { logoutUser } from "../db/Auth/UserAuth";

const Home = () => {
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      alert('Logged out successfully!');
      // Redirect user to login or home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
