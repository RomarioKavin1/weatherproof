"use client";
import { CreateForm } from "@/components/CreateForm";
import Nav from "@/components/Nav";
import Progress from "@/components/Progress";
import ViewData from "@/components/ViewData";
import Step3 from "@/components/Step3";
import React, { useState } from "react";

interface RiskAssessment {
  risk_level: number;
  premiumAmountPercentage: number;
  MaximumInsuranceAmount: number;
}

interface PolicyDetails {
  PolicyName: string;
  PolicyDescription: string;
}

function page() {
  const [step, setStep] = useState(1);
  const [agentid, setAgentid] = useState<number>(8);
  const [riskAssessment, setRiskAssessment] = useState<RiskAssessment | null>(
    null
  );
  const [policyDetails, setPolicyDetails] = useState<PolicyDetails | null>({
    PolicyName: "My Policy",
    PolicyDescription: "Policyy",
  });

  const [selectedAmount, setSelectedAmount] = useState<number>(0);

  const handleEncrypt = () => {
    // Implement encryption logic here
    console.log("Encrypting policy...");
  };

  const handlePayPremium = () => {
    // Implement pay premium logic here
    console.log("Paying premium...");
  };

  return (
    <div className="bg-white h-fit min-h-screen">
      <Nav selected={0} />
      <div className="flex flex-col text-black pt-10 px-56">
        <div className="flex items-center justify-center font-bold text-6xl border-b-2 pb-3">
          <p>Create Private Policy</p>
        </div>
        <Progress currentStep={step} />
        {step === 1 && (
          <div className="m-8">
            <CreateForm
              setStep={setStep}
              setagentid={setAgentid}
              setPolicyDetails={setPolicyDetails}
            />
          </div>
        )}
        {step === 2 && (
          <ViewData
            agentid={agentid}
            setStep={setStep}
            setRiskAssessmentParent={setRiskAssessment}
            selAmount={setSelectedAmount}
          />
        )}
        {step === 3 && riskAssessment && policyDetails && (
          <div className="m-8">
            <Step3
              riskAssessment={riskAssessment}
              policyDetails={policyDetails}
              onEncrypt={handleEncrypt}
              onPayPremium={handlePayPremium}
              selectedAmount={selectedAmount}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
