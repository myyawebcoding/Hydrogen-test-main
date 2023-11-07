import React, { useState } from "react";

export default function ProductSchedule() {
  const [myValue, setMyValue] = useState("");

  const handleClick = (index) => {
    setMyValue(index);
  };
  const items = [
    { value: "2023年12月受け取り" },
    { value: "2024年1月受け取り" },
    { value: "2024年2月受け取り" },
    { value: "2024年3月受け取り" },
    { value: "2024年4月受け取り" },
    { value: "2024年5月受け取り" }
  ];

  return (
    // <p>test</p>
    <div className="flex flex-col flex-wrap gap-y-2">
      <h3 className="whitespace-pre-wrap max-w-prose font-bold text-sm text-lead min-w-[4rem]">
        スケジュールをお選びください
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <button
            key={item.value}
            onClick={() => handleClick(index)}
            className={`text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200 ${myValue === index ? 'border-[#B66355] bg-[#F0E0DB]' : 'border-[#E8E8E9] bg-white'}`}
          >
            {item.value}
          </button>
        ))}
      </div>
    </div>
  )
}
