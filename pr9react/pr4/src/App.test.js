import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("render App component", async () => {
    await act(async () => {
      render(<App />);
      expect(screen.queryByText(/Searches for React/i)).toBeNull();
    });
  });

  // it("render App component after user data provided", async () => {
  //   render(<App />);
  //   expect(screen.queryByText(/Logged in as/i)).toBeNull()
  //   expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument()
  // });

  it("render App component after user data provided", async () => {
    await act(async () => {
      render(<App />);
      screen.debug();
      expect(screen.queryByText(/Logged in as/i)).toBeNull();
      expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
      screen.debug();
    });
  });

  it("render App component after user data provided", async () => {
    await act(async () => {
      render(<App />);
      expect(screen.getByAltText(/search image/i)).toHaveClass("image");
      expect(screen.getByLabelText(/search/i)).toBeEmpty();
      expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
      expect(screen.getByLabelText(/search/i)).toBeRequired();
    });
  });
});
