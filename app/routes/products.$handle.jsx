import {CartForm} from '@shopify/hydrogen';
import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import {Image, Money, ShopPayButton} from '@shopify/hydrogen-react';
import ProductOptions from '~/components/ProductOptions';

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
  const {shop, product, selectedVariant} = useLoaderData();

  return (
    <section className="w-full">
      <div className="">
        <div className="">
          <div className="grid gap-2">
            <h1 className="text-sm font-bold leading-10 whitespace-normal">
              {product.title}
            </h1>
          </div>
          <div className="-mx-4">
            <Image
              className={`w-full h-full aspect-square object-cover`}
              data={product.selectedVariant?.image || product.featuredImage}
            />
          </div>
        </div>
        <div className="md:sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-2 p-0 md:p-6 md:px-0 top-[6rem] lg:top-[8rem] xl:top-[10rem] py-5">
          {/* <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
            {product.vendor}
          </span> */}
          <div
            className="prose text-black text-sm"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          ></div>
          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
          />
          {/* <p>Selected Variant: {product.selectedVariant?.id}</p> */}
          <Money
            withoutTrailingZeros
            data={selectedVariant.price}
            className="text-xl font-semibold mb-2"
          />
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
                  className="border border-black rounded-sm w-full px-4 py-2 text-white bg-black uppercase hover:bg-white hover:text-black transition-colors duration-150"
                >
                  {selectedVariant?.availableForSale
                    ? 'Add to cart'
                    : 'Sold out'}
                </button>
              </>
            )}
          </CartForm>
        </div>
      </div>
    </section>
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
