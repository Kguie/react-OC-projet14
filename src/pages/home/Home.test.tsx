import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

import { render } from "../../utils/test";
import Home from "./Home";
import { Routes } from "../../utils/router";

describe("Page Home", () => {
  it("should contain the expected elements", () => {
    render(<Home />);

    // Check for 7 input elements
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(8);

    // Check for buttons
    const buttons = screen.getAllByRole("button");
    console.log(buttons);
    expect(buttons).toHaveLength(2);

    // Check for a link with "view current" text
    const link = screen.getByRole("link", { name: /view current/i });
    expect(link).toBeInTheDocument();

    // Check for an h1 with the text "hrnet"
    const heading = screen.getByRole("heading", { name: /hrnet/i });
    expect(heading).toBeInTheDocument();

    // Check for an image
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();

    // Check that multiple texts are visible on the screen
    const textsToCheck = ["Create employee", "Address", "Save"]; // Replace with the actual texts
    textsToCheck.forEach((text) => {
      expect(screen.getByText(new RegExp(text, "i"))).toBeInTheDocument();
    });
  });
  it("should navigate to the current employees page when the link is clicked", async () => {
    render(<Routes />);

    // Click on the "current employees" link
    const link = screen.getByRole("link", { name: /view current/i });
    expect(link).toBeInTheDocument();
    await userEvent.click(link);

    // Check that the new page is displayed
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    const image = screen.queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });
});
