---
emoji: "📝"
title: "React-Memoization"
date: "2024-06-06"
categories: React
---



> ## What is Memoization?
메모이제이션(memoization)은 불필요한 렌더링을 방지하고, 성능을 최적화하기 위한 기술입니다.
주로 중복 연산을 피하기 위해 사용되며, 특히 재귀 함수나 연산이 많이 드는 계산에서 유용합니다.

# React 에서 Memoization

React에서는 불필요한 렌더링이 일어날 때 Memoization 을 활용하여 렌더링을 최적화 하고, 렌더링 성능을 개선할 수 있게 도와줍니다. 

먼저 React에서 불필요한 렌더링이 발생할 때를 알아봅시다.

## 불필요한 렌더링?

### 1. Props 변화 없이 부모 컴포넌트가 렌더링될 때
부모 컴포넌트가 렌더링되면 기본적으로 자식 컴포넌트도 렌더링됩니다. 자식 컴포넌트의 props나 state에 변화가 없더라도 말이죠.

### 2. 객체나 배열과 같은 참조 타입의 props
참조 타입의 props가 매번 새로운 참조로 전달되면, 컴포넌트는 새로운 props로 인식하고 불필요하게 렌더링될 수 있습니다.

### 3. 복잡한 계산이 포함된 컴포넌트
컴포넌트 내에서 복잡한 계산이 이루어지는 경우, 이러한 연산들은 컴포넌트가 렌더링될 때마다 반복되어 성능 저하를 일으킬 수 있습니다.

### 4. 컴포넌트의 상태 업데이트
컴포넌트는 상태를 업데이트하지만, 실제로 렌더링할 새로운 결과가 없는 경우에도 업데이트되어 불필요한 렌더링이 발생할 수 있습니다.

### 5. 함수 컴포넌트 내에서 선언된 함수들
함수 컴포넌트가 렌더링될 때마다 내부에서 정의된 함수들도 새로 생성되므로, 이 함수들을 자식 컴포넌트에 props로 전달하면 자식 컴포넌트도 불필요하게 렌더링될 수 있습니다.

---
## 1. React.memo

React.memo는 고차 컴포넌트 입니다. React.memo를 이용해서 감싸는 방식으로 자식 컴포넌트가 받는 props에 변화가 있다면 리렌더링을 하고 변화가 없다면 기존에 저장되어 있던 내용을 재사용합니다.


>고차 컴포넌트 (HOC, Higher Order Component)란?
고차 컴포넌트는 컴포넌트 로직을 재사용하기 위해 사용되고 컴포넌트를 매개변수로 받아 새로운 컴포넌트르 반환하는 함수를 의미합니다.

### React.memo 활용 예시
```jsx
import React, { useState } from 'react';

// ProfileComponent는 사용자 프로필을 표시하는 컴포넌트입니다.
// React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
const ProfileComponent = React.memo(({ user }) => {
  console.log('ProfileComponent 렌더링');
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John Doe', age: 30 });

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <Profile user={user} />
    </div>
  );
};

export default App;

```
- 이 컴포넌트는 React.memo로 감싸져 있어, user 객체의 내용이 변경되지 않는 한 리렌더링되지 않습니다. 
- App 컴포넌트에서 count를 업데이트해도 user 객체는 변경되지 않으므로, ProfileComponent의 불필요한 리렌더링을 방지하여 성능을 최적화합니다.


### React.memo 언제 사용해야 될까?
- 함수 컴포넌트에서만 적용이 가능합니다.
- props로 리렌더링 자주 일어나는 컴포넌트에 유용합니다. 하지만 React.memo()는 props를 비교하여 메모이제이션을 하는 함수기 때문에 props가 계속해서 바뀌는 컴포넌트에서는 성능최적화를 기대하기 어렵습니다.
- 컴포넌트의 렌더링 비용(무겁고 복잡한 연산)이 큰 경우에 사용됩니다.

### React.memo 주의사항
**1. 얕은 비교 (Shallow Comparison)**
React.memo는 props의 얕은 비교를 수행합니다. 즉, 객체 내부의 깊은 값의 변화를 감지하지 못할 수 있으므로, 객체 내부의 값이 변경될 경우에도 컴포넌트가 업데이트되지 않을 수 있습니다.

해당 부분을 방지하려면 useMemo, useCallback 등의 hook을 사용할 수 있고, React.memo(Component, areEqual)에 두번째 인자값으로 이전 props와 새로운 props를 비교하여 true/false를 반환하고 리렌더링을 결정할 수 있습니다.

```jsx
const customEqual = (prevProps, nextProps) => {
  // 깊은 비교 로직 구현
  return deepEqual(prevProps, nextProps); // 예시로 deepEqual 함수 사용
};

const MyComponent = React.memo(Component, customEqual);

```

**2. 컴포넌트의 복잡성**
단순한 컴포넌트에 React.memo를 사용하는 것은 오히려 성능에 부정적인 영향을 미칠 수 있습니다. props 비교에 드는 비용이 렌더링 비용보다 클 수 있기 때문입니다.


--- 
## 2. useMemo
useMemo는 계산 비용이 많이 드는 연산의 결과 값을 메모이제이션하여, 같은 입력에 대해 여러 번 재계산하지 않도록 하고, 렌더링 성능을 최적화하는 데 사용됩니다. 

### useMemo 활용 예시
```jsx
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // calculateMemoizedCount 함수는 count 값을 인자로 받아 복잡한 계산을 수행합니다.
  const calculateMemoizedCount = (count) => {
    let result = count;
    for (let i = 0; i < 100; i++) {
      console.log('테스트 :: ', i);
      result += i;
    }
    console.log('끝');
    return result;
  };

  // useMemo를 사용하여 calculateMemoizedCount 함수의 결과를 메모이제이션합니다.
  // 이 함수는 count 값이 변경될 때만 재계산됩니다.
  const memoizedCount = useMemo(() => calculateMemoizedCount(count), [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Memo Count: {memoizedCount}</p>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => setCount(count + 1)}>Count</button>
    </div>
  );
};

const App = () => {
  return <MyComponent />;
};

export default App;

```


### useMemo 언제 사용해야 될까?
**1. 계산 비용이 높은 함수의 결과를 캐싱할 때**
함수가 복잡하고 계산 비용이 많이 드는 경우, 입력 값이 변경될 때만 함수를 다시 실행하고, 그렇지 않은 경우 이전 결과를 재사용하고 싶을 때 사용합니다.

**2. 렌더링 최적화가 필요할 때**
특히 리스트와 같이 큰 양의 데이터를 렌더링하거나, 자식 컴포넌트가 불필요하게 자주 렌더링되는 경우, 자식 컴포넌트에 전달되는 props를 메모이제이션하여 성능을 향상시킬 수 있습니다.

**3. 참조 동일성을 유지할 때**
객체나 배열과 같은 참조 타입의 값을 props로 전달할 때, 부모 컴포넌트가 렌더링될 때마다 새로운 참조가 생성되는 것을 방지하고, 자식 컴포넌트가 불필요하게 리렌더링되는 것을 방지하기 위해 useMemo를 사용합니다.

**4. 의존성 배열에 있는 값들에 의해서만 계산이 이루어져야 할 때**
useMemo의 두 번째 인자인 의존성 배열을 사용하여, 배열 내의 값들이 변경되었을 때만 메모이제이션된 값을 다시 계산하도록 할 수 있습니다.

### useMemo 주의사항
**1. 필요성 검토**
useMemo를 사용하기 전에 실제로 성능 개선이 필요한지 검토해야 합니다. 메모이제이션은 리소스를 사용하므로, 모든 값을 메모이제이션하는 것이 항상 좋은 것은 아닙니다.

**2. 복잡한 객체 참조**
useMemo는 참조 타입의 값을 메모이제이션할 때 특히 유용하지만, 복잡한 객체나 배열을 메모이제이션하는 경우에는 깊은 비교가 필요할 수 있으며, 이는 추가적인 계산 비용을 발생시킬 수 있습니다.

**3. 의존성 배열 관리**
useMemo의 의존성 배열을 정확하게 관리해야 합니다. 배열 내의 값이 변경될 때만 메모이제이션된 값을 다시 계산해야 하며, 잘못된 값이 배열에 포함되면 예상치 못한 버그를 일으킬 수 있습니다.

**4. sideEffect 방지** 
useMemo는 순수 계산을 위한 것이므로, sideEffect을 발생시키는 연산에는 사용하지 않아야 합니다. sideEffect가 필요한 경우 useEffect를 사용해야 합니다.

**5. 성능 최적화 도구로서의 사용**
useMemo는 성능 최적화를 위한 도구이지만, 모든 성능 문제를 해결할 수 있는 만병통치약은 아닙니다. 성능 문제가 발생했을 때 프로파일링을 통해 실제 병목 현상을 파악하고 그에 맞춰 최적화를 진행해야 합니다.

**6. 메모이제이션된 값의 안정성**
React는 메모리를 관리하기 위해 useMemo로 생성된 값을 버릴 수 있습니다. 따라서 리렌더링 사이에 메모이제이션된 값이 반드시 유지되어야 한다는 보장이 없습니다. 이는 언제나 안정적인 상태 저장소로 사용할 수 없다는 것을 의미합니다.


---
## 3. useCallback

useCallback은 함수를 메모이제이션하는 데 사용됩니다. 특정 함수를 컴포넌트의 렌더링 사이에 재사용할 수 있도록 하여, 컴포넌트의 불필요한 리렌더링을 방지하고 성능을 최적화합니다. 

이는 주로 자식 컴포넌트에 함수를 props로 전달할 때 유용하며, 자식 컴포넌트가 불필요하게 렌더링되는 것을 방지할 수 있습니다.

>useCallback과 useMemo의 차이점은 함수를 재사용하느냐, 값을 재사용하느냐의 차이입니다.


### useCallback 활용 예시
```jsx
import React, { useState, useEffect } from 'react';

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  // 이 함수는 컴포넌트가 리렌더링될 때마다 새로운 참조를 갖게 됩니다.
  const fetchUser = () => {
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser가 변경될 때마다 useEffect가 실행됩니다.

  // ...
}
```

위의 fetchUser 함수는 컴포넌트가 리렌더링될 때마다 새로운 참조를 가지게 됩니다.

useEffect의 의존성 배열에 fetchUser가 포함되어 있기 때문에, 함수가 변경될 때마다 useEffect가 다시 실행됩니다. 

이로 인해 fetchUser는 계속해서 새로운 데이터를 가져오고 setUser를 호출하여 상태를 업데이트하고, 이 상태 업데이트는 컴포넌트를 다시 리렌더링시키게 되어 무한 루프에 빠지게 됩니다.

이제 	`useCallback` 을 활용하여 무한 루프를 해결하는 방법을 살펴봅니다.

```jsx
import React, { useState, useEffect, useCallback } from 'react';

function Profile({ userId }) {
  const [user, setUser] = useState(null);

  // useCallback을 사용하여 함수를 메모이제이션합니다.
  const fetchUser = useCallback(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, [userId]); // userId가 변경될 때만 fetchUser 함수를 새로 생성합니다.

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // fetchUser가 변경될 때만 useEffect가 실행됩니다.

  // ...
}
```

이제 fetchUser는 userId가 변경될 때만 새로 생성됩니다.

userId가 바뀌지 않는 한 useEffect는 fetchUser 함수로 인해 재실행되지 않으므로 무한 루프에 빠지지 않게 됩니다.

### useCallback 언제 사용해야 될까?
**1. 자식 컴포넌트에 함수를 props로 전달할 때**
특히 React.memo로 최적화된 자식 컴포넌트에 함수를 전달할 경우, 리렌더링을 방지하기 위해 useCallback으로 함수를 메모이제이션합니다.

**2. 의존성 배열을 사용하는 훅에 함수를 포함할 때**
useEffect, useMemo, useCallback 등에서 의존성 배열을 사용하고, 배열 내의 함수가 불필요한 재생성으로 인해 무한 루프나 추가 리렌더링을 발생시킬 수 있는 경우에 useCallback을 사용합니다.

**3. 렌더링 사이에 동일한 참조를 유지해야 할 때**
동일한 함수 참조를 유지해야 하는 경우 (이벤트 핸들러나 콜백 함수)에 useCallback을 사용하여 함수가 불필요하게 재생성되는 것을 방지합니다.

### useCallback 주의사항
**1. 필요성 검토** 
모든 함수에 useCallback을 사용할 필요는 없습니다. 특히 함수가 자주 변경되지 않거나, 메모이제이션의 이득이 크지 않은 경우에는 useCallback 사용을 피하는 것이 좋습니다.

**2. 의존성 배열 관리**
useCallback의 의존성 배열에는 함수 실행에 필요한 모든 외부 변수와 상태를 포함시켜야 합니다. 배열에 포함되지 않은 변수가 함수 내에서 사용되면 예상치 못한 오류가 발생할 수 있습니다.

**3. 메모리 사용 증가**
useCallback은 메모리에 함수를 저장합니다. 함수가 크거나 복잡할 경우, 불필요하게 메모리 사용량을 증가시킬 수 있으므로 신중하게 사용해야 합니다.

**4. 렌더링 최적화**
useCallback은 주로 자식 컴포넌트에 함수를 props로 전달할 때 사용됩니다. 이는 자식 컴포넌트의 불필요한 리렌더링을 방지할 수 있지만, 자식 컴포넌트가 React.memo로 감싸져 있지 않다면 큰 효과를 보기 어려울 수 있습니다.

---

## 마치며

React.memo, useMemo, useCallback 등은 적절히 사용될 때, 렌더링 성능을 상당히 개선할 수 있습니다. 특히 불필요한 리렌더링을 방지하고 계산 비용이 높은 작업을 효율적으로 관리하는 데 큰 도움이 됩니다.

하지만 이러한 방법들을 사용할 때 주의가 필요합니다. 무분별한 사용은 오히려 성능 저하나 예상치 못한 버그를 발생시킬 수 있기 때문입니다.

