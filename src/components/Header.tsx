import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const APP_BASE_PATH = process.env.APP_BASE_PATH;

function Header() {
  const { data: session }: any = useSession();
  return (
    <>
      {session ? (
        <header className="sticky z-50 top-0 left-0 right-0 ">
          <div className="menu menu-horizontal dark:bg-base-300 justify-between bg-slate-500 w-full">
            <div className="ml-4">
              <Image
                width={50}
                height={50}
                className="dark:text-white text-black"
                src={`${APP_BASE_PATH}/logoSHC.svg`}
                alt="logo"
              />
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="rounded-full w-10">
                  <Image
                    src={`https://shc.sut.ac.th/profile/${session?.user?.users?.user_id}`}
                    width={50}
                    height={50}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={() => signOut()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
      ) : (
        ""
      )}
    </>
  );
}
export default Header;
