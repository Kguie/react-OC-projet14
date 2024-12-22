import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="flex gap-2 py-4 md:py-2 items-center justify-center border-b-2 border-gray-200">
      <img src={logo} width={60} alt="Wealth health logo" />
      <h1 className="text-4xl md:text-5xl font-bold">HRnet</h1>
    </header>
  );
}
