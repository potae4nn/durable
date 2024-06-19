import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Kanit } from "next/font/google";
const APP_BASE_PATH = process.env.APP_BASE_PATH;

export const kanit = Kanit({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} basePath={`${APP_BASE_PATH}/api/auth`}>
      <main className={kanit.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
