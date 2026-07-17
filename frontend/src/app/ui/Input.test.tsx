import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("forwards input props", () => {
    render(<Input aria-label="Nombre artistico" placeholder="Nombre" defaultValue="Ecos" />);

    const input = screen.getByLabelText("Nombre artistico");

    expect(input).toHaveAttribute("placeholder", "Nombre");
    expect(input).toHaveValue("Ecos");
  });

  it("renders start and end icons", () => {
    render(
      <Input aria-label="Buscar" startIcon={<span>Inicio</span>} endIcon={<span>Fin</span>} />,
    );

    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Fin")).toBeInTheDocument();
  });
});
