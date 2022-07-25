import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("render App component", async () => {
    await act(async () => {
      render(<App />);
      screen.debug();
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "hello" },
      });
    });
    screen.debug();
  });

  it("render App component 2", async () => {
    render(<App />);
    screen.debug();
    await screen.findByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for hello/i)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "hello" },
    });
    expect(screen.queryByText(/Searches for hello/i)).toBeInTheDocument();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toBeCalled();
    expect(checkbox).toBeChecked();
  });

  it("input focus", () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(
      <input type="text" data-testid="simple-input" onChange={handleChange} />
    );
    const input = getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});
