---
emoji: "🎄"
title: "NestJS의 IoC 컨테이너 구조 — Provider, Module, Scope"
date: "2025-10-08"
categories: Backend
---

NestJS는 단순한 서버 프레임워크가 아닙니다.
그 핵심에는 IoC (Inversion of Control) 원칙이 있고,
이 원칙을 바탕으로 한 의존성 주입(Dependency Injection, DI) 시스템이
애플리케이션의 모든 구성 요소를 자동으로 관리합니다.

“NestJS의 IoC 컨테이너가 내부적으로 어떻게 작동하는가”를
Provider, Module, Scope 중심으로 단계별로 정리해보겠습니다.

--- 

## 1. Provider - 의존성의 핵심 단위
NestJS에서 Provider는 DI 시스템의 가장 작은 단위입니다.
`@Injectable()` 데코레이터가 붙은 클래스는 모두 Provider로 등록됩니다.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUser() {
    return { name: 'Alice', age: 25 }
  }
}
```

이 `UserService`는 IoC 컨테이너가 관리하는 의존성 객체로 등록됩니다.

다른 클래스에서 의존성을 선언하면 NestJS가 자동으로 주입합니다.

```ts
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
```
#### 요약
- `@Injectable()`이 붙은 클래스 = Provider
- IoC 컨테이너가 인스턴스를 생성하고 관리
- Controller, Service, Repository 모두 Provider로 동작 가능


---

## 2. Module - Provider를 묶는 단위
NestJS는 모든 코드를 **모듈(Module)** 단위로 관리합니다.

모듈근 Provider들을 그룹화하고, 각 기능을 독립적으로 관리할 수 있도록 돕는 **IoC 컨테이너의 하위 스코프 역할**을 합니다.

```ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```
여기서 `UserModule`은
- `UserService`를 Provider로 등록하고,
- `UserController`에서 의존성을 주입받을 수 있도록 연결합니다.

모듈은 또 다른 모듈로 불러와 연결할 수도 있습니다.
```ts
@Module({
  imports: [UserModule],
})
export class AppModule {}
```

#### 요약
- `@Module()`은 Provider의 집합을 정의
- 각 모듈은 독립적인 IoC 스코프를 가짐
- 모듈 간 의존성은 `imports` / `exports` 로 제어

--- 

## 3. Scope - Provider의 생명주기 관리
IoC 컨테이너는 Provider의 **Scope(생명주기)** 를 관리합니다.
즉, "언제 생성되고 언제 사라지는가"를 결정합니다.

NestJS의 Scope는 세 가지 입니다.


| Scope               | 설명                        | 사용 예시           |
| ------------------- | ------------------------- | --------------- |
| **Singleton (기본값)** | 앱 시작 시 한 번만 생성되어 재사용      | 대부분의 서비스        |
| **Request**         | 요청(Request)마다 새로운 인스턴스 생성 | 요청별 데이터 유지 필요 시 |
| **Transient**       | 주입될 때마다 새로운 인스턴스 생성       | 독립적 인스턴스가 필요할 때 |

예를 들어, 요청마다 새로운 인스턴스가 필요하다면 이렇게 지정할 수 있습니다.
```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestScopedService {
  constructor() {
    console.log('요청마다 새로운 인스턴스 생성');
  }
}
```

#### 요약
- `Singleton`: 앱 전역에서 하나만 존재
- `Request`: 요청마다 새로운 인스턴스 생성
- `Transient`: 매번 새로운 인스턴스 생성

## 4. IoC 컨테이너의 동작 순서
NestJS 애플리케이션이 실행될 때,
IoC컨테이너는 다음 순서로 동작합니다.


1. AppModule을 로드한다.
2. 각 Module의 provider[]를 스캔한다.
3. @Injectable()이 붙은 클래스를 Provider로 등록한다.
4. Provider간 의존성 관계를 분석하여 의존성 트리를 생성한다.
5. Controller에서 필요한 Provider를 찾아 자동으로 주입한다.

```less
[AppModule]
   ├─ [UserModule]
   │     ├─ UserController
   │     └─ UserService (@Injectable)
   ├─ [AuthModule]
   │     ├─ AuthController
   │     └─ AuthService (@Injectable)
   └─ [DatabaseModule]
         └─ DatabaseService (@Injectable)
```

## 5. 정리 — NestJS IoC 컨테이너 구성요소
| 개념           | 역할                | 핵심 포인트                          |
| ------------ | ----------------- | ------------------------------- |
| **Provider** | 의존성의 기본 단위        | `@Injectable()`로 등록             |
| **Module**   | Provider를 그룹화     | `controllers`, `providers`로 구성  |
| **Scope**    | Provider의 생명주기 관리 | Singleton / Request / Transient |
| **IoC 컨테이너** | Provider를 관리하고 주입 | 애플리케이션의 제어 중심                   |

## 마무리

NestJS의 IoC 컨테이너는 단순히 객체를 주입하는 기능이 아닙니다.
애플리케이션의 구조, 생명주기, 의존성 관리 전반을 담당하는 아키텍처의 핵심입니다.

- IoC는 “누가 제어하는가”를 바꾼다.
- DI는 “어떻게 연결되는가”를 정의한다.
- Container는 “언제, 어디서, 무엇을 생성할지”를 관리한다.
