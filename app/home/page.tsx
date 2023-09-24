import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Home from "../template/Home";
const APP_BASE_PATH = process.env.APP_BASE_PATH;

type Props = {};

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(APP_BASE_PATH+"/auth/signin?callbackUrl=/home");
  }
  return <Home session={session}/>;
};

export default Page;
