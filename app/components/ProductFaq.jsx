import React, { useState } from "react";

export default function FAQ({ key }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const items = [
    { id: 1, question: "完成までにどのくらいかかりますか？", answer: "納期は通常約1.5ヶ月とさせていただいております。なお、予期せぬ事態により変更になる場合がありますのでご了承ください。" },
    { id: 2, question: "似顔絵の衣装はどんなふうになるのですか？　結婚式の前撮りなどをしていないのですが...", answer: "ご注文から受け渡しまでのスケジュールは1.5ヶ月を予定しております。" },
    { id: 3, question: "似顔絵の髪型はどんなふうになるのですか？　結婚式の前撮りなどをしていないのですが...", answer: "ご注文から受け渡しまでのスケジュールは1.5ヶ月を予定しております。" }
  ];
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };
  const toggle = (props) => {
    // setIsOpen(!isOpen);
    setValue(props);
  }

  return (
    <div>
      {items.map((item) => (
        <div>
          <div
            onClick={() => toggle(item.id)}
          >{item.question}<span>{`${value === (item.id) ? '-' : '+'}`}</span></div>
          <div
          className={`text-xs transition-all delay-150 duration-300 overflow-hidden ${value === (item.id) ? 'max-h-24' : 'max-h-0'
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
      {/* <div
        key={1}
        onClick={getValue}
      >
        <div>完成までにどのくらいかかりますか？<span>{isOpen ? '-' : '+'}</span></div>
        <div
          className={`text-xs transition-all delay-150 duration-300 overflow-hidden ${isOpen ? 'max-h-24' : 'max-h-0'
            }`}
        >
          納期は通常約1.5ヶ月とさせていただいております。なお、予期せぬ事態により変更になる場合がありますのでご了承ください。
        </div>
      </div> */}
    </div>
  );
}
