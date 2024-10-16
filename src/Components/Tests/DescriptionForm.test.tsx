import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DescriptionForm from "../DescriptionForm";

const mockNavigate = jest.fn();

//mocking useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("DescriptionForm", () => {
  //Just a note here when we use //i it matches the substring as well , so if you need to match the full string and ignore case use /^ $/i
  it("should render the input and the button correctly", () => {
    render(<DescriptionForm />);
    expect(
      screen.getByRole("button", { name: /^Get Started$/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Email Address$/i)).toBeInTheDocument();
  });

  it("should show error message when no email is entered", async () => {
    render(<DescriptionForm />);
    const getStartedButton = screen.getByRole("button", {
      name: /^Get Started$/,
    });
    await userEvent.click(getStartedButton);
    expect(
      await screen.findByText("user email is required")
    ).toBeInTheDocument();
  });

  it("should show error message when invalid email is entered", async () => {
    render(<DescriptionForm />);
    const getStartedButton = screen.getByRole("button", {
      name: /^Get Started$/,
    });
    const descriptionFormInput = screen.getByPlaceholderText(/Email Address/i);
    await userEvent.type(descriptionFormInput, "john.doe");
    await userEvent.click(getStartedButton);
    expect(await screen.findByText("invalid email format")).toBeInTheDocument();
  });

  it("should call mockNavigate when the valid email is entered and  get started button is clicked", async () => {
    render(<DescriptionForm />);
    const descriptionFormInput = screen.getByPlaceholderText(/Email Address/i);
    const getStartedButton = screen.getByRole("button", {
      name: /Get Started/i,
    });
    await userEvent.type(descriptionFormInput, "john.doe@gmail.com");
    await userEvent.click(getStartedButton);
    expect(mockNavigate).toHaveBeenCalledWith("/login", {
      state: {
        userEmail: "john.doe@gmail.com",
      },
    });
  });
});
