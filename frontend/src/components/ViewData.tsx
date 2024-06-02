import React, { useEffect, useState } from "react";
import { CheckCompletion, readPremium } from "@/helper/getters";
import { set } from "date-fns";

interface RiskAssessment {
  risk_level: number;
  premiumAmountPercentage: number;
  MaximumInsuranceAmount: number;
}

function ViewData({
  agentid,
  setStep,
}: {
  agentid: number;
  setStep: (step: number) => void;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null
  );
  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const isComplete = await CheckCompletion(BigInt(agentid));
        console.log("Checking completion:", isComplete);
        if (isComplete) {
          const fetch = await readPremium(BigInt(agentid));
          const parsedAssessment = parseRiskAssessment(fetch[fetch.length - 1]);
          setRiskAssessment(parsedAssessment);
          setLoading(false);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error checking completion:", error);
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [agentid]);

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
    <div className="flex items-center justify-center mt-8">
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="bg-white shadow-sm ring-1 ring-black sm:rounded-xl">
          <div className="px-4 py-4 sm:p-2">
            {loading
              ? "Loading..."
              : riskAssessment && (
                  <div>
                    <div className="grid max-w-2xl grid-cols-1 m-8">
                      <div className="sm:col-span-4">
                        <h1 className="text-lg font-bold leading-6 text-gray-900">
                          Risk:{" "}
                          <span className="font-semibold">
                            {riskAssessment.risk_level}
                          </span>
                        </h1>
                        <h1 className="text-lg font-bold leading-6 text-gray-900">
                          Premium Amount Percentage:{" "}
                          <span className="font-semibold">
                            {riskAssessment.premiumAmountPercentage}
                          </span>
                        </h1>
                        <h1 className="text-lg font-bold leading-6 text-gray-900">
                          Maximum Insurance Amount:{" "}
                          <span className="font-semibold">
                            {" "}
                            {riskAssessment.MaximumInsuranceAmount / 100}
                          </span>
                        </h1>
                      </div>
                      <div className="col-span-full mt-4">
                        <label
                          htmlFor="insurance-amount-slider"
                          className="block text-lg font-bold leading-6 text-gray-900"
                        >
                          Select Insurance Amount
                        </label>
                        <input
                          id="insurance-amount-slider"
                          type="range"
                          min="0"
                          max={riskAssessment.MaximumInsuranceAmount ?? 0}
                          value={selectedAmount}
                          onChange={(e) =>
                            setSelectedAmount(parseInt(e.target.value))
                          }
                          className="w-full mt-2"
                        />

                        <div className="mt-2 text-lg font-bold leading-6 text-gray-900">
                          Selected Amount:{" "}
                          <span className="font-semibold">
                            {selectedAmount / 100}
                          </span>
                        </div>
                        <div className="mt-2 text-lg font-bold leading-6 text-gray-900">
                          Premium to pay:{" "}
                          <span className="font-semibold">
                            {(
                              (selectedAmount / 100) *
                              (riskAssessment.premiumAmountPercentage / 100)
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          setStep(3);
                        }}
                      >
                        Preview Insurance
                      </button>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewData;
