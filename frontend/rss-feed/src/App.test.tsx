import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("should render component", () => {
    render(<App />);

    const element = screen.getByText("Vite + React + Tailwind v4!");

    expect(element).toBeInTheDocument();
  });
});
