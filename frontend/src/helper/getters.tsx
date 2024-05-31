import { config } from "@/config";
import { premium } from "./abi";
import { premiumAgentContract } from "./constants";
import { readContract } from "@wagmi/core";

export const readPremium = async (id: bigint) => {
  const result = await readContract(config, {
    abi: premium,
    address: premiumAgentContract,
    functionName: "getMessageHistoryContents",
    args: [id],
  });
  return result;
};
