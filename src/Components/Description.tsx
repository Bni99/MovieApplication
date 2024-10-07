import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  userEmail: string;
};

const Description = () => {
  const { register, control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <div className="h-96 w-[38rem] border-2 border-pink-200 flex flex-col gap-12">
      <div>
        <span className="text-5xl font-extrabold block p-2 text-center">
          Unlimited movies, TV shows and more
        </span>
        <span className="text-lg font-semibold block p-2 text-center">
          Starts at ₹149. Cancel at any time.
        </span>
        <span className="block p-2 text-center">
          Ready to watch? Enter your email to create or restart your membership.
        </span>
      </div>
      <div className="flex justify-center">
        <form
          className="flex gap-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
      </div>
    </div>
  );
};

export default Description;
