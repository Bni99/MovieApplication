import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

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
          <ErrorMessage errorMessage={errors.userEmail?.message} />
        </div>
        <Button className="py-2">Get Started</Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default DescriptionForm;
