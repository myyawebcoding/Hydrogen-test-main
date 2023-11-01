import { useNavigate } from '@remix-run/react';

export function StackNav(props) {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  // console.log(props);

  return (
    // <header className="header">
    <header className="sticky top-0 bg-white z-10">
      <h1 className="text-base m-0">
        {/* <button className="w-full h-12 px-6 relative" onClick={goBack}><span className="absolute left-0">＜</span>{props.title}</button> */}
        <button className="h-14 w-full h-12 px-6 relative" onClick={goBack}><span className="absolute left-4">＜</span>h1 title</button>
      </h1>
    </header>
  )
}
