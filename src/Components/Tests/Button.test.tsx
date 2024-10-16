import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("should render the children correctly", () => {
    render(<Button onClick={() => {}}>Sign up</Button>);
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it("should apply the default variant as primary if no other variant is provided", () => {
    render(<Button onClick={() => {}}>Sign up </Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-600 text-white hover:bg-red-700");
  });

  it("should apply the base styles regardless of the variant", () => {
    render(<Button onClick={() => {}}>Sign up </Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "px-4 py-1 font-semibold rounded transition-colors duration-200"
    );
  });

  it("should call the onClick function , when we click on the button", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Sign up</Button>);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
