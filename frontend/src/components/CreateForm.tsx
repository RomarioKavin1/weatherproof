"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SearchLoc from "./SearchLoc";
import ComboComponent from "./ComboComponent";
import { useWatchContractEvent, useWriteContract } from "wagmi";
import { premium } from "@/helper/abi";
import { premiumAgentContract } from "@/helper/constants";
import DatePickerComponent from "./DatePickerComponent";
import { Log } from "viem";
import { fetchWeatherData } from "@/helper/weatherxm";

interface Location {
  lat: string;
  lon: string;
}

interface CreateProps {
  setagentid: (agentid: number) => void;
  setStep: (step: number) => void;
  setPolicyDetails: (policyDetails: PolicyDetails | null) => void;
}

interface PolicyDetails {
  PolicyName: string;
  PolicyDescription: string;
}

export const CreateForm: React.FC<CreateProps> = ({
  setagentid,
  setStep,
  setPolicyDetails,
}) => {
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [weather, setWeather] = useState("Rain");
  const [rain, setRain] = useState("");
  const [temperature, setTemperature] = useState("");
  const [amount, setAmount] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [initiallogs, setInitialLogs] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: "13.060499",
    lon: "80.254417",
  });

  const weather1 = [
    { id: 1, name: "Rain" },
    { id: 2, name: "Temperature" },
  ];

  const rain1 = [
    { id: 1, name: "Below" },
    { id: 2, name: "Above" },
  ];

  const temperature1 = [{ id: 1, name: "Average" }];

  let Map = dynamic(() => import("./MapElement"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });

  useEffect(() => {
    Map = dynamic(() => import("./MapElement"), {
      ssr: false,
      loading: () => <p>Loading...</p>,
    });
    console.log("Selected Location", selectedLocation);
  }, [selectedLocation]);

  const { writeContract } = useWriteContract();
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
  const getweatherxm = async (lat: number, long: number) => {
    fetchWeatherData(lat, long)
      .then((weatherString) => {
        return weatherString;
      })
      .catch((error) => {
        return error;
      });
  };
  const abc = useWatchContractEvent({
    abi: premium,
    address: premiumAgentContract,
    eventName: "AgentRunCreated",
    onLogs(logs) {
      setLogs(logs);
      if (initiallogs == 0) {
        setInitialLogs(logs.length);
      } else if (logs.length > initiallogs) {
        setagentid(logs.length - 1);
        setStep(2);
      }
    },
  });

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 justify-center items-center">
        <div className="bg-white shadow-sm ring-1 ring-black sm:rounded-xl">
          <div className="px-4 py-4 sm:p-2">
            <div className="grid max-w-2xl grid-cols-1 m-8">
              <div className="sm:col-span-4">
                <label
                  htmlFor="policy-name"
                  className="block text-lg font-bold leading-6 text-gray-900"
                >
                  Policy Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="policy-name"
                      value={policyName}
                      onChange={(e) => {
                        setPolicyName(e.target.value);
                        setPolicyDetails({
                          PolicyName: e.target.value,
                          PolicyDescription: description,
                        });
                      }}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-lg font-bold mt-2 leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setPolicyDetails({
                        PolicyName: policyName,
                        PolicyDescription: e.target.value,
                      });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="location"
                  className="block text-md font-bold leading-6 text-gray-900"
                >
                  Enter Your Location
                </label>

                <div className="w-[600px] h-[400px] overflow-clip">
                  <Map
                    lat={parseFloat(selectedLocation.lat)}
                    long={parseFloat(selectedLocation.lon)}
                  />
                </div>
                <div className="mt-8">
                  <SearchLoc onLocationSelect={setSelectedLocation} />
                </div>
                <h2 className="text-xl font-bold mb-4">Select Date Range</h2>
                <DatePickerComponent
                  fromDate={fromDate}
                  toDate={toDate}
                  onFromDateChange={handleFromDateChange}
                  onToDateChange={handleToDateChange}
                />
                <div className="flex gap-2">
                  <div>
                    <ComboComponent
                      label="Choose Weather "
                      people={weather1}
                      onSelect={setWeather}
                    />
                  </div>
                  <div>
                    {weather == "Rain" ? (
                      <ComboComponent
                        label="Conditions"
                        people={rain1}
                        onSelect={setRain}
                      />
                    ) : (
                      <ComboComponent
                        label="Conditions"
                        people={temperature1}
                        onSelect={setTemperature}
                      />
                    )}
                  </div>
                  <div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="policy-name"
                        className="block text-lg  leading-6 text-gray-900"
                      >
                        {"  :"}
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            id="policy-name"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    {weather == "Rain" ? (
                      <p className="mt-8">cm</p>
                    ) : (
                      <p className="mt-8">c</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={async () => {
                console.log({ abc });
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                const weatherxmdata = getweatherxm(
                  parseFloat(selectedLocation.lat),
                  parseFloat(selectedLocation.lon)
                );
                requestPremium(
                  `Use internet ${selectedLocation.lat} ${
                    selectedLocation.lon
                  } Aproxweatherdata = ${weatherxmdata.toString()}`,
                  `${fromDate} to ${toDate}`,
                  weather == "Rain"
                    ? `${weather} ${rain} ${amount} cm`
                    : `${weather} ${temperature} ${amount} c`
                );
              }}
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
