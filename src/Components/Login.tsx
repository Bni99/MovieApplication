import { useForm } from "react-hook-form";
import Header from "./Header";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

type FormValues = {
  userName?: string;
  userEmail: string;
  userPassword: string;
};

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const { register, control, handleSubmit } = useForm<FormValues>();

  const onSubmit = function (data: FormValues) {
    console.log(data);
  };

  const handleFormToggle = function () {
    setIsSigninForm((prev) => !prev);
  };

  return (
    <div>
      <div className="border-2 border-black h-20">
        <Header shouldShowSignInButton={true} />
      </div>
      <div
        className="border-2 border-black flex items-center justify-center"
        style={{
          height: `calc(100vh - 5rem)`,
        }}
      >
        <div className="border-2 border-black p-12">
          <h1 className="text-3xl font-bold pb-8 block">
            {isSigninForm ? "Sign In" : "Sign up"}
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-[30rem] gap-8"
            noValidate
          >
            {!isSigninForm && (
              <input
                type="text"
                className="p-3 border-2 border-gray-300 w-80 rounded-md"
                placeholder="Name"
                {...register("userName", {
                  required: {
                    value: true,
                    message: "userName is required",
                  },
                })}
              />
            )}

            <input
              type="email"
              className="p-3 border-2 border-gray-300 w-80 rounded-md"
              placeholder="Email"
              {...register("userEmail", {
                required: {
                  value: true,
                  message: "userEmail is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid user email",
                },
              })}
            />
            <input
              type="password"
              className="p-3 border-2 border-gray-300 w-80 rounded-md"
              placeholder="Password"
              {...register("userPassword", {
                required: {
                  value: true,
                  message: "userPassword is required",
                },
              })}
            />
            <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-3 font-semibold rounded transition-colors duration-200">
              {isSigninForm ? "Sign In" : "Sign Up"}
            </button>

            <p className="text-gray-600">
              {isSigninForm ? "New to MovieNight?" : "Already a user?"}{" "}
              <span
                className="font-bold cursor-pointer text-gray-700"
                onClick={handleFormToggle}
              >
                {isSigninForm ? "Sign up now" : "Sign In now"}
              </span>
            </p>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Login;
