import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
const hits = [
  {
    objectID: "1",
    title: "Angular",
  },
  {
    objectID: "2",
    title: "React",
  },
];

describe("App", () => {
  it("fetch data from an API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }));
    const { getByRole, findAllByRole } = render(<App />);
    userEvent.click(getByRole("button"));
    const items = await findAllByRole("listitem");
    expect(items).toHaveLength(2);
    // additional
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "http://hn.algolia.com/api/v1/search?query=React"
    );
  });

  it("fetch data from an API and reject", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    const { getByRole, findByText } = render(<App />);
    userEvent.click(getByRole("button"));
    const message = await findByText(/Something went wrong/i);
    expect(message).toBeInTheDocument();
  });

  it("fetch data from an API", async () => {
    const promise = Promise.resolve({ data: { hits } });
    axios.get.mockImplementationOnce(() => promise);
    const { getByRole, getAllByRole } = render(<App />);
    userEvent.click(getByRole("button"));
    await act(() => promise);
    const items = getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});
