import Link from "next/link";
import React, { FC, useState } from "react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {

  const [search, setSearch] = useState<string>("");

  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-row">
      {/* Navbar */}
      <nav className="w-72 text-white bg-gray-950 p-5 flex flex-col gap-4 justify-start items-center">
        <input
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-full w-full p-2.5 text-center shadow-2xl border border-transparent bg-gray-800 focus:border-gray-600"
        />

        <div className="h-0.5 w-11/12 bg-white rounded-full opacity-20"></div>

        <Link href="/"
          className={`w-full rounded-full border-2 border-transparent 
          flex items-center justify-center gap-2
          opacity-100 text-white hover:bg-gray-400 text-sm sm:text-base 
          h-10 sm:h-12 px-4 sm:px-5 `
          + (router.pathname === "/" ? ` border-gray-400` : ``)}
        >
          Home
        </Link>
        <Link href="/chat"
          className={`w-full rounded-full border-2 border-transparent 
            flex items-center justify-center gap-2
            opacity-100 text-white hover:bg-gray-400 text-sm sm:text-base 
            h-10 sm:h-12 px-4 sm:px-5 `
            + (router.pathname === "/chat" ? ` border-gray-400` : ``)}
        >
          Chat
        </Link>

      </nav>

      {/* Page Content */}
      <main className="flex flex-1">{children}</main>
    </div>
  );
};

export default Layout;