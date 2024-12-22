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
    <div className="flex justify-between py-2 items-baseline">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link
        to={to}
        className="text-blue-500 hover:underline  transition-colors duration-200 text-end"
        aria-label={`Go to ${label}`}>
        {label}
      </Link>
    </div>
  );
}
