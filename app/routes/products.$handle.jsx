import {CartForm} from '@shopify/hydrogen';
import { useLoaderData, useLocation, Link } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import {Image, Money, ShopPayButton} from '@shopify/hydrogen-react';
import ProductOptions from '~/components/ProductOptions';
import ProductFaq from '~/components/ProductFaq';
// import { NavLink } from '@remix-run/react';
// const Modal = () => {
//   return (
//     <div className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ">
//       <div className="z-[2] w-4/5 bg-white">
//         <p>これがモーダルウィンドウです。</p>
//         <p>
//           <button>close</button>
//         </p>
//       </div>
//     </div>
//   );
// }
const seo = ({data}) => ({
  title: data?.product?.title,
  description: data?.product?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export async function loader({params, context, request}) {
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });


  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Set a default variant so you always have an "orderable" product selected
  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  return json({
    shop,
    product,
    selectedVariant,
  });
}

export default function ProductHandle() {
  const { shop, product, selectedVariant } = useLoaderData();
  const location = useLocation();
  // const params = useParams();
  // console.log(product);

  return (
    <>
      <section className="w-full">
        <div className="">
          <div className="">
            <div className="grid gap-2">
              {/* <h1 className="text-sm font-bold leading-10 whitespace-normal">
                {product.title}
              </h1> */}

              {/* <NavLink
                to=".."
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Go back!
              </NavLink> */}
            </div>
            <div className="">
              <Image
                className={`w-full h-full aspect-square object-cover`}
                data={product.selectedVariant?.image || product.featuredImage}
              />
            </div>
          </div>
          <div className="md:sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-2 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem] py-5 px-4">
            {/* <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
              {product.vendor}
            </span> */}
            <div
              className="prose text-black text-sm"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            ></div>
            {/* <div className="text-xs">商品情報詳細</div>
            <button>click</button> */}
            <Link
              to={"./info"}
              state={{ title: product.metafield.value }}
              className="text-xs"
            >
              商品情報詳細
            </Link>
            {/* <div className=""></div>
            <Modal/> */}
            {/* <div>
              { custom._product-information }
            </div> */}
          </div>

          <div className="bg-[#F7F7F7] py-6 px-4">
            <ProductOptions
              options={product.options}
              selectedVariant={selectedVariant}
            />
            {/* <p>Selected Variant: {product.selectedVariant?.id}</p> */}

          </div>
          <div className="bg-white py-4 px-4">
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              className="text-xl font-semibold mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              {selectedVariant.availableForSale && (
                <ShopPayButton
                  storeDomain={shop.primaryDomain.url}
                  variantIds={[selectedVariant?.id]}
                  width={'100%'}
                />
              )}
              <CartForm
                route="/cart"
                inputs={{
                  lines: [
                    {
                      merchandiseId: selectedVariant.id,
                    },
                  ],
                }}
                action={CartForm.ACTIONS.LinesAdd}
              >
                {(fetcher) => (
                  <>
                    <button
                      type="submit"
                      onClick={() => {
                        window.location.href = window.location.href + '#cart-aside';
                      }}
                      disabled={
                        !selectedVariant.availableForSale ??
                        fetcher.state !== 'idle'
                      }
                      className="border border-[#B66355] rounded-md w-full h-11 px-4 py-2 text-sm text-white bg-[#B66355] uppercase hover:bg-[#B66355] hover:text-black transition-colors duration-150"
                    >
                      {selectedVariant?.availableForSale
                        ? 'カートに入れる'
                        : 'Sold out'}
                    </button>
                  </>
                )}
              </CartForm>
            </div>
          </div>
          <div className="bg-[#F7F7F7] py-6 px-4">
            <ProductFaq/>
          </div>
        </div>
      </section>
    </>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    shop {
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      id
      title
      handle
      vendor
      metafield(namespace: "custom", key: "_product-information"){
        value
      }
      description
      descriptionHtml
      featuredImage {
        id
        url
        altText
        width
        height
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
