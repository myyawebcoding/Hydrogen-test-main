import React, { useState } from "react";

export default function FAQ() {
  const [openAnswer, setOpenAnswer] = useState({0: false});
  const faqs = [
    { question: "完成までにどのくらいかかりますか？", answer: "納期は通常約1.5ヶ月とさせていただいております。なお、予期せぬ事態により変更になる場合がありますのでご了承ください。" },
    { question: "似顔絵の衣装はどんなふうになるのですか？　結婚式の前撮りなどをしていないのですが...", answer: "ご注文から受け渡しまでのスケジュールは1.5ヶ月を予定しております。" },
    { question: "似顔絵の髪型はどんなふうになるのですか？　結婚式の前撮りなどをしていないのですが...", answer: "ご注文から受け渡しまでのスケジュールは1.5ヶ月を予定しております。" }
  ];

  const handleOpenAnswer = (index) => {
    setOpenAnswer((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
    console.log(openAnswer);
  }

  return (
    <div>
      {faqs.map((faq, index) => (
        <div
          key={faq.question}
          className="border-b border-[#E8E8E9]"
        >
          <div
            className="py-2 text-sm"
            onClick={() => handleOpenAnswer(index)}
          >
            {faq.question}<span>{`${openAnswer[index] ? '-' : '+'}`}</span>
          </div>
          <div
          className={`text-xs transition-all delay-150 duration-300 overflow-hidden ${openAnswer[index] ? 'max-h-24' : 'max-h-0'
            }`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
