import { render, screen } from "@testing-library/react";
import React from "react";

function App() {
  return <h1>Hello World</h1>;
}

test("renders hello world text", () => {
  render(<App />);
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
