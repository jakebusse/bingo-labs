"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaChevronRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { RiDashboard3Line } from "react-icons/ri";
import { IoAdd, IoPlay, IoGrid } from "react-icons/io5";

export default function Sidebar() {
  const md = useMediaQuery({
    query: "(min-width: 40rem)",
  });

  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (md) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [md]);

  const navItems = [
    {
      name: "Dashboard",
      url: "/",
      icon: <RiDashboard3Line />,
    },
    {
      name: "Run Simulation",
      url: "/simulation",
      icon: <IoPlay />,
    },
    {
      name: "Patterns",
      url: "/patterns",
      icon: <IoGrid />,
    },
    {
      name: "New Pattern",
      url: "/patterns/new",
      icon: <IoAdd />,
    },
  ];

  return (
    <nav
      className={`relative h-full transition-all duration-500 z-50 bg-white ${
        open ? "w-1/6 shadow-lg" : "w-0"
      }`}
    >
      <div
        className={`absolute text-xl text-white bg-purple-500 top-12 w-auto p-4 transition-transform duration-500 cursor-pointer
          ${
            open
              ? "rounded-full -right-7 rotate-180"
              : "-right-12 rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full"
          }`}
        onClick={() => setOpen(!open)}
      >
        <FaChevronRight />
      </div>
      <div
        className={`flex flex-col flex-nowrap justify-start items-center gap-4 m-6 transition-all duration-500 ${
          open ? "block" : "hidden"
        }`}
      >
        <h1 className="text-purple-500 text-3xl font-bold">Bingo Labs</h1>
        <hr className="border border-gray-100 my-0 w-2/3" />
        {navItems.map((navItem) => (
          <a
            href={navItem.url}
            className={`flex flex-row flex-nowrap items-center justify-start text-lg w-full p-4 rounded-xl transition-all duration-500 ${
              pathname === navItem.url
                ? "bg-purple-500 text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            key={navItem.name}
          >
            {navItem.icon} &nbsp; {navItem.name}
          </a>
        ))}
      </div>
    </nav>
  );
}
