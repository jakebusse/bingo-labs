"use client";
import { IoMdPerson } from "react-icons/io";
import { FaCog } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const [userMenu, setUserMenu] = useState(false);
  const [adminMenu, setAdminMenu] = useState(false);

  if (error) return <div>{error.message}</div>;
  return (
    <nav className="fixed top-0 left-0 right-0 flex flex-row-reverse flex-nowrap justify-start items-center gap-8 text-gray-500 p-4 shadow z-40 *:relative *:flex *:items-center *:cursor-pointer [&_div]:absolute [&_div]:top-full [&_div]:w-full [&_div]:bg-white [&_div]:shadow [&_div]:py-1 [&_div]:mt-2 [&_div]:rounded [&_div]:flex [&_div]:flex-col [&_a]:p-2 hover:[&_a]:bg-gray-100 [&_a]:w-full">
      <span className="mr-6" onClick={() => setUserMenu(!userMenu)}>
        <IoMdPerson /> &nbsp;{" "}
        {isLoading ? "Loading..." : (user && user.name) || "Guest"}
        {userMenu ? (
          <div className="">
            {user ? (
              <Link href="/api/auth/logout">Logout</Link>
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </div>
        ) : (
          ""
        )}
      </span>
      {user ? (
        <span onClick={() => setAdminMenu(!adminMenu)}>
          <FaCog /> &nbsp; Admin Menu
          {adminMenu && user ? (
            <div className="">
              <Link href="/patterns/admin">Patterns</Link>
            </div>
          ) : (
            ""
          )}
        </span>
      ) : (
        ""
      )}
    </nav>
  );
}
