import * as React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillHome, AiFillTool, AiOutlineQrcode } from "react-icons/ai";

export default function SimpleBottomNavigation() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <div className="fixed z-50  bottom-0 left-0 right-0">
          <ul className="menu menu-horizontal dark:bg-base-200 justify-around bg-slate-200 w-full">
            <li>
              <Link href="/">
                <h4 className="text-lg">
                  <AiFillHome />
                </h4>
              </Link>
            </li>
            <li>
              <Link href="/durable">
                <h4 className="text-lg">
                  <AiFillTool />
                </h4>
              </Link>
            </li>
            <li>
              <Link href="/qrcode">
                <h4 className="text-lg">
                  <AiOutlineQrcode />
                </h4>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
