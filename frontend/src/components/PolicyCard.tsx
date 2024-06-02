import React from "react";

interface PolicyCardProps {
  title: string;
  description: string;
  date: string;
  imgsrc: string;
  createpolicy?: boolean;
}

const PolicyCard: React.FC<PolicyCardProps> = ({
  title,
  description,
  date,
  imgsrc,
  createpolicy,
}) => {
  return (
    <div
      className={createpolicy ? " border-2 m-2 rounded-xl border-black" : ""}
    >
      <div className="w-80 h-[320px] border-2 rounded-md m-5 flex flex-col justify-center items-center p-5 hover:scale-105 border-black text-center">
        <img src={imgsrc} alt="diamond" key={1} />
        <p className="font-bold text-2xl py-2">{title}</p>
        <p className="font-semibold text-lg text-slate-400">{date}</p>
        <p className="text-md">{description}</p>
      </div>
    </div>
  );
};

export default PolicyCard;
