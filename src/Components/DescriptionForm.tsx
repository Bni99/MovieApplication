import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type DescriptionFormValues = {
  userEmail: string;
};

const DescriptionForm = () => {
  const { register, handleSubmit, control } = useForm<DescriptionFormValues>();

  const onSubmit = function (data: DescriptionFormValues) {
    console.log(data);
  };

  return (
    <>
      <form className="flex gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input
          type="email"
          id="userEmail"
          {...register("userEmail", {
            required: { value: true, message: "userEmail is required" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          className="p-2 border-2 border-gray-300 w-80 rounded-md"
        />
        <button className="bg-red-600 text-white hover:bg-red-700 px-4 font-semibold rounded transition-colors duration-200">
          Get Started
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default DescriptionForm;
