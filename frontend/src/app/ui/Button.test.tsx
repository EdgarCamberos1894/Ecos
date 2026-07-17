import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders children and calls the click handler", () => {
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Guardar</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("passes disabled state to the native button", () => {
    render(<Button disabled>Enviar</Button>);

    expect(screen.getByRole("button", { name: "Enviar" })).toBeDisabled();
  });
});
