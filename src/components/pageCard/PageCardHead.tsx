import { Link } from "react-router-dom";

type PageCardHeadProps = {
  title: string;
  button: {
    label: string;
    to: string;
  };
};

export default function PageCardHead({
  title,
  button,
}: PageCardHeadProps): React.ReactElement {
  const { label, to } = button;
  return (
    <div className="flex justify-between py-2 items-baseline gap-1">
      <h2 className="text-lg md:text-2xl font-bold">{title}</h2>
      <Link
        to={to}
        className="text-primary hover:underline text-sm md:text transition-colors duration-200 text-end"
        aria-label={`Go to ${label}`}>
        {label}
      </Link>
    </div>
  );
}
