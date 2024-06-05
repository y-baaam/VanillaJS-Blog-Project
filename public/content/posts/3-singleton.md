---
emoji: "☀️"
title: "Singleton Pattern 이해하기"
date: "2024-06-05"
categories: Design-Pattern
---

# Singleton Pattern
싱글톤 패턴은 디자인 패턴들 중 이해하기 쉬운 패턴 중 하나입니다.

하지만 이 패턴에 깊은 이해 없이 코드 예시만 제시하고 넘어가는 경우가 많습니다.
싱글톤 패턴이 어떤 상황에서 사용되며, 어떤 잠재적 문제를 가지고 있는지에 대한 충분한 설명이 이루어지지 않는 경우가 많습니다.

싱글톤 패턴의 기본적인 구조부터 시작하여, 이 패턴이 어떤 상황에 적합한지, 그리고 사용 시 고려해야 할 잠재적인 문제점들에 대해 탐구해 보겠습니다.

## 싱글톤 패턴?
![](/content/posts/3/1.png)

싱글톤 패턴은 <U>단 하나의 유일한 객체를 생성하여</U>, 메모리를 효율적으로 관리하기 위한 디자인 패턴입니다. 

간단히 말해, 이 패턴은 필요할 때마다 동일한 인스턴스를 반복적으로 생성하는 대신, 이미 생성된 인스턴스를 재사용함으로써 리소스 사용을 최적화합니다.

예를 들어, 우리는 데이터를 여러 메서드에서 반복적으로 사용해야 할 때 전역 변수를 사용합니다. 이는 각 메서드마다 동일한 데이터를 지역 변수로 선언하고 사용하는 것이 비효율적이며 자원 낭비가 될 수 있기 때문입니다.

이러한 전역 변수 사용의 개념을 클래스에 적용한 것이 싱글톤 패턴이라고 이해하면 됩니다.

싱글톤 패턴을 적용하는 가장 적합한 상황은 해당 객체가 많은 리소스를 요구하고, 전체 애플리케이션에서 단 하나의 인스턴스만 필요로 하는 **무거운** 클래스의 경우에 적합합니다.

싱글톤 패턴은 특히 데이터베이스 연결과 같은 리소스를 많이 소모하는 작업에 이상적입니다. 데이터베이스 접속은 I/O 바운드 작업이며, 이는 자체로 무거운 작업에 속합니다. 또한, 애플리케이션 내에서 단 한 번만 객체를 생성하여 재사용하는 것이 효율적이므로, 여러 번 객체를 생성할 필요가 없습니다.

데이터베이스 연결 모듈 뿐만 아니라 디스크 연결, 네트워크 통신, DBCP(Database Connection Pool) 커넥션풀, 스레드풀, 캐시, 로깅 객체 등 다양한 시나리오에서 유용하게 사용됩니다. 

이런 객체들은 대체로 애플리케이션 전역에서 하나만 존재해도 충분하며, 오히려 새로운 인스턴스를 반복적으로 생성하는 것은 리소스의 낭비일 뿐입니다.

## 싱글톤 패턴의 구조

싱글톤 패턴은 다음과 같은 주요 구성 요소로 이루어져 있습니다.

1. Private 생성자: 클래스의 외부에서 인스턴스를 직접 생성할 수 없도록 생성자를 비공개로 설정
2. Private 정적 인스턴스 변수: 클래스 내부에 유일한 인스턴스를 저장할 private 정적 변수를 선언
3. Public 정적 메서드: 외부에서 유일한 인스턴스에 접근할 수 있도록 public 정적 메서드를 제공

## 싱글톤 패턴의 구현 방법
### 1. 클래스 정의
```jsx
class Singleton {
  constructor() {
    // 생성자를 private 으로 설정
  }
}
```
### 2. 정적 인스턴스 변수 선언
```jsx
class Singleton {
  constructor() {
    // 생성자를 private 으로 설정
  }
  
  static instance;
}
```

### 3. 인스턴스 반환 메서드 구현
```jsx
class Singleton {
    constructor() {
        // 생성자를 private으로 설정
    }

    static instance;

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

### 4. 사용 예시
싱글톤 인스턴스에 접근하기 위해 getInstance 메서드를 사용합니다. 이 방법을 통해 어디서든지 동일한 인스턴스에 접근할 수 있습니다.

```jsx
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

## 싱글톤 IIFE 활용
[IIFE](https://www.y-baam.net/posts/2-IIFE)는 싱글톤 객체를 즉시 생성하고 초기화할 수 있으며, 이 객체는 외부 스코프와 격리되어 있어서 전역 스코프를 오염시키지 않습니다. 또한, IIFE 내부에서만 접근 가능한 비공개 변수와 함수를 활용하여 싱글톤 인스턴스의 상태와 로직을 캡슐화할 수 있다는 이점이 있습니다.

아래에서는 IIFE 방식으로 데이터베이스 연결 모듈을 싱글톤 구현 방법을 살펴보겠습니다.

```jsx
const DatabaseConnection = (function() {
    let instance;

    function createInstance() {
        // 데이터베이스 연결 설정을 여기서 합니다.
        const object = new Object("I am the instance of the database connection");
        return object;
    }

    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// 사용 예시
const instance1 = DatabaseConnection.getInstance();
const instance2 = DatabaseConnection.getInstance();

console.log(instance1 === instance2);  // true, 두 인스턴스는 동일합니다.
```

이렇게 DatabaseConnection의 인스턴스는 프로그램 전체에서 하나만 존재하게 되며 리소스 사용을 최적화 할 수 있습니다.

또 다른 UI적인 예시를 들어보자면 로딩 스피너를 관리하는 경우도 있습니다.
데이터를 요청하는 동안 사용자에게 로딩 중임을 알리는 인스턴스를 생성하고 관리합니다.
![](/content/posts/3/2.png)

```jsx
const LoadingSpinnerSingleton = (function() {
  let instance;
  
  function createInstance() {
	const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    document.body.appendChild(spinner);
    
    // 스피너를 보여주는 함수
    function show() {
      spinner.style.display = "block"
    }
    
    // 스피너를 숨기는 함수
    function hide() {
      spinner.style.display = "none";
    }
    
    return {
      show,
      hide
    };
  }
  
  return {
    getInstance: function() {
      if(!instance) {
        instance = createInstance();
      }
      return instance;
    }
  }
})();
// 로딩 스피너 사용 예시
const spinner1 = LoadingSpinnerSingleton.getInstance();
spinner1.show(); // 데이터 로딩 시작

// 다른 곳에서 로딩 스피너를 필요로 할 때
const spinner2 = LoadingSpinnerSingleton.getInstance();
// spinner1과 spinner2는 같은 인스턴스입니다.
// 데이터 로딩이 완료되면, 스피너를 숨깁니다.
spinner2.hide();  
```

이렇게 사용함으로써, 애플리케이션의 어느 부분에서든지 같은 로딩 스피너 인스턴스에 접근할 수 있게 됐습니다.

리소스의 낭비를 방지하고, UI의 일관성을 보장하는 데 도움이 됩니다.


## Tradeoffs

그런데 인스턴스화를 단 하나의 인스턴스로 제한하는 것은 잠재적으로 많은 메모리 공간을 절약할 수 있습니다. 매번 새 인스턴스를 위한 메모리를 설정하는 대신, 애플리케이션 전체에서 참조되는 그 하나의 인스턴스를 위한 메모리만 설정하면 됩니다. 그러나 싱글턴은 실제로 안티 패턴으로 간주되며, 자바스크립트에서는 (또는.. 해야만 한다면) 피해야 합니다.

Java나 C++과 같은 많은 프로그래밍 언어에서는 자바스크립트에서 할 수 있는 것처럼 직접 객체를 생성할 수 없습니다. 이러한 객체 지향 프로그래밍 언어에서는 객체를 생성하는 클래스를 만들어야 합니다. 생성된 객체는 클래스의 인스턴스 값과 마찬가지로 값을 가집니다.

자바스크립트에서는 직접 객체를 생성할 수 있기 때문에, 단순한 객체를 사용하여 정확히 동일한 결과를 달성할 수 있습니다. 싱글턴을 사용하는 것의 몇 가지 단점을 살펴보겠습니다!

## 단점
![](/content/posts/3/3.png)

### 의존성 숨김
다른 모듈을 가져올 때, 그 모듈이 싱글턴을 가져오고 있다는 것이 명확하지 않을 수 있습니다. 예를 들어, 우리가 그 모듈의 메소드를 호출하는 다른 파일에서 해당 모듈을 가져올 수 있습니다. 이렇게 하면 우리는 실수로 싱글턴의 값을 수정하게 됩니다. 이는 응용 프로그램 전체에 걸쳐 공유될 수 있는 싱글턴의 여러 인스턴스가 모두 수정될 수 있으므로 예상치 못한 동작을 초래할 수 있습니다.

### Testing
싱글톤에 의존하는 코드를 테스트하는 것은 까다로울 수 있습니다. 매번 새로운 인스턴스를 생성할 수 없기 때문에, 모든 테스트는 이전 테스트의 전역 인스턴스 변경에 의존하게 됩니다. 이 경우 테스트의 순서가 중요하며, 작은 수정 하나로 전체 테스트 스위트가 실패할 수 있습니다.
테스트 후에는 테스트에 의해 이루어진 변경사항을 초기화하기 위해 전체 인스턴스를 리셋해야 합니다.


### 전역 동작
싱글턴 패턴은 애플리케이션 전체에 걸쳐 전역 상태를 제공하는 것을 목표로 합니다. 이는 전역 변수가 하는 일과 유사하지만, 전역 변수 사용은 코드의 예상치 못한 동작을 초래하고 전역 스코프를 오염시킬 수 있는 나쁜 설계로 간주됩니다.

ES2015의 등장으로, let과 const 키워드는 변수들이 블록 스코프를 갖도록 하여 실수로 전역 스코프를 오염시키는 것을 방지합니다. 자바스크립트의 모듈 시스템은 전역 스코프 없이도 전역적으로 접근 가능한 값을 생성할 수 있게 해 줍니다.

그러나 싱글턴은 여전히 전역 상태 관리를 위해 사용되며, 잘못된 사용은 코드의 다른 부분에서 예상치 못한 동작을 일으킬 수 있습니다. 특히, 애플리케이션이 성장하고 컴포넌트 간 의존성이 증가함에 따라, 전역 상태의 데이터 흐름을 추적하는 것이 더 복잡해질 수 있습니다.


## 결론...

싱글톤 패턴은 특정 상황에서 유용할 수 있으나 신중하게 고려되어야 합니다.

전역 상태 관리와 같은 싱글톤의 장점은 명확하지만, 이로 인해 발생할 수 있는 테스팅의 어려움, 의존성 숨김, 예상치 못한 전역 동작과 같은 단점도 중요합니다.

