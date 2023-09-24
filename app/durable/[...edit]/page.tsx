import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import CardDetail from "@/app/template/CardDetail";

const Edit = async ({ params }: { params: { edit: string } }) => {
  const session = await getServerSession(authOptions);
  const id = params.edit[1];
  return <CardDetail id={id} session={session} />;
};

export default Edit;
