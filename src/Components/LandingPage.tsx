import Description from "./Description";
import Header from "./Header";

const LandingPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="border-2 border-black h-20">
        <Header shouldShowSignInButton={true} />
      </div>
      <div
        className="border-2 border-black flex items-center justify-center"
        style={{
          height: `calc(100vh - 5rem)`,
        }}
      >
        <Description />
      </div>
    </div>
  );
};

export default LandingPage;
