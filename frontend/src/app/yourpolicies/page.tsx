import Nav from "@/components/Nav";
import PolicyCard from "@/components/PolicyCard";
import Link from "next/link";
import React from "react";

function page() {
  const policies = [
    {
      title: "Ipl Match 1",
      description: "Policy description for match 1",
      date: "01-06-2024",
    },
    {
      title: "Ipl Match 2",
      description: "Policy description for match 2",
      date: "02-06-2024",
    },
    {
      title: "Ipl Match 3",
      description: "Policy description for match 3",
      date: "03-06-2024",
    },
  ];
  return (
    <div className="bg-white h-full min-h-screen">
      <Nav selected={2} />
      <div className=" flex flex-col text-black pt-10 px-56">
        <div className="flex items-center justify-center font-bold text-6xl border-b-2 pb-3">
          <p>Your Policies</p>
        </div>
        <div className="flex flex-col-4 flex-wrap">
          <Link href={"/yourpolicies/importpolicy"}>
            <PolicyCard
              imgsrc="/arrow.svg"
              key={1}
              title={"Import existing policy"}
              description={"Import a already existing policy"}
              date={""}
            />
          </Link>
          {policies.map((policy, index) => (
            <PolicyCard
              imgsrc="/diamond.svg"
              key={index}
              title={policy.title}
              description={policy.description}
              date={policy.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
