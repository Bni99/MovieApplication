import { useNavigate } from "react-router-dom";
import Button from "./Button";

type HeaderProps = {
  shouldShowSignInButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({ shouldShowSignInButton = false }) => {
  const navigate = useNavigate();
  const handleSignInButtonClick = () => {
    navigate("/login");
  };

  return (
    <div className="border-2 border-black p-4 ml-36 mr-36 flex items-center justify-between">
      <div className="logo">
        <span className="text-4xl font-extrabold uppercase tracking-tighter text-red-600">
          Movie Night
        </span>
      </div>
      <div>
        {shouldShowSignInButton && (
          <Button onClick={handleSignInButtonClick}>Sign In</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
