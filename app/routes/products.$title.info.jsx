// export default function Info() {
//   return (
//     <>
//       <h1>products/Info Page</h1>
//     </>
//   );
// }
// export async function loader({
//   params,
// }: LoaderFunctionArgs) {
//   return fakeDb.getAllConcertsForCity(params.title);
// }
import { useParams, useLocation } from '@remix-run/react';

export default function PostDetailPage() {
  const params = useParams();
  const location = useLocation();
  // const { title } = location.state as State;
  // console.log(params.metafield);
  // console.log(location.state.title);
  // console.log("hello!");
  return (
    <>
      <h2>this is info Page</h2>
      {location.state.title}
      {/* <div>{product.metafield.value}</div>; */}
    </>
  )
}
