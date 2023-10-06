import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 w-full z-[99] bg-white">
      <div className="container">
        <div className="flex justify-between py-4">
          <div className="text-lg font-bold">
            <div className="flex gap-3">
              <Logo className="h-7 w-7 fill-slate-800" />
              <Link
                href={"https://tinyfrog.co"}
                className="text-lg font-bold text-slate-800"
              >
                Acme
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
