import { render, screen } from "@testing-library/react";
import Header from "../Header";
import { UserProvider } from "../providers/UserProvider";
import userEvent from "@testing-library/user-event";
import { signOut } from "firebase/auth";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(() => ({})),
    signOut: jest.fn(),
  };
});
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header", () => {
  it("should render the title of our application correctly", () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>
    );
    expect(screen.getByText(/MovieNight/i)).toBeInTheDocument();
  });

  it("should not render the buttons if no value is passed as props for them", () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>
    );
    expect(screen.queryByRole("button", { name: /Sign in/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /Sign out/i })).toBeNull();
  });

  it("should render the Sign In button when we pass true", () => {
    render(
      <UserProvider>
        <Header shouldShowSignInButton={true} />
      </UserProvider>
    );
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Sign out/i })).toBeNull();
  });

  it("should render the Sign out button when we pass true", () => {
    render(
      <UserProvider>
        <Header shouldShowSignOutButton={true} />
      </UserProvider>
    );
    expect(
      screen.getByRole("button", { name: /Sign out/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Sign in/i })).toBeNull();
  });

  it("should navigate to login screen when we click on SignIn button", async () => {
    render(
      <UserProvider>
        <Header shouldShowSignInButton={true} />
      </UserProvider>
    );
    const signInButton = screen.getByRole("button", { name: /Sign In/i });
    await userEvent.click(signInButton);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should navigate to landing page when we click on SignOut button", async () => {
    (signOut as jest.Mock).mockResolvedValueOnce("Successful Signout");
    render(
      <UserProvider>
        <Header shouldShowSignOutButton={true} />
      </UserProvider>
    );
    const signOutButton = screen.getByRole("button", { name: /Sign Out/i });
    await userEvent.click(signOutButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should navigate to 404 when sign out fails", async () => {
    (signOut as jest.Mock).mockRejectedValueOnce(new Error("Sign out Failed"));
    render(
      <UserProvider>
        <Header shouldShowSignOutButton={true} />
      </UserProvider>
    );
    const signOutButton = screen.getByRole("button", { name: /Sign Out/i });
    await userEvent.click(signOutButton);

    expect(mockNavigate).toHaveBeenCalledWith("/404");
  });
});
