import React from "react";
import Image from "next/image";
import Logo from "../../public/img/img_amazon_logo.png";
import { SearchIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { useRouter } from "next/router";
import { selectTotalItems } from "../slices/basketSlice";
function Header() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const router = useRouter();
  const totalItems = useSelector(selectTotalItems);
  return (
    <header>
      {/* top bar */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2 ">
        {/* logo */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            // onClick={ () =>router.push('/') }
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>

        {/* search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500 cursor-pointer">
          <input
            className="pl-3 p-2  flex-grow rounded-l-md outline-none"
            type="text"
            placeholder="Search any products..."
          />
          <SearchIcon className="w-12 h-6 " />
        </div>
        {/* right section */}
        <div className="text-white mx-6 flex items-center text-xs space-x-6 whitespace-nowrap sm:space-x-4">
          <img
            src={
              "https://toppng.com/uploads/preview/file-svg-user-icon-material-desi-11563317072p2p27gjccw.png"
            }
            alt="profileimg"
            className="lg:inline-flex  w-10 h-10 rounded-full mr-1 ml-2 hidden  "
          />
          <div className="link" onClick={!session ? signIn : signOut}>
            {/* <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p> */}
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            className="link flex items-center relative"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 bg-yellow-400 w-4 h-4 rounded-full text-center text-black font-extrabold">
              {totalItems}
            </span>
            <svg
              className=" w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="bg-amazon_blue-light space-x-3 flex items-center text-white text-sm py-2 pl-6 ">
        <p className="link flex items-center">
          <svg
            className="w-6 h-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
