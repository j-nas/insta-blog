import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Heebo } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const heebo = Heebo({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>
        {`
          :root {
            --font-sans: ${heebo.style.fontFamily};
          }
        `}
      </style>
      <Component data-theme="dark" className={`dark`} {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
