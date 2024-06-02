"use client";
import Nav from "@/components/Nav";
import Progress from "@/components/Progress";
import React, { useState } from "react";

function page() {
  const [step, setStep] = useState(1);
  return (
    <div className="bg-white h-fit min-h-screen">
      <Nav selected={0} />
      <div className=" flex flex-col text-black pt-10 px-56">
        <div className="flex items-center justify-center font-bold text-6xl border-b-2 pb-3">
          <p>Create Private Policy</p>
        </div>
        <Progress currentStep={step} />
      </div>
    </div>
  );
}

export default page;
