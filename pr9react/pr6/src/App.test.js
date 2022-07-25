import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
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
    // fireEvent.click(checkbox);
    userEvent.click(checkbox);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it("double click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("focus", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select option", () => {
    const { selectOptions, getByRole, getByText } = render(
      // <select multiple> //в этом случае combobox меняется ниже на listbox
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    userEvent.selectOptions(getByRole("combobox"), "1");
    expect(getByText("A").selected).toBeTruthy();

    userEvent.selectOptions(getByRole("combobox"), "2");
    expect(getByText("B").selected).toBeTruthy();
    expect(getByText("A").selected).toBeFalsy();
  });
});
