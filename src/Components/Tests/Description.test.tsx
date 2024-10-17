import { render, screen } from "@testing-library/react";
import Description from "../Description";

const mockNavigate = jest.fn();

//mocking useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Description", () => {
  it("should render the text correctly", () => {
    //So here we are using the //i so that it can match the text but can ignore the case senstivity also please note in the last matcher we have to escape ? as it was giving issues
    render(<Description />);
    expect(
      screen.getByText(/Unlimited movies, TV shows and more/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Starts at ₹149. Cancel at any time./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Ready to watch\? Enter your email to create or restart your membership./i
      )
    ).toBeInTheDocument();
  });
});
