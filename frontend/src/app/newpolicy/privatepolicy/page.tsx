"use client";
import { CreateForm } from "@/components/CreateForm";
import Nav from "@/components/Nav";
import Progress from "@/components/Progress";
import ViewData from "@/components/ViewData";
import { Combobox } from "@headlessui/react";
import React, { useState } from "react";

function page() {
  const [step, setStep] = useState(2);
  const [agentid, setAgentid] = useState<number>(8);
  return (
    <div className="bg-white h-fit min-h-screen">
      <Nav selected={0} />
      <div className=" flex flex-col text-black pt-10 px-56">
        <div className="flex items-center justify-center font-bold text-6xl border-b-2 pb-3">
          <p>Create Private Policy</p>
        </div>
        <Progress currentStep={step} />
        {step == 1 && (
          <div className="m-8">
            <CreateForm setStep={setStep} setagentid={setAgentid} />
          </div>
        )}
        {step == 2 && <ViewData agentid={agentid} setStep={setStep} />}
        <div>
          <Combobox />
        </div>
      </div>
    </div>
  );
}

export default page;
