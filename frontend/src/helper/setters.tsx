import { useWriteContract } from "wagmi";
import { premium } from "./abi";
import { premiumAgentContract } from "./constants";

export const requestPremium = async (
  location: string,
  days: string,
  condition: string
) => {
  const { writeContract } = useWriteContract();
  writeContract({
    abi: premium,
    address: premiumAgentContract,
    functionName: "runAgent",
    args: [`location:${location} on ${days} for ${condition}`, 5],
  });
};
