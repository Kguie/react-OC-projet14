import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="flex gap-2 py-4 md:py-2 items-center justify-center border-b-2 border-gray-200">
      <img src={logo} height={60} width={60} alt="Wealth health logo" className="hidden md:flex" />
      <h1 className="text-xl  md:text-4xl font-bold">HRnet</h1>
    </header>
  );
}
