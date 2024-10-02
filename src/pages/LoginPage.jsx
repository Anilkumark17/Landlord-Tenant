import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginValidator } from "../validations/AuthValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginUser } from "../db/Auth/UserAuth";
import { useNavigate } from "react-router-dom";
import { account } from "../db/appWriteClient";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  // Check for session on page load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get(); 
        console.log(session);
        if (session) {
          navigate("/home"); 
        }
      } catch (error) {
        console.log("No session found, prompting for login",error);
      }
    };

    checkSession();
  }, [navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await LoginUser(email, password);
      console.log(response, "login done");
      
      // Store session in local storage
      localStorage.setItem("session", JSON.stringify(response));

      navigate("/home"); // Redirect after login
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}{" "}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}{" "}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
