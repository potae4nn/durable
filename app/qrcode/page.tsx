import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Qrcode from "../template/Qrcode";
import CameraComponent from "../template/Qrtest";
const APP_BASE_PATH = process.env.APP_BASE_PATH;

type Props = {};

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(APP_BASE_PATH+"/auth/signin?callbackUrl=/home");
  }
  return (
    <div>
      <Qrcode session={session}/>
      {/* <CameraComponent/> */}
    </div>
  );
};

export default Page;
