import { getScannerDurable } from "@/service/serverService";
import React from "react";
// import QrReader from "react-web-qr-reader";
import { useRouter } from "next/navigation";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import QrReader from "react-qr-reader";
import { QrScanner } from "@yudiel/react-qr-scanner";
// import { QrReader } from 'react-qr-reader';
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

type Props = {};

function Qrcode({}: Props) {
  const { data: session, status }: any | undefined = useSession();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string>();

  const handleScan = async (result: any) => {
    if (result) {
      await getScannerDurable(session?.user?.users.user_id, result).then(
        (res) => {
          if (res?.data[0] == undefined) {
            // alert("ไม่มีครุภัณนี้");
            setOpen(true);
            setMessage("ไม่มีครุภัณนี้");
            alert("ไม่มีครุภัณนี้");
            location.reload();
          } else if (res?.status?.message == "ON") {
            // alert(res.data);
            // setOpen(true);
            // setMessage(res.data);
            alert(res.data);
            location.reload();
          } else {
            router.push(`/durable/edit/${res.data[0].id}`);
          }
        }
      );
    }
  };
  const handleError = (error: any) => {
    console.log(error);
    location.reload();
  };
  const delay = 200;
  const previewStyle = {
    height: "100%",
    width: "100%",
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Layout>
        {/* <QrReader
        delay={200}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment"
      />  */}
        <QrScanner
          scanDelay={200}
          onDecode={handleScan}
          onError={(error: any) => {
            console.log(error?.message);
            location.reload();
          }}
        />
        {/* <QrReader onScan={handleScan} onError={handleError} delay={delay} style={}/> */}
        {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar> */}
        {/* {message && (
          <div className="badge badge-warning gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-4 h-4 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            {message}
          </div>
        )} */}
      </Layout>
    </>
  );
}

export default Qrcode;
