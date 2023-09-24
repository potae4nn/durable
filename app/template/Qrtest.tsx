"use client";
import React, { useCallback, useRef, useEffect } from "react";
import jsQR from "jsqr";

export const decodeQRCode = (
  imageData: Uint8ClampedArray,
  width: number,
  height: number
) => {
  const code = jsQR(imageData, width, height);

  if (code) {
    return code.data;
  }

  return null;
};

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleScan = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

        const decodedData = decodeQRCode(
          imageData.data as Uint8ClampedArray,
          imageData.width,
          imageData.height
        );

        if (decodedData) {
          console.log("QR Code Data:", decodedData);
        }
      }
    }

    requestAnimationFrame(handleScan);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error("Error accessing camera:", error);
  }, []);

  useEffect(() => {
    handleScan();
  }, [handleScan]);

  return (
    <div>
      <video
        ref={videoRef}
        onLoadedMetadata={handleScan}
        onError={handleError}
        autoPlay={true}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraComponent;
