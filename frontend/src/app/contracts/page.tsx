"use client";
import { ConnectKitButton } from "connectkit";
import { useWriteContract } from "wagmi";
import { premium } from "@/helper/abi";
import { readContract } from "@wagmi/core";
import { config } from "@/config";
import { useState } from "react";
import { premiumAgentContract } from "@/helper/constants";
import { readPremium } from "@/helper/getters";
interface RiskAssessment {
  risk_level: number;
  premiumAmountPercentage: number;
  MaximumInsuranceAmount: number;
}
export default function Home() {
  const [response, setResponse] = useState<string>();
  const { writeContract } = useWriteContract();
  const [RiskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null
  );

  const requestPremium = async (
    location: string,
    days: string,
    condition: string
  ) => {
    writeContract({
      abi: premium,
      address: premiumAgentContract,
      functionName: "runAgent",
      args: [`location:${location} on ${days} for ${condition}`, 5],
    });
  };
  const parseRiskAssessment = (data: string): RiskAssessment => {
    const regex =
      /{risk_level:(\d+(\.\d+)?)\s+premiumAmountPercentage:(\d+(\.\d+)?)\s+MaximumInsuranceAmount:(\d+)}/;
    const match = data.match(regex);

    if (match) {
      const risk_level = parseFloat(match[1]);
      const premiumAmountPercentage = parseFloat(match[3]);
      const MaximumInsuranceAmount = parseInt(match[5], 10);

      return {
        risk_level,
        premiumAmountPercentage,
        MaximumInsuranceAmount,
      };
    } else {
      throw new Error("Failed to extract values from the data string");
    }
  };
  return (
    <div>
      <ConnectKitButton theme="retro" />
      <button
        onClick={() =>
          requestPremium(
            "13.0843N 80.2705E",
            "01-06-2024 to 02-07-2024",
            "unfavourable condition for Rice growth"
          )
        }
      >
        Transfer
      </button>
      <br />
      <button
        onClick={async () => {
          const fetch = await readPremium(BigInt(3));
          console.log(fetch[fetch.length - 1]);

          setResponse(fetch[fetch.length - 1]);
          setRiskAssessment(parseRiskAssessment(fetch[fetch.length - 1]));
        }}
      >
        Read
      </button>
      <br />
      <div>
        {response && (
          <div>
            <h1>Risk:{RiskAssessment?.risk_level}</h1>
            <h1>
              premiumAmountPercentage:{RiskAssessment?.premiumAmountPercentage}
            </h1>
            <h1>
              MaximumInsuranceAmount:{RiskAssessment?.MaximumInsuranceAmount}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
