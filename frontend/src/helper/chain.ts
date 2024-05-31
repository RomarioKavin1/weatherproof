import { type Chain } from "viem";

export const galadriel = {
  id: 696969,
  name: "Galadriel Devnet",
  nativeCurrency: { name: "Galadriel", symbol: "GAL", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.galadriel.com"] },
  },
  blockExplorers: {
    default: {
      name: "Galadriel Explorer",
      url: "https://explorer.galadriel.com",
    },
  },
  contracts: {
    // Assuming there are some example contracts; replace with actual data if available
    exampleContract: {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      blockCreated: 123456, // Example block number, replace with actual
    },
  },
} as const satisfies Chain;
