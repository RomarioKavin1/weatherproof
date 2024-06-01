import Nav from "@/components/Nav";
import React from "react";

function page() {
  return (
    <div className="bg-white h-screen">
      <Nav />
      <div className=" flex flex-col text-black pt-10 px-60">
        <div className="flex items-center justify-center font-bold text-6xl border-b-2 pb-3">
          <p>Public Policies</p>
        </div>
        <div className="flex flex-col-4">
          <div className="w-80 border-2 rounded-md m-5 flex flex-col justify-center items-center p-5 hover:scale-105 border-black text-center">
            <img src="/diamond.svg" alt="diamond" />
            <p className="font-bold text-2xl py-2">Ipl Match 56</p>
            {/* <div className="flex justify-between w-full"> */}
            <p className="font-semibold text-lg text-slate-400">01-06-2024</p>
            {/* <p className="font-semibold text-lg text-slate-400">10GAL</p> */}
            {/* </div> */}

            <p className=" text-md ">
              A Policy that insures you from the matchday getting cancelled due
              to rain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
