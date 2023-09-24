"use client";
import { getScannerDurable } from "@/service/serverService";
import React from "react";
// import QrReader from "react-web-qr-reader";
import { useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import QrReader from "react-qr-reader";
import { QrScanner } from "@yudiel/react-qr-scanner";

type Props = {
  session: any;
};

function Qrcode({ session }: Props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string>();
  const [stream, setStream] = React.useState<MediaStream | null>(null);

  React.useEffect(() => {
    const enableCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
        });
        setStream(mediaStream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const handleScan = async (result: any) => {
    if (result) {
      await getScannerDurable(
        session.user.users.user_id,
        result,
        session.user.token
      ).then((res) => {
        if (res?.data[0] == undefined) {
          // alert("ไม่มีครุภัณนี้");
          setOpen(true);
          setMessage("ไม่มีครุภัณนี้");
        } else if (res?.status?.message == "ON") {
          // alert(res.data);
          setOpen(true);
          setMessage(res.data);
        } else {
          router.push(`/durable/edit/${res.data[0].id}`);
        }
      });
    }
  };
  const handleError = (error: any) => {
    console.log(error);
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
      {/* <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode="environment"
      /> */}
      <QrScanner
        onDecode={handleScan}
        onError={(error) => console.log(error?.message)}
      />
      {/* <QrReader onScan={handleScan} onError={handleError} delay={delay} style={}/> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Qrcode;
