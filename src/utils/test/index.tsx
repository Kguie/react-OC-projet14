import { render as rtlRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

type WrapperProps = {
  children: React.ReactElement;
  initialEntries?: string[];
};

function Wrapper({ children, initialEntries = ["/"] }: WrapperProps) {
  return (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
}

export function render(ui: React.ReactElement, initialEntries?: string[]) {
  rtlRender(ui, {
    wrapper: (props) => <Wrapper {...props} initialEntries={initialEntries} />,
  });
}
