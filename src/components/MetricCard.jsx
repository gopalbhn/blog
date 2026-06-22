
import React from "react";

const MetricCard = ({icon,title,number,className}) => {
    const Icon = icon
    return (

    <div className="h-full w-full flex items-center gap-x-5 border border-stone-300 rounded-xl bg-background-light shadow-sm hover:shadow-lg p-6 ">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-[#DBA59A] ${className}`}>
        <Icon className="text-background-light" />
      </div>
      <div className="flex flex-col  items-center ">
        <h3 className=" text-body font-bold  text-center"> {title}</h3>
        <p className="text-body font-bold text-center">{number}</p>
      </div>
    </div>
  );
};

export default MetricCard;
