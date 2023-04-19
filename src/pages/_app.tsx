import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import NavigationBar from "~/components/NavigationBar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <div>
    <NavigationBar />
    <Component {...pageProps} />
  </div>
  )
};

export default api.withTRPC(MyApp);
