import Image from "next/image";
import Link from "next/link";
import CartIcon from "./cart-icon";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/50 backdrop-blur-md border-b-[1.5px] border-dashed border-gray-200">
      <nav className="flex items-center justify-between px-4 py-2">
        <Link href="/">
          <Image
            src="/profile-transparent-blue.svg"
            alt="Profile"
            width={30}
            height={30}
            priority={true}
            className="min-w-[100px]"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/cart-checkout">
            <CartIcon />
          </Link>
          <Image
            src="/user.jpeg"
            alt="User"
            width={30}
            height={30}
            className="size-8 rounded-full"
          />
        </div>
      </nav>
    </header>
  );
}
