import { getDefaultConfig } from "connectkit";
import { createConfig } from "wagmi";
import { galadriel } from "./helper/chain";

export const config = createConfig(
  getDefaultConfig({
    appName: "ConnectKit Next.js demo",
    chains: [galadriel],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
