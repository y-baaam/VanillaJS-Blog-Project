---
emoji: "😮"
title: "useReducer를 사용해보자!"
date: "2024-06-18"
categories: React
---

React에서는 상태 관리를 다루는 Hook이 2가지가 있습니다.

1. useState()
2. useReducer()

왜 상태 관리하는 Hook이 2가지나 있을까요? 

`useState` 는 단순한 상태 관리에는 적합하지만, 로직이 복잡해지거나 상태가 여러 개로 분리되는 경우에는 `useState`를 여러번 쓰는 것 보단 `useReducer`를 한 번 사용하여 중앙화할 수 있습니다.

### useState를 사용하는 경우
```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);

  return (
    <div>
      <p>Count :{count}
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      </p>
    </div>
  )
}

```
useState는 이런 단순한 로직에 적합합니다.


### useReducer를 사용하는 경우
```jsx
const initialState = { count: 0, step: 1 };

const init = (initialState) => {
  return { count: initialState.count, step: initialState.step };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

  const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    return (
      <div>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      </div>
    );
  }
}
```
이렇게 useReducer는 여러 개의 상태를 다룰 때 사용됩니다.

그런데 action은 뭐고 reducer함수? initialState? dispatch??

useReducer에 대해서 더 자세하게 알아봅시다!

---

## useReducer란?
리액트(React)의 useReducer는 상태 관리와 상태 업데이트를 다루는 React 훅 중 하나입니다. 이 훅은 주로 복잡한 상태 관리 로직을 다루거나 여러 컴포넌트 간에 상태를 공유할 때 사용됩니다.

## 사용 방법
아래는 useReducer()을 선언하는 방법입니다.

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

- state: 상태 이름
- dispatch: 상태를 업데이트하는 함수
- reducer: 현재 상태와 액션을 받아 state를 변경해주는 함수
- initialState: 상태의 초기값을 정의(객체, 배열 등 다양한 값으로도 전달할 수 있습니다.)
- init?: 초기 상태를 동적으로 계산하는 함수입니다

이게 뭘까요? 아직 와닿지가 않습니다. 

더 이해하기 쉽게 은행 계좌 관리를 예로 들어볼게요!

- **state**: 현재 상태 (컴포넌트에서 사용할 상태) > 현재 계좌 잔액
현재 계좌의 잔액입니다. ex) 계좌 초기 잔액이 1000원이고 1000원을 입금하고 500원을 출금했을 때, 최종 잔액은 1500원이 됩니다.
- **initialState**: state에 전달할 초기 값 > 계좌의 초기 잔액 (1000원)

```jsx
const initialState = 0;
```
- **init**: 초기 상태를 동적으로 계산하는 함수 > 초기 계좌 잔액을 설정
```jsx
function init(initialAccount) {
  return { account: initialAccount };
}
```

예를 들었더니 어느정도 이해가 가는 것 같아요!

근데 dispatch랑 reducer는 뭘까요? 만들지 않았는데 인자로 받고있네요.
일단 reducer부터 알아봅시다.

reducer은 인자를 2개 받습니다. 
action과 state입니다. state는 위의 initialState에서 선언한 값이 들어갑니다.
그럼 action은 뭘까요?

#### action?
- 업데이트를 위한 정보를 가지고 있는 '객체' 즉 위에서 선언한 `dispatch`라고 생각하면 됩니다.
(그렇다면 action 객체는 어떻게 생겼을까요? 추후 아래에서 설명 우선 `reducer()` 설명부터!)
- **reducer**: `dispatch`를 확인해서 `state`를 변경해 주는 함수 > 은행 직원이 작업 명령서(dispatch)를 받아서 계좌 잔액을 업데이트함

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'DEPOSIT':
      return { ...state, account: state.account + action.amount };
    case 'WITHDRAW':
      return { ...state, account: state.account - action.amount };
    case 'RESET':
      return init(action.payload);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
```
이것이 적어놓은 명령서(reducer)이니 적어놓은 대로만 실행하면 된다!

이제 action 객체를 확인해봅시다!

--- 
### action
action객체 즉 dispatch는 위의 비유로 설명하자면
주문자가 전달할 '명령서'입니다.
 
이곳에는 reducer()에 적어놨던 type을(주문 명령어) 적는다. 
또한 reducer에서 필요할 데이터, 데이터 값도 같이 전달할 수 있다.
 
작성 시 무조건 따라야 하는 규칙은 아니지만 흔히 type 속 액션(값)은 대문자와 '_'로 구성합니다.

- **dispatch**: 상태(state)를 변경 시 필요한 정보를 전달하는 '함수' > 은행 직원에게 전달되는 작업 명령서. 예를 들어 정해져있는 입금, 출금 등의 명령을 전달합니다.

```jsx
dispatch({ type: 'DEPOSIT', amount: 1000 });
dispatch({ type: 'WITHDRAW', amount: 500 });
dispatch({ type: 'RESET' });
```


dispatch는 말했지만 state를 변경할 수 있는 "명령어"와 정보를 세팅하는 곳이라고 생각하면 됩니다. 보통 아래 2가지 형식으로 많이 사용합니다.

#### 1번째 방법
```jsx
const onDeposit = () => {
  dispatch({ type: 'DEPOSIT', amount: 1000 });
}

<button onClick={onDeposit}>입금 1000원</button>
```

#### 2번째 방법
```jsx
<button onClick={() => dispatch({ type: 'DEPOSIT', amount: 1000 })}>
입금 1000원 </button>
```

---

### 전체 코드 예시

```jsx
import React, { useReducer } from 'react';

// 초기 상태를 동적으로 계산하는 init 함수
function init(initialAccount) {
  return { account: initialAccount };
}

// 리듀서 함수
function reducer(state, action) {
  switch (action.type) {
    case 'DEPOSIT':
      return { ...state, account: state.account + action.amount };
    case 'WITHDRAW':
      return { ...state, account: state.account - action.amount };
    case 'RESET':
      return init(state.initialAccount);
    default:
      return state;
  }
}

// 컴포넌트
function BankAccount() {
  // 초기 잔액을 1000으로 설정하고, 리듀서 함수를 넣어줌
  const [state, dispatch] = useReducer(reducer, { account: initialAccount, initialAccount }, init);

  const deposit = () => {
    dispatch({ type: 'DEPOSIT', amount: 1000 });
  };

  const withdraw = () => {
    dispatch({ type: 'WITHDRAW', amount: 500 });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div>
      <h1>현재 잔액: {state.account}원</h1>
      <button onClick={deposit}>입금 1000원</button>
      <button onClick={withdraw}>출금 500원</button>
      <button onClick={reset}>잔액 초기화</button>
    </div>
  );
}

export default BankAccount;
```


#### 마무리
useReducer를 사용하여 복잡한 상태 관리를 구조적으로 처리하는 방법을 알아봤습니다.
이 글을 통해 `useState`와 `useReducer`를 각각 상황에 맞게 사용하는 데 도움이 됐으면 좋겠습니다.
또 useReducer는 Redux와 유사한 패턴을 사용하므로, Redux를 배우기 전에 상태 관리의 기본 개념을 익히는 데 도움이 됩니다.

꼭 이해하고 넘어갔으면 좋겠습니다!