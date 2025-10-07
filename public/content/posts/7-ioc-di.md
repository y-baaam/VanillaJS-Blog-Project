---
emoji: "🦉"
title: "Express와 NestJS의 의존성 관리 차이까지 한눈에 이해하기"
date: "2025-10-07"
categories: Backend
---

## 1. IoC (Inversion of Control)란?

#### 개념
IoC (제어의 역전) 은 객체의 생성과 관리 책임을 개발자가 아닌 프레임워크(또는 컨테이너)가 맡는 설계 패턴입니다.
즉, 애플리케이션의 제어 흐름을 프레임워크가 관리하게 되어,
개발자가 직접 객체를 생성하고 연결하는 대신 프레임워크가 대신 관리합니다.

#### 목적

- 결합도 감소: 구성 요소 간 의존성을 줄여 유지보수성을 높임
- 유연성 향상: 구조가 느슨해져 확장성과 재사용성이 향상됨
- 테스트 용이성: 외부에서 의존성을 주입할 수 있어 Mocking 테스트가 쉬워짐

--- 

## 2. DI (Dependency Injection) 란?

#### 개념
DI (의존성 주입) 은 IoC를 구현하는 대표적인 방법입니다.
즉, 객체가 필요한 의존성을 스스로 생성하지 않고 외부에서 주입받는 방식입니다.


#### DI의 주요 유형
| 유형           | 설명                   |
| ------------ | -------------------- |
| **생성자 주입**   | 객체 생성 시점에 의존성을 주입    |
| **세터 주입**    | 세터 메서드를 통해 의존성 주입    |
| **인터페이스 주입** | 인터페이스 메서드를 통해 의존성 전달 |

---

## 3. Express vs NestJS — IoC와 DI의 차이
### Express

#### IoC/DI 미지원
Express는 IoC와 DI를 기본적으로 제공하지 않습니다.
즉, 개발자가 직접 객체를 생성하고 연결해야 하며, 테스트 시에도 의존성을 수동으로 교체해야 합니다.

```ts
const express = require('express');
const app = express();

class UserService {
  getUser() {
    return { name: 'Alice', age: 25 };
  }
}

const userService = new UserService();

app.get('/user', (req, res) => {
  res.json(userService.getUser());
});

app.listen(3000);
```
#### 문제점: 
- 객체 생성 및 관리 책임이 모두 개발자에게 있음
- 테스트할 때 의존성을 교체하거나 Mocking하기 어려움

### NestJS
#### IoC/DI 지원
NestJS는 프레임워크 수준에서 IoC 컨테이너와 DI 시스템을 내장하고 있습니다.
`@Injectable()` 데코레이터를 통해 의존성을 선언하고, 프레임워크가 자동으로 객체를 주입합니다.

```ts
import { Injectable, Controller, Get } from '@nestjs/common';

@Injectable()
class UserService {
  getUser() {
    return { name: 'Alice', age: 25 };
  }
}

@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
```

#### 장점:
- 자동 의존성 주입: NestJS가 `UserService`를 `UserController`에 자동 연결
- 결합도 감소: 코드 간 연결 관계가 느슨해져 유지보수가 쉬움
- 테스트 용이성: 서비스나 모듈을 쉽게 Mocking 가능

---

## 4. IoC와 DI가 가져오는 이점
| 구분          | Express            | NestJS             |
| ----------- | ------------------ | ------------------ |
| **결합도**     | 직접 객체를 생성해야 하므로 높음 | 프레임워크가 관리하므로 낮음    |
| **유연성**     | 의존성 교체 시 코드 수정 필요  | 설정만 변경하면 의존성 교체 가능 |
| **테스트 용이성** | 수동 Mocking 필요      | 자동 주입 구조로 테스트 용이   |

---

## 5. 핵심 요약
| 개념               | 설명                       | NestJS에서의 역할                   |
| ---------------- | ------------------------ | ------------------------------ |
| **IoC (제어의 역전)** | 객체의 생성과 관리 책임을 프레임워크가 담당 | 애플리케이션의 전반적인 흐름 제어             |
| **DI (의존성 주입)**  | 객체의 의존성을 외부에서 주입         | `@Injectable()`과 생성자 주입을 통해 구현 |
| **Express**      | 개발자가 직접 의존성을 생성 및 관리     | IoC/DI 구조 없음                   |
| **NestJS**       | 프레임워크가 자동으로 의존성을 관리      | IoC 컨테이너 내에서 DI 자동 처리          |

---

## 6. 결론
NestJS의 IoC와 DI는 단순한 기술 요소가 아니라, **유지보수성과 확장성을 극대화하는 핵심 설계 철학입니다.**

Express가 빠른 프로토타이핑에 강점이 있다면, NestJS는 대규모 애플리케이션을 위한 구조적 안정성을 제공합니다.

