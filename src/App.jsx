import "./App.css";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home"; // Ensure Home is imported
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ProtectedRouter from "./routes/ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} /> // Render the RouterProvider with the router
  );
}

export default App;
