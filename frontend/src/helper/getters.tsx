import { config } from "@/config";
import { factoryabi, premium } from "./abi";
import { factory, premiumAgentContract } from "./constants";
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
export const CheckCompletion = async (id: bigint) => {
  const result = await readContract(config, {
    abi: premium,
    address: premiumAgentContract,
    functionName: "isRunFinished",
    args: [id],
  });
  return result;
};
export const readInsurance = async (address: string) => {
  const result = await readContract(config, {
    abi: factoryabi,
    address: factory,
    functionName: "readInsuranceDetails",
    args: [`0x${address}`],
  });
  return result;
};
