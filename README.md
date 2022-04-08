## ⚙️ 기능구현

<br/>

### 🛠 <span style="color: #2D3748; background-color:#fff5b1;">**LocalStorage custom hook**</span>

#### /hooks/useLocalStorage.js

```javascript
import { useState } from "react";

export const useLocalStorage = (key, initialState) => {
  const getLocalStorage = () => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialState;
    } catch (e) {
      console.error(e);
      return initialState;
    }
  };

  const [storage, setStorage] = useState(getLocalStorage());

  const setLocalStorage = (value) => {
    try {
      setStorage(value);
      const parsedValue = JSON.stringify(value);
      localStorage.setItem(key, parsedValue);
    } catch (e) {
      console.error(e);
    }
  };
  return [storage, setLocalStorage];
};
```

<br />

### 🛠 <span style="color: #2D3748; background-color:#fff5b1;">**QueryString custom hook**</span>

#### /hooks/useGetQs.js

```javascript
import { useSearchParams } from "react-router-dom";

const useGetQs = (...args) => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const target = searchParams.get('target');
  const [searchParams] = useSearchParams();
  // ...args = ["target", "option"]
  return args.reduce((acc, cur) => {
    // acc[cur] : object.key / searchParams.get(cur) : object.value
    acc[cur] = searchParams.get(cur);
    return acc;
  }, {});
};

export default useGetQs;
```

<br />

### 🛠 <span style="color: #2D3748; background-color:#fff5b1;">**Cach custom hook**</span>

#### /hooks/useGetAsideCached.js

```javascript
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
  }, [asideKey]);

  return [asideItem, isLoading];
};
```

<br />

### 🛠 <span style="color: #2D3748; background-color:#fff5b1;">**lodash debounce**</span>

#### /components/SerchBar.jsx

```javascript
import _ from "lodash";

// 검색시 debounce
const debounce = _.debounce((e) => handleSearchChange(e), 300);
const debounceSearch = useCallback(debounce, [debounce]);
```

<br />

### 🛠 <span style="color: #2D3748; background-color:#fff5b1;">**CSS Grid 반응형**</span>

#### /components/Post.jsx

```css
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15%, auto));
  grid-gap: 10px;
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  }
`;
```

<br />

### 🛠 <span style="color: #2D3748; background-color:#fff5b1;">**Object.entries(obj)**</span>

#### /components/Aside.jsx

```javascript
// Object.entries(obj) : 객체의 키와 값을 [key, value]의 배열로 반환(객체 ==> 배열)
// [{style: ''}, {season: ''}, {occasion: ''}, {fabric: ''}, {sense: ''}, {pattern: ''}]
const transAttribute = (attributes) => {
  return attributes.map((v) => {
    const [key, value] = Object.entries(v)[0];
    return [key, value];
  });
};
```
