"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import BuildIcon from "@mui/icons-material/Build";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SimpleBottomNavigation() {
  const { data: session } = useSession();
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      {session ? (
        <div className="fixed z-50  bottom-0 left-0 right-0">
          <ul className="menu menu-horizontal bg-base-200 justify-around w-full">
            <li>
              <Link href="/home">
                <HomeIcon />
              </Link>
            </li>
            <li>
              <Link href="/durable">
                <BuildIcon />
              </Link>
            </li>
            <li>
              <Link href="/qrcode">
                <QrCodeScannerIcon />
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        // <Box
        //   sx={{
        //     width: "100%",
        //     position: "fixed",
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //   }}
        // >
        //   <BottomNavigation
        //     showLabels
        //     value={value}
        //     onChange={(event, newValue) => {
        //       setValue(newValue);
        //     }}
        //     sx={{
        //       "& .MuiButtonBase-root.MuiBottomNavigationAction-root.Mui-selected":
        //         {
        //           color: "#ea580d",
        //         },
        //     }}
        //   >
        //     <BottomNavigationAction
        //       label="หน้าแรก"
        //       onClick={() => router.push("/home")}
        //       icon={<HomeIcon />}
        //       sx={{
        //         "& .MuiButtonBase-root.MuiBottomNavigationAction-root.Mui-selected":
        //           {
        //             color: "#ea580d",
        //           },
        //       }}
        //     ></BottomNavigationAction>
        //     <BottomNavigationAction
        //       label="ครุภัณฑ์"
        //       onClick={() => router.push("/durable")}
        //       icon={<BuildIcon />}
        //       sx={{
        //         "& .MuiButtonBase-root.MuiBottomNavigationAction-root.Mui-selected":
        //           {
        //             color: "#ea580d",
        //           },
        //       }}
        //     />
        //     <BottomNavigationAction
        //       label="สแกนครุภัณฑ์"
        //       onClick={() => router.push("/qrcode")}
        //       icon={<QrCodeScannerIcon />}
        //     />
        //   </BottomNavigation>
        // </Box>
        ""
      )}
    </>
  );
}
