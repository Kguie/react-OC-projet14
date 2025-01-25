import { Loader } from "lucide-react";

type ButtonProps = {
  title: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.DOMAttributes<HTMLButtonElement>["onClick"];
  isLoading?: boolean;
};

export default function Button({
  title,
  type,
  onClick,
  isLoading,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-8 py-2 flex justify-center rounded-md bg-primary text-white font-bold transition duration-200 hover:bg-white hover:text-primary border-2 border-transparent hover:border-primary">
      <ButtonContent title={title} isLoading={isLoading} />
    </button>
  );
}

const ButtonContent = ({
  title,
  isLoading,
}: {
  title: string;
  isLoading?: boolean;
}) => (isLoading ? <Loader color="white" className="animate-spin" /> : title);
