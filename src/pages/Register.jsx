import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchema } from "../validations/AuthValidation";
import { RegisterAPi } from "../db/Landlord/LandLordProfile";
import { registerUser } from "../db/Auth/UserAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  // Submission handler
  const onSubmit = async (data) => {
    const { name, email, password, role } = data;

    try {
      await RegisterAPi({ name, email, password, role });
      const response = await registerUser(name, email, password);

      console.log("User registered successfully:", response);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Input */}
        <input {...register("name")} placeholder="User name" />
        {errors.name && <p>{errors.name.message}</p>}

        {/* Email Input */}
        <input {...register("email")} placeholder="Enter user email" />
        {errors.email && <p>{errors.email.message}</p>}

        {/* Password Input */}
        <input
          type="password"
          {...register("password")}
          placeholder="Enter the password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        {/* Role Select */}
        <select id="role" {...register("role")}>
          <option value="" label="Select role" />
          <option value="landlord" label="Landlord" />
          <option value="tenant" label="Tenant" />
        </select>
        {errors.role && <p>{errors.role.message}</p>}

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
