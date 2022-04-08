import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

// Aside 데이터 api 호출
const getAsideApi = async () => {
  try {
    const { data, status, statusText } = await axios.get(
      `https://static.pxl.ai/problem/data/regions.json`
    );

    if (status >= 400) {
      alert(`잘못된 요청입니다. statusText: ${statusText}`);
    } else if (status >= 500) {
      alert(`서버 에러입니다. statusText: ${statusText}`);
    }

    return {
      data,
      status,
      isLoading: false,
    };
  } catch (e) {
    alert(`에러가 발생했습니다. 잠시후 다시 실행해 주세요. `);
    return {
      data: undefined,
      status: e?.response?.status,
      isLoading: false,
    };
  }
};

// Number.isNaN() : 어떤 값이 NaN인지 판별
// !Number.isNaN(Number(str)) => 숫자가 맞다면
const isNumber = (str) => !Number.isNaN(Number(str));

// api 호출 데이터 중 target 데이터 가져오기
// data = [{…}, ...]
const findAsideItem = (data, asideKey) => {
  if (!data) return undefined;

  return isNumber(asideKey)
    ? data.find(({ product_code }) => product_code === Number(asideKey))
    : data.find(({ image_url }) => image_url.includes(asideKey));
};

// Aside custom hooks
export const useGetAsideCached = (asideKey) => {
  // asideKey = { target }
  const [isLoading, setIsLoading] = useState(true);
  const [storedAsideItem, setStoredAsideItem] = useLocalStorage("region", []);
  const [asideItem, setAsideItem] = useState(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callApi = async () => {
    setIsLoading(true);

    // 캐시된 데이터를 불러오기(object.key : [{…}] / {…} = {key: 'target', value: {…}})
    const cached = storedAsideItem.find((i) => i.key === asideKey);

    // 캐시된 데이터가 있다면
    if (cached) {
      setAsideItem(cached.value);
      return setIsLoading(false);
    }

    // 캐시된 데이터가 없다면
    const { data } = await getAsideApi();
    const item = findAsideItem(data, asideKey);

    setStoredAsideItem([...storedAsideItem, { key: asideKey, value: item }]);
    setAsideItem(item);
    setIsLoading(false);
  };

  useEffect(() => {
    callApi();
  }, [asideKey, callApi]);

  return [asideItem, isLoading];
};
