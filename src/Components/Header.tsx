import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { signOut } from "firebase/auth";
import { auth } from "./utils/firebase";
import { useUserContext } from "./providers/UserProvider";

type HeaderProps = {
  shouldShowSignInButton?: boolean;
  shouldShowSignOutButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  shouldShowSignInButton = false,
  shouldShowSignOutButton = false,
}) => {
  const navigate = useNavigate();
  const { removeUser } = useUserContext();
  const handleSignInButtonClick = () => {
    navigate("/login");
  };

  const handleSignOutButtonClick = () => {
    signOut(auth)
      .then(() => {
        removeUser();
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
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
        {shouldShowSignOutButton && (
          <Button onClick={handleSignOutButtonClick}>Sign Out</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
