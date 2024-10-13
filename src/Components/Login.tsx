import { useForm } from "react-hook-form";
import Header from "./Header";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./utils/firebase";

type FormValues = {
  userName?: string;
  userEmail: string;
  userPassword: string;
};

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const { register, control, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = function ({
    userName,
    userEmail,
    userPassword,
  }: FormValues) {
    if (isSigninForm) {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  const handleFormToggle = function () {
    setIsSigninForm((prev) => !prev);
  };

  return (
    <div>
      <div className="border-2 border-black h-20">
        <Header />
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
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  className="p-3 border-2 border-gray-300 w-80 rounded-md"
                  placeholder="Name"
                  {...register("userName", {
                    required: {
                      value: true,
                      message: "user name is required",
                    },
                  })}
                />

                <span className="text-sm ml-1 text-gray-500">
                  {errors.userName?.message}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <input
                type="email"
                className="p-3 border-2 border-gray-300 w-80 rounded-md"
                placeholder="Email"
                {...register("userEmail", {
                  required: {
                    value: true,
                    message: "user email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid user email",
                  },
                })}
              />
              <span className="text-sm ml-1 text-gray-500">
                {errors.userEmail?.message}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="password"
                className="p-3 border-2 border-gray-300 w-80 rounded-md"
                placeholder="Password"
                {...register("userPassword", {
                  required: {
                    value: true,
                    message: "user password is required",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: "Invalid password",
                  },
                })}
              />
              <span className="text-sm ml-1 text-gray-500">
                {errors.userPassword?.message}
              </span>
            </div>
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
