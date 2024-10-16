import { useForm } from "react-hook-form";
import Header from "./Header";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./utils/firebase";
import { useUserContext } from "./providers/UserProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import { VAILD_PASSWORD_PATTERN, VALID_EMAIL_PATTERN } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  userName?: string;
  userEmail: string;
  userPassword: string;
};

const Login = () => {
  const [isSigninForm, setIsSigninForm] = useState(true);
  const location = useLocation();
  const { userEmail } = location.state || {};
  const { register, control, handleSubmit, formState, reset } =
    useForm<FormValues>({
      defaultValues: {
        userEmail: userEmail || "",
      },
    });
  const { errors } = formState;
  const { addUser } = useUserContext();
  const navigate = useNavigate();

  const onSubmit = function ({
    userName,
    userEmail,
    userPassword,
  }: FormValues) {
    if (isSigninForm) {
      signInWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const { uid, displayName, email } = userCredential.user;
          addUser({
            uid: uid,
            userName: displayName,
            userEmail: email,
          });
          navigate("/browse");
          reset();
        })
        .catch(({ message }) => {
          toast(message);
        });
    } else {
      createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const { uid, displayName, email } = userCredential.user;
          addUser({
            uid: uid,
            userName: displayName,
            userEmail: email,
          });
          navigate("/browse");
          reset();
        })
        .catch(({ message }) => {
          toast(message);
        });
    }
  };

  const handleFormToggle = function () {
    setIsSigninForm((prev) => !prev);
  };

  return (
    <div>
      <ToastContainer autoClose={5000} hideProgressBar={true} theme="dark" />
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
                <ErrorMessage errorMessage={errors.userName?.message} />
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
                    value: VALID_EMAIL_PATTERN,
                    message: "Invalid user email",
                  },
                })}
              />
              <ErrorMessage errorMessage={errors.userEmail?.message} />
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
                    value: VAILD_PASSWORD_PATTERN,
                    message: "Invalid password",
                  },
                })}
              />
              <ErrorMessage errorMessage={errors.userPassword?.message} />
            </div>

            <Button className="py-3">
              {isSigninForm ? "Sign In" : "Sign Up"}
            </Button>

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
