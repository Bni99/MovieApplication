import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type DescriptionFormValues = {
  userEmail: string;
};

const DescriptionForm = () => {
  const { register, handleSubmit, control, formState } =
    useForm<DescriptionFormValues>();

  const navigate = useNavigate();

  const { errors } = formState;

  const onSubmit = function (data: DescriptionFormValues) {
    navigate("/login", { state: { userEmail: data.userEmail } });
  };

  return (
    <>
      <form
        className="flex gap-6 items-start"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex gap-2 flex-col">
          <input
            type="email"
            id="userEmail"
            placeholder="Email Address"
            {...register("userEmail", {
              required: { value: true, message: "user email is required" },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "invalid email format",
              },
            })}
            className="p-2 border-2 border-gray-300 w-80 rounded-md"
          />
          <p className="text-sm ml-1 text-gray-500">
            {errors.userEmail?.message}
          </p>
        </div>
        <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 font-semibold rounded transition-colors duration-200">
          Get Started
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default DescriptionForm;
