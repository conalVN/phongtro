import { Navigation } from "../Public";

function Header() {
  return (
    <div className="flex w-full h-[40px] overflow-hidden">
      <div className="w-[245px] flex items-center justify-center text-white bg-secondary1 font-bold">
        Phongtro.Conal
      </div>
      <div className="flex-1">
        <Navigation isAdmin />
      </div>
    </div>
  );
}

export default Header;
