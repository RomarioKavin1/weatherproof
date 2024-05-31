"use client";
import { ConnectKitButton } from "connectkit";
import { useWriteContract } from "wagmi";
import { premium } from "@/helper/abi";
import { readContract } from "@wagmi/core";
import { config } from "@/config";
import { useState } from "react";
import { premiumAgentContract } from "@/helper/constants";
import { readPremium } from "@/helper/getters";
import { request } from "http";
import { requestPremium } from "@/helper/setters";

export default function Home() {
  const [response, setResponse] = useState<readonly String[]>();
  const { writeContract } = useWriteContract();

  return (
    <div>
      <ConnectKitButton theme="retro" />
      <button
        onClick={() => requestPremium("13.0843N 80.2705E", "days", "condition")}
      >
        Transfer
      </button>
      <br />
      <button onClick={() => readPremium(BigInt(6))}>Read</button>
      <br />
      <div>
        {response?.map((item) => (
          <div key={1}>{item}</div>
        ))}
      </div>
    </div>
  );
}
