"use client";
import React, { useState } from "react";
import { decrypt, encrypt } from "@/helper/lit";
import { readFileContent, Upload } from "@/helper/lighthouse";
import { useWriteContract } from "wagmi";
import { factoryabi } from "@/helper/abi";
import { factory } from "@/helper/constants";

interface RiskAssessment {
  risk_level: number;
  premiumAmountPercentage: number;
  MaximumInsuranceAmount: number;
}
interface Location {
  lat: string;
  lon: string;
}
interface PolicyDetails {
  PolicyName: string;
  PolicyDescription: string;
}

interface Step3Props {
  riskAssessment: RiskAssessment;
  policyDetails: PolicyDetails;
  onEncrypt: () => void;
  onPayPremium: () => void;
  selectedAmount: number;
  Location: Location | null;
}

const Step3: React.FC<Step3Props> = ({
  riskAssessment,
  policyDetails,
  onEncrypt,
  onPayPremium,
  selectedAmount,
  Location,
}) => {
  const [ciphertext, setCiphertext] = useState("");
  const [dataToEncryptHash, setDataToEncryptHash] = useState("");
  const [cid, setCid] = useState("");

  const handleEncrypt = async (data: string) => {
    const { ciphertext, dataToEncryptHash } = await encrypt(data);
    setCiphertext(ciphertext);
    setDataToEncryptHash(dataToEncryptHash);
    const cid = await Upload({
      details: `{"ciphertext": "${ciphertext}", "dataToEncryptHash": "${dataToEncryptHash}"}`,
    });
    setCid(cid);
    console.log(cid);
  };
  const handleEncryptClick = async () => {
    const policyDetailsArray: string[] = [
      `Policy Name: ${policyDetails.PolicyName}`,
      `Policy Description: ${policyDetails.PolicyDescription}`,
      `Risk Level: ${riskAssessment.risk_level}`,
      `Location Coordinates:${Location?.lat} ${Location?.lon}`,
      `Premium Amount Percentage: ${riskAssessment.premiumAmountPercentage}`,
      `Insurance Payout: ${selectedAmount}`,
    ];
    await handleEncrypt(policyDetailsArray.toString());
  };
  const { writeContract } = useWriteContract();
  const deployInsurance = async () => {
    try {
      writeContract({
        abi: factoryabi,
        address: factory,
        functionName: "deployInsuranceContract",
        args: [BigInt(1), cid],
      });
    } catch (error) {
      console.error("Error deploying insurance:", error);
    }
  };
  return (
    <div className="bg-white shadow-sm ring-1 ring-black sm:rounded-xl p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold leading-6 text-gray-900">
          Policy Preview
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold leading-6 text-gray-900">
            Policy Name
          </h2>
          <p className="mt-1 text-md leading-6 text-gray-700">
            {policyDetails.PolicyName}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold leading-6 text-gray-900">
            Policy Description
          </h2>
          <p className="mt-1 text-md leading-6 text-gray-700">
            {policyDetails.PolicyDescription}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold leading-6 text-gray-900">
            Risk Level
          </h2>
          <p className="mt-1 text-md leading-6 text-gray-700">
            {riskAssessment.risk_level}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold leading-6 text-gray-900">
            Premium Amount Percentage
          </h2>
          <p className="mt-1 text-md leading-6 text-gray-700">
            {riskAssessment.premiumAmountPercentage}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold leading-6 text-gray-900">
            Insurance Payout
          </h2>
          <p className="mt-1 text-md leading-6 text-gray-700">
            {selectedAmount}
          </p>
        </div>
        {cid && (
          <div>
            <h2 className="text-lg font-bold leading-6 text-gray-900">
              Your Encrypted Policy id/CID
            </h2>
            <p className="mt-1 text-md leading-6 text-gray-700">{cid}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <button
          onClick={handleEncryptClick}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Encrypt
        </button>
        <button
          onClick={() => deployInsurance()}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        >
          Pay Premium
        </button>
      </div>
    </div>
  );
};

export default Step3;
