import { render as rtlRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode; // Accept any valid ReactNode
  initialEntries?: string[];
};

// eslint-disable-next-line react-refresh/only-export-components
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
