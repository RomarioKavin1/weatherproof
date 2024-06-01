"use client";
import React from "react";
import { useAccount } from "wagmi";

import { ConnectKitButton } from "connectkit";
import { redirect } from "next/navigation";
function page() {
  const account = useAccount();
  if (account.isConnected) {
    redirect("/home");
  }
  return (
    <div className="bg-white ">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 h-screen  flex flex-col justify-center items-center ">
        <div className="border-black border-2 p-10 flex flex-col justify-center items-center rounded-xl py-20">
          <div className="flex justify-center items-center gap-5">
            <img className="h-24" src="/sun.svg" alt="Your Company" />
            <img className="h-24" src="/arrow.svg" alt="Your Company" />
          </div>

          <p className="mt-10 text-4xl font-bold text-center  text-gray-900 sm:text-6xl  flex justify-center items-center">
            Login to <br />
            WeatherProof
          </p>
          <div
            className="
            mt-10"
          >
            <ConnectKitButton theme="retro" />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
}

export default page;
