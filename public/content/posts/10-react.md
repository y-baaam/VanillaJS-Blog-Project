---
emoji: "🔄"
title: "React 리렌더링이 발생하는 조건"
date: "2026-10-01"
categories: React
---

React에서 성능 최적화를 이야기하면 `memo`, `useMemo`, `useCallback`이 자주 등장한다. 하지만 이 도구들을 적용하려면 먼저 어떤 이유로 컴포넌트가 다시 렌더링되는지 알아야 한다.

이 글에서는 상태 변경, 부모 렌더링, Context 변경을 중심으로 리렌더링이 발생하는 조건을 살펴본다.

## 렌더링과 DOM 업데이트

React에서 렌더링은 컴포넌트를 실행해 화면에 표시할 결과를 계산하는 과정이다.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log("Counter 렌더링");

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      {count}
    </button>
  );
}
```

버튼을 클릭하면 다음 흐름으로 업데이트가 진행된다.

```text
상태 업데이트 요청
→ 컴포넌트 실행
→ 이전 결과와 새 결과 비교
→ 필요한 DOM 변경 적용
```

컴포넌트를 실행하는 단계는 **렌더링**, DOM에 변경을 적용하는 단계는 **커밋(commit)**이다.

리렌더링이 발생했다고 DOM 전체가 교체되는 것은 아니다. React는 새 렌더링 결과를 바탕으로 필요한 변경을 적용한다. 결과가 같다면 해당 DOM을 변경할 필요가 없을 수도 있다.

따라서 성능을 살펴볼 때는 컴포넌트 실행 비용과 실제 DOM 변경을 구분해야 한다.

## 상태 변경

컴포넌트가 관리하는 상태가 변경되면 React는 새로운 상태로 렌더링을 요청한다.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => prev + 1)}>
      {count}
    </button>
  );
}
```

여기서 `setCount`는 현재 실행 중인 함수의 `count` 변수를 직접 변경하지 않는다. 다음 렌더링에 사용할 상태 업데이트를 요청한다.

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count);
}
```

현재 렌더링의 `count`가 `0`이라면 로그에는 `0`이 출력된다. 새로운 상태는 다음 렌더링에서 읽게 된다.

### 업데이트 횟수와 렌더링 횟수

한 이벤트에서 상태 업데이트 함수를 여러 번 호출해도 호출마다 각각 렌더링하는 것은 아니다. React는 여러 업데이트를 묶어서 처리할 수 있다. 이를 배칭(batching)이라고 한다.

```jsx
function handleClick() {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
}
```

현재 값이 `0`이라면 React는 업데이트를 순서대로 계산해 최종 상태를 `2`로 만든다. 같은 클릭 안의 업데이트는 묶어서 처리된다.

다음 코드는 결과가 다르다.

```jsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
}
```

현재 렌더링의 `count`는 두 줄 모두에서 같은 값이다. `count`가 `0`이면 두 줄 모두 `1`로 변경하라는 요청이므로 최종 상태는 `1`이다.

### 객체와 배열 업데이트

React는 상태의 이전 값과 다음 값을 `Object.is`로 비교한다. 객체와 배열에서는 참조가 중요하다.

```jsx
const [user, setUser] = useState({ name: "Kim" });
```

기존 객체를 직접 수정하고 같은 객체를 전달하면 상태 변경을 제대로 알릴 수 없다.

```jsx
// 기존 객체를 직접 수정
user.name = "Lee";
setUser(user);
```

새 객체를 만들어 전달해야 한다.

```jsx
setUser((prev) => ({
  ...prev,
  name: "Lee",
}));
```

반대로 내용이 같더라도 새 객체를 전달하면 이전 상태와 다른 참조다. 상태를 업데이트할 필요가 있는지 판단하는 것도 중요하다.

## 부모 컴포넌트의 렌더링

자신의 상태가 바뀌지 않아도 부모의 렌더링으로 자식 컴포넌트가 다시 실행될 수 있다.

다음 예제는 React Compiler 같은 자동 최적화가 적용되지 않은 상황을 기준으로 한다.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>
        {count}
      </button>

      <Child name="Kim" />
    </>
  );
}

function Child({ name }) {
  console.log("Child 렌더링");

  return <p>{name}</p>;
}
```

버튼을 클릭하면 `Parent`가 다시 렌더링된다. 이때 기본적으로 `Child`도 다시 실행된다.

`Child`의 `name`은 계속 `"Kim"`이다. **props가 바뀌지 않았다는 이유만으로 자식의 렌더링을 자동으로 생략하는 것은 아니다.**

반면 자식 내부의 상태 변경이 부모의 렌더링을 자동으로 발생시키지는 않는다.

### 상태 위치 조정

검색어 상태가 입력창에서만 필요하다면 입력창 안에서 관리할 수 있다.

```jsx
function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  );
}

function Page() {
  return (
    <>
      <SearchInput />
      <ExpensiveChart />
    </>
  );
}
```

입력할 때 상태가 바뀌는 컴포넌트는 `SearchInput`이다. 이 업데이트 때문에 `Page`와 형제인 `ExpensiveChart`가 다시 렌더링되지는 않는다.

다만 검색어를 다른 컴포넌트에서도 사용해야 한다면 공통 부모에서 관리해야 할 수 있다. 상태 위치는 실제 사용 범위를 기준으로 결정해야 한다.

## Context 값 변경

`useContext`로 읽는 값이 변경돼도 리렌더링이 발생한다.

```jsx
const UserContext = createContext(null);

function UserProvider({ children }) {
  const [name, setName] = useState("Kim");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}

function UserName() {
  const { name } = useContext(UserContext);

  return <p>{name}</p>;
}
```

Provider의 `value`가 변경되면 해당 Context를 읽는 컴포넌트가 새 값으로 렌더링된다.

여기서 주의할 점은 `useContext`가 객체의 개별 필드만 구독하지는 않는다는 것이다.

```jsx
function RenameButton() {
  const { setName } = useContext(UserContext);

  return (
    <button onClick={() => setName("Lee")}>
      이름 변경
    </button>
  );
}
```

`RenameButton`은 `name`을 표시하지 않지만 같은 Context를 읽고 있다. 따라서 `name` 변경으로 Provider 값이 바뀌면 이 컴포넌트도 리렌더링된다.

### Provider의 객체 참조

다음 코드는 Provider가 렌더링될 때마다 새 객체를 만든다.

```jsx
value={{ name, setName }}
```

`name`이 그대로여도 Provider가 다른 이유로 렌더링되면 새 객체는 이전 객체와 다른 참조다. Context는 이를 값의 변경으로 판단할 수 있다.

필요한 경우 `useMemo`로 참조를 유지할 수 있다.

```jsx
const value = useMemo(
  () => ({ name, setName }),
  [name, setName]
);
```

그러나 `name`이 실제로 바뀌면 새 객체가 만들어지고 소비자도 다시 렌더링된다. `useMemo`가 개별 필드 구독을 제공하는 것은 아니다.

상태를 읽는 컴포넌트와 변경 함수만 사용하는 컴포넌트의 업데이트를 구분하려면 Context를 분리하는 방법도 있다.

## `memo`로 자식 렌더링 건너뛰기

`memo`는 부모가 렌더링되었을 때 props가 이전과 같으면 자식의 렌더링을 건너뛸 수 있도록 한다.

```jsx
const Child = memo(function Child({ name }) {
  console.log("Child 렌더링");

  return <p>{name}</p>;
});
```

앞의 `Parent` 예제에 적용하면 `count`가 변경돼도 `Child`의 `name`은 같으므로 자식 렌더링을 건너뛸 수 있다.

하지만 다음 경우에는 `memo`로 감싸도 렌더링된다.

- 컴포넌트 자신의 상태가 변경된 경우
- 컴포넌트가 읽는 Context 값이 변경된 경우
- 전달받은 props가 변경된 경우

`memo`는 성능 최적화 도구다. 컴포넌트의 정확한 동작을 위해 반드시 필요한 조건으로 사용해서는 안 된다.

### 객체와 함수 props

`memo`는 기본적으로 각 prop을 `Object.is`로 비교한다. 객체와 함수는 참조가 같아야 같은 값으로 판단된다.

```jsx
function Parent() {
  const options = { sort: "price" };
  const handleSelect = () => {};

  return (
    <MemoizedList
      options={options}
      onSelect={handleSelect}
    />
  );
}
```

`Parent`가 실행될 때마다 새 객체와 새 함수가 만들어진다. 따라서 자식을 `memo`로 감싸도 props가 변경된 것으로 판단될 수 있다.

이때 `useMemo`와 `useCallback`으로 참조를 유지하는 방법을 검토할 수 있다. 다만 자식의 렌더링 비용이 작다면 최적화를 추가하는 이점도 작을 수 있다.

## 훅별 역할

리렌더링과 관련된 훅을 모두 같은 종류의 최적화 도구로 보면 혼동하기 쉽다.

| 도구 | 역할 |
|---|---|
| `useState` | 상태를 관리하고 변경을 요청한다 |
| `useReducer` | reducer로 다음 상태를 계산한다 |
| `useContext` | Provider가 제공하는 값을 읽는다 |
| `useRef` | 렌더링 사이에 값을 보관하며, 변경 자체로 렌더링을 요청하지 않는다 |
| `useEffect` | 커밋 이후 외부 시스템과 동기화하는 작업을 수행한다 |
| `useMemo` | 의존성이 같으면 계산 결과를 재사용한다 |
| `useCallback` | 의존성이 같으면 함수 참조를 재사용한다 |

`useMemo`와 `useCallback`은 컴포넌트 자체의 리렌더링을 막는 도구가 아니다.

또한 React Compiler를 적용한 프로젝트에서는 자동 메모이제이션으로 수동 최적화의 필요가 줄어들 수 있다. 프로젝트 설정을 확인한 뒤 최적화 방식을 판단해야 한다.

## 불필요한 상태와 effect

최적화 도구를 추가하기 전에 상태와 effect가 필요한지 확인할 수 있다.

```jsx
const [total, setTotal] = useState(0);

useEffect(() => {
  setTotal(price * quantity);
}, [price, quantity]);
```

이 구조에서는 `price` 또는 `quantity` 변경으로 렌더링한 뒤, effect에서 `total`을 업데이트해 추가 렌더링이 발생할 수 있다.

단순히 계산 가능한 값이라면 렌더링 중 계산하면 된다.

```jsx
const total = price * quantity;
```

이 계산에 비용이 많이 들지 않는다면 `useMemo`도 필요하지 않다.

상태를 줄이면 렌더링뿐 아니라 값 사이의 동기화를 관리할 부담도 줄어든다.

## 렌더링 비용 확인

렌더링 횟수만으로 성능을 판단하기는 어렵다. 가벼운 컴포넌트가 여러 번 실행되는 것보다 무거운 계산을 하는 컴포넌트가 한 번 실행되는 것이 더 느릴 수 있다.

React DevTools Profiler를 사용하면 특정 동작에서 어떤 컴포넌트가 렌더링됐고 얼마나 시간이 들었는지 확인할 수 있다.

확인 순서는 다음과 같다.

1. 느려지는 사용자 동작을 정한다.
2. 어떤 컴포넌트가 업데이트되는지 확인한다.
3. 상태 위치, Context, props 참조 등 원인을 살펴본다.
4. 필요한 변경을 적용한다.
5. 같은 동작으로 다시 측정한다.

`console.log`는 컴포넌트 실행을 확인하는 데 사용할 수 있지만 성능 측정을 대신하지는 못한다. 개발 환경의 Strict Mode에서는 검증을 위해 컴포넌트가 추가로 실행될 수도 있다. 렌더링 작업이 실행됐다는 로그가 항상 실제 DOM 커밋을 의미하는 것도 아니다.

리렌더링을 분석할 때는 먼저 업데이트의 원인과 영향을 받는 범위를 확인한다. 그다음 실제 비용을 측정하고, 상태 구조를 조정하거나 필요한 부분에 메모이제이션을 적용한다.