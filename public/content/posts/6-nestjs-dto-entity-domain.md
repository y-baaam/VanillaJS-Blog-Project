---
emoji: "🧱"
title: "NestJS DTO vs Entity vs Domain"
date: "2025-10-06"
categories: Backend
---

# NestJS에서 DTO, Entity, Domain의 차이

NestJS를 공부하다 보면 자주 듣는 단어가 있습니다.
바로 DTO, Entity, 그리고 Domain입니다.

이 세가지는 코드에서 전혀 다른 역할을 하지만, 처음엔 비슷하게 보이기 때문에 헷갈리기 쉽습니다.

이 글에서는 NestJS 기준으로 세 개념이 어떤 역할을 하는지, 어떻게 연결되는지 확인해봅니다.

## 1. DTO (Data Transfer Object)
> "요청(Request)과 응답(Response)을 위한 데이터 구조"

DTO는 말 그대로 데이터를 전달(Transfer)하기 위한 객체입니다.
Controller <-> Service 사이, 혹은 클라이언트 <-> 서버 간에 데이터의 형태를 명확하게 정의하기 위해 사용합니다.

보통 NestJS에서는 class-validator 와 함께 사용하여 입력값을 검증(validation)하는 역할도 맡습니다.


#### 예시 `CreatePostDto.ts`
```ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  authorId: number;
}
```

#### 특징
- 외부(클라이언트)에서 들어오는 데이터를 검증
- 비즈니스 로직, DB접근은 포함하지 않음
- API의 입력/출력 계약서 역할을 함

---

## 2. Entity(엔티티)
> "데이터베이스에서의 데이블 구조를 코드로 표현한 클래스"

Entity는 DB 테이블과 매핑되는 모델입니다.
NestJS에서는 보통 TypeORM이나 Prisma 같은 ORM에서 Entity를 기반으로 실제 테이블을 생성하고 데이터를 저장합니다.

#### 예시 `post.entity.ts`
```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column
  title: string;

  @Column
  content: string;

  @Column
  authorId: number;
}
```

#### 특징
- 실제 DB의 컬럼과 1:1 매칭
- Repository를 통해 DB에 저장/조회됨
- ORM이 자동으로 테이블을 생성하고 관리

> 즉, Entity는 **데이터베이스의 "실제 구조"** 를 코드로 표현한 것이라고 보면 됩니다.


## 3. Domain(도메인)
> "비즈니스 로직의 핵심을 표현하는 순수한 객체"

도메인은 앱이 해결하는 문제의 본질을 담고있습니다.
게시글, 유저, 주문 등

Entity가 단순히 데이터 구조라면, Domain은 그 **데이터가 어떻게 행동하는지**까지 정의합니다.

#### 예시: `post.domain.ts`
```ts
export class Post {
  constructor(
    public readonly id: number,
    public title: string,
    public content: string,
    public authorId: number
  ) {}

  updateContent(newContent: string) {
    if (newContent.length < 5) {
      throw new Error('5글자 이상이어야 합니다.')
    }
    this.content = newContent;
  }
}
```

#### 특징 
- 순수한 Typescript 코드(DB, HTTP 의존 없음)
- 실제 "비즈니스 규칙"이 들어감
- 서비스 로직에서 핵심 역할 수행

> 예를 들어, "5글자 이상이어야 한다"는 비즈니스 규칙은 DTO나 Entity가 아니라 Domain에 들어가야 합니다.

---

## DTO Entity Domain의 관계

### 데이터 흐름으로 이해하기
```css
[Client]
   ↓  (Request JSON)
[Controller]  →  DTO로 요청 데이터 검증
   ↓
[Service]     →  Domain 로직 처리
   ↓
[Repository]  →  Entity를 DB에 저장
   ↓
[Database]
```

#### 1. Controller
- 클라이언트의 요청을 받음
- `CreatePostDto` 로 데이터 검증
#### 2. Service
- DTO 데이터를 받아 `Post` 도메인 로직 수행
- (예: 제목,내용 규칙 검증, 비즈니스 연산 등)
#### 3. Repository
- 도메인을 `PostEntity`로 변환하여 DB에 저장
- `find`, `save`, `update` 등을 처리

---
#### 아래 예시는 “게시글(Post)”을 생성하고 저장하는 단순한 흐름을 예로 들었습니다.
#### 1. `CreatePostDto` - 요청을 받는 DTO
```ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;
}
```

- 클라이언트가 보낸 데이터를 검증하고
- Service로 안전하게 넘겨주는 역할을 합니다.

예를 들어, `POST / posts` 요청시 Body가 다음과 같다면
```json
{
  "title": "NestJS",
  "content": "DTO, Domain,Entity...",
  "authorId": 1
}
```
이 데이터가 먼저 `CreatePostDto`로 들어와 검증됩니다.
(필드 누락, 타입 불일치 시 자동으로 400 에러)

--- 

#### 2. `PostDomain` - 핵심 비즈니스 로직
```ts
export class PostDomain {
  constructor(
    public readonly title: string,
    public readonly content: string,
    public readonly authorId: number
  ) {}

  validate() {
    if (this.title.trim().length <= 3) {
      throw new Error('제목은 최소 3글자 이상이어야 합니다.');
    }
    if (this.content.trim().length <= 10) {
      throw new Error('내용은 최소 10글자 이상이어야 합니다.');
    }
  }

  updateContent(newContent: string) {
    if (newContent.trim().length <= 10 ){
      throw new Error('수정된 내용은 최소 10글자 이상이어야 합니다.');
    }
    this.content = newContent;
  }
}
```
역할:
- 앱의 핵심 규칙(비즈니스 로직) 을 담습니다.
- DB나 HTTP 같은 기술 요소에 의존하지 않고, 순수 로직만 처리합니다.

Service 계층은 CreatePostDto를 받아, 이를 PostDomain 객체로 변환하여 validate() 메서드로 검증을 수행합니다.

--- 

#### 3. `PostEntity` - 데이터베이스 테이블 매핑
```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  authorId: number;
}

```
역할:
- 실제 DB 테이블(`posts`)과 연결되는 ORM 모델입니다.
- Repository에서 DB에 데이터를 저장하거나 읽을 때 사용됩니다.

#### 4. `PostRepository` - DB 접근 계층
```ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './post/entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly repo: Repository<PostEntity>,
  ) {}

  async save(entity: PostEntity): Promise<PostEntity> {
    return await this.repo.save(entity);
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.repo.save(entity);
  }
}
```
역할:
- `Entity`를 기반으로 DB에 접근하는 부분을 담당.
- Service 계층은 Repository를 통해 DB를 다룸(직접 SQL을 쓰지 않음)

#### 파일 구조 예시
```pgsql
src/
 └─ posts/
     ├─ dto/
     │   └─ create-post.dto.ts
     ├─ domain/
     │   └─ post.domain.ts
     ├─ post.entity.ts
     ├─ post.repository.ts
     ├─ post.service.ts
     └─ post.controller.ts
```

## 결론

DTO, Domain, Entity는 NestJS 애플리케이션의 **세 가지 핵심 축**입니다.
||||
|---|---|---|
| **DTO** | 요청 데이터를 정의하고 검증 | Controller에서 사용 |
| **Domain** | 비즈니스 규칙과 행위를 정의 | Service에서 사용 |
| **Entity** | 데이터베이스 구조 매핑 | Repository에서 사용 |

- DTO는 외부와 주고받는 데이터의 "형태"를 정의
- Entity는 데이터베이스와 매핑되는 "저장 구조"
- Domain은 비즈니스 규칙과 행동을 담은 "핵심 로직"


NestJS는 구조가 명확한 프레임워크입니다.
DTO, Entity, Domain의 역할을 구분해두면
API가 커져도 유지보수가 쉽고, 버그가 줄어듭니다.