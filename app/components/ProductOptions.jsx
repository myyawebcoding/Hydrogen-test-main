import {
  Link,
  useLocation,
  useSearchParams,
  useNavigation,
} from '@remix-run/react';

export default function ProductOptions({options, selectedVariant}) {
  const {pathname, search} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);

    if (!selectedVariant) {
      return defaultParams;
    }

    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }

    return defaultParams;
  })();

  // Update the in-flight request data from the 'navigation' (if available)
  // to create an optimistic UI that selects a link before the request is completed
  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : paramsWithDefaults;

  return (
    <div className="grid gap-4 mb-6">
      <div className="flex flex-col flex-wrap gap-y-2">
        <h3 className="whitespace-pre-wrap max-w-prose font-bold text-sm text-lead min-w-[4rem]">
          スケジュールをお選びください
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200">2023年12月受け取り</div>
          <div className="text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200">
            <div className="grid gap-1">
              <div>2024年1月受け取り</div>
              <div className="text-xs text-red-500">売り切れ</div>
            </div>
          </div>
          <div className="text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200">2024年2月受け取り</div>
          <div className="text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200">2024年3月受け取り</div>
          <div className="text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200">2024年4月受け取り</div>
          <div className="text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200">
            <div className="grid gap-1">
              <div>2024年5月受け取り</div>
              <div className="text-xs text-red-500">売り切れ</div>
            </div>
          </div>
        </div>
      </div>
      {options.map((option) => {
        if (!option.values.length) {
          return;
        }

        // get the currently selected option value
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap gap-y-2"
          >
            <h3 className="whitespace-pre-wrap max-w-prose font-bold text-sm text-lead min-w-[4rem]">
              {option.name}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {option.values.map((value) => {
                const linkParams = new URLSearchParams(searchParams);
                const isSelected = currentOptionVal === value;
                linkParams.set(option.name, value);
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${linkParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`text-xs leading-none rounded-lg px-4 h-16 flex items-center border-[1.5px] cursor-pointer hover:no-underline transition-all duration-200 ${
                      isSelected ? 'border-[#B66355] bg-[#F0E0DB]' : 'border-[#E8E8E9] bg-white'
                    }`}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
