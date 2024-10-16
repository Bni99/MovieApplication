import DescriptionForm from "./DescriptionForm";

const Description = () => {
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
        <DescriptionForm />
      </div>
    </div>
  );
};

export default Description;
