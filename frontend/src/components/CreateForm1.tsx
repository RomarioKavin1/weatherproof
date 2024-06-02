"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import { premium } from "@/helper/abi";
import { premiumAgentContract } from "@/helper/constants";
import { Address } from "viem";
import { readInsurance } from "@/helper/getters";
import { decrypt } from "@/helper/lit";

export const CreateForm1 = () => {
  const [policyAddress, setPolicyAddress] = useState("");
  const [response, setResponse] = useState<any>();
  const { writeContract } = useWriteContract();
  const [decryptedData, setDecryptedData] = useState<any>();
  const handleDecrypt = async (cid: string): Promise<string> => {
    const a = await decrypt(cid);
    console.log("first here", a);
    return a;
  };
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="bg-white shadow-sm ring-1 ring-black sm:rounded-xl flex items-center justify-center ">
          {!response && (
            <div className="flex items-center justify-center ">
              <div className="px-4 py-4 sm:p-2">
                <div className="grid max-w-2xl grid-cols-1 m-8">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="policy-name"
                      className="block text-lg font-bold leading-6 text-gray-900"
                    >
                      Enter Policy Address
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md justify-center items-center shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          id="policy-name"
                          value={policyAddress}
                          onChange={(e) => {
                            setPolicyAddress(e.target.value);
                          }}
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center item">
                <div className="flex items-center justify-end w-full gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={async () => {}}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md w-full flex items-center justify-center  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={async () => {
                      const fetch = await readInsurance(
                        "89c27f76EEF3e09D798FB06a66Dd461d7d21f111"
                      );
                      setResponse(fetch);
                      console.log(fetch);
                    }}
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          )}
          {response && (
            <div className="flex items-center flex-col m-5 justify-center">
              <div className="p-5">
                {response.map((item: any) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={async () => {
                  const a = await handleDecrypt(response[response.length - 1]);
                  setDecryptedData(a);
                  console.log("here", a);
                }}
              >
                Decrypt
              </button>
              <div className="p-5 text-black">
                {decryptedData && (
                  <div>
                    <div>{decryptedData}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
