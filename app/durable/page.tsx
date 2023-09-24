import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Durable from "../template/Durable";
// import DurableMore from "../template/DurableMore";
const APP_BASE_PATH = process.env.APP_BASE_PATH;

type Props = {};

const Page = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(APP_BASE_PATH + "/auth/signin?callbackUrl=/home");
  }
  return (
    <div>
      <Durable session={session} />
      {/* <DurableMore session={session} /> */}
    </div>
  );
};

export default Page;
