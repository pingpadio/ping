import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

const Twotter: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider appearance={{baseTheme: neobrutalism}}>
      <Head>
        <title>Twotter</title>
        <meta name="description" content="an anonymised twitter" />
        <link rel="icon" href="/otterino.svg" />
      </Head>

      <Toaster position="top-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(Twotter);
