---
emoji: "👻"
title: "IIFE - 즉시 실행 함수"
date: "2024-06-03"
categories: JavaScript
---

# 즉시 실행 함수(IIFE,Immediately Invoked Function Expression)

즉시 실행 함수 표현식은 정의되자마자 즉시 실행되는 JavaScript 함수를 말합니다.

IIFE는 주로 변수의 스코프를 제한하여 전역 공간의 오염을 방지하는 데 사용됩니다.

```jsx
(function() {
    // 코드
})();
```

화살표 함수의 경우
```jsx
(() => {
    // 코드
})();
```

> **즉시 실행 함수는 익명 함수를 사용해야 할까요? 기명 함수를 사용해야 할까요?**

**즉시 실행 함수(IIFE)는 선언과 동시에 실행되며 반환된 후에는 재사용되지 않기 때문에, 일반적으로는 익명 함수 형태로 사용됩니다. 그러나 디버깅을 용이하게 하거나 함수 내부에서 자기 자신을 참조해야 하는 특별한 경우에는 이름을 붙여 기명 함수로 사용할 수도 있습니다.
**

그래서, 즉시 실행 함수에 기명,익명 함수를 사용하는 것은 개발자들 사이에서도 의견이 갈립니다.

## 즉시 실행 함수는 왜 사용할까?

### 1. 전역 스코프의 오염 방지
함수를 생성하면 그 함수는 전역 변수로써 남아있게 되고, 많은 변수의 생성은 전역 스코프를 오염시킬 수 있습니다.

즉시 실행 함수를 선언하면 내부 변수가 전역으로 저장되지 않기 때문에 전역 스코프의 오염을 줄일 수 있습니다.

### 2. private한 변수를 만들 수 있다.

즉시 실행 함수는 외부에서 접근 할 수 없는 자체적인 스코프를 가지게 됩니다. 이는 클로저의 사용 목적과도 비슷하며 내부 변수를 외부로부터 private하게 보호 할 수 있다는 장점이 있습니다.

## 즉시 실행 함수를 어떻게 활용할까?

### 초기화
즉시 실행 함수는 한 번의 실행만 필요로 하는 초기화 코드 부분에 많이 사용됩니다.
변수를 전역(global scope)으로 선언하는 것을 피하기 위해서입니다.

```jsx
let isAdult;

(function init(age) {
    let currentAge = age;
    if (age >= 20) {
        isAdult = true;
    } else {
        isAdult = false;
    }
})(20);

console.log(isAdult); //  true
console.log(currentAge); //  Uncaught ReferenceError: currentAge is not defined
```

### 자바스크립트 모듈 생성

IIFE를 사용하여 자바스크립트 모듈, Counter 싱글톤 객체를 구현해보며 알아봅니다.

```jsx
const Counter = (function counterIIFE() {
    // 현재 counter 값을 저장하기 위한 변수
    let current = 0;

    return {
        // 즉시실행함수로써 반환되는 객체
    };
})();
```

1. 먼저 객체를 반환하는 형태의 즉시 실행 함수인 counterIIFE를 만든다.
2. 즉시 실행 함수 내부에는 현재 counter 값을 저장하기 위한 current라는 변수를 만든다.
3. 즉시 실행 함수의 반환 객체는 Counter라는 변수에 할당됩니다.

```jsx
const Counter = (function counterIIFE() {
    // 현재 counter 값을 저장하기 위한 변수
    let current = 0;

    return {
        getCurrentValue: function () {
            return current;
        },

        increaseValue: function () {
            current = current + 1;
            return current;
        },

        decreaseValue: function () {
            current = current - 1;
            return current;
        },
    };
})();

console.log(Counter.getCurrentValue()); // 0
console.log(Counter.increaseValue()); // 1
console.log(Counter.decreaseValue()); // 0
```

1. 즉시실행함수의 반환 객체에 현재 current 값을 출력하는 getCurrentValue 함수, 현재 current 값에 1을 더하는 increaseValue 함수 그리고 현재 current 값에 1을 빼는 decreaseValue 함수를 정의했습니다.
2. 전역에서 반환 객체의 함수를 통해 current 값을 얻거나 수정 할 수 있습니다.

위의 예제에서 current 변수는 private 하기 때문에 클로저를 통한 접근 외에는 접근 및 수정이 불가능합니다.


### 라이브러리 전역 변수의 충돌

jQuery나 Prototype 라이브러리는 동일한 $라는 전역 변수를 사용합니다. 만약, 이 두개의 라이브러리를 같이 사용한다면 $ 변수 충돌이 생기게 됩니다.즉시 실행 함수를 사용하여 $ 전역 변수의 충돌을 피할 수 있습니다.
```jsx
(function ($) {
    // $ 는 jQuery object
})(jQuery);
```

즉시 실행 함수 안에서 $는 전역변수가 아닌 jQuery object의 지역 변수가 되어, Prototype 라이브러리의 $와 충돌 없이 사용할 수 있습니다.
