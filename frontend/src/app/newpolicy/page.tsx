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
    {
      title: "Ipl Match 4",
      description: "Policy description for match 4",
      date: "04-06-2024",
    },
    {
      title: "Ipl Match 5",
      description: "Policy description for match 5",
      date: "05-06-2024",
    },
    {
      title: "Ipl Match 6",
      description: "Policy description for match 6",
      date: "06-06-2024",
    },
    {
      title: "Ipl Match 7",
      description: "Policy description for match 7",
      date: "07-06-2024",
    },
    {
      title: "Ipl Match 8",
      description: "Policy description for match 8",
      date: "08-06-2024",
    },
    {
      title: "Ipl Match 9",
      description: "Policy description for match 9",
      date: "09-06-2024",
    },
    {
      title: "Ipl Match 10",
      description: "Policy description for match 10",
      date: "10-06-2024",
    },
  ];
  return (
    <div className="bg-white h-fit min-h-screen">
      <Nav selected={0} />
      <div className=" flex flex-col text-black pt-10 px-56">
        <div className="flex items-center justify-center font-bold text-6xl border-b-2 pb-3">
          <p>Create New Policy</p>
        </div>
        <div className="flex flex-col-4 flex-wrap justify-center items-center gap-5">
          <PolicyCard
            key={1}
            imgsrc="/publicPolicy.svg"
            title={"Public Policy"}
            description={
              "Create a New Public Policy which can be bought by anybody"
            }
            date={""}
            createpolicy={true}
          />
          <Link href={"/newpolicy/privatepolicy"}>
            <PolicyCard
              key={1}
              imgsrc="/privatePolicy.svg"
              title={"Private Policy"}
              description={
                "Create your own Private Policy accesible only to you"
              }
              date={""}
              createpolicy={true}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
