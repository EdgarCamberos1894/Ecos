import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders an accessible svg when labelled", () => {
    const { container } = render(<Spinner aria-label="Cargando" />);

    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-label", "Cargando");
    expect(svg).toHaveAttribute("viewBox", "0 0 100 100");
  });
});
