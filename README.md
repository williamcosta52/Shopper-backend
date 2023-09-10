# In this project, you can update the information of one or more products, but in order to do so, you must comply with some business rules, such as:

<div>
<p>
  1. The new product value cannot be lower than its manufacturing cost.
</p>
<p>
  2. The discount value should not exceed 10%, either more or less.
</p>
<p>
  3. The product should only be updated if the frontend sends "true" in the request.
</p>
</div>

## Used in this project:
<div>
  <img src="https://img.shields.io/badge/node js%20-%2320232a.svg?&style=for-the-badge&color=339933&logo=node.js&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript%20-%2320232a.svg?&style=for-the-badge&color=3178C6&logo=TypeScript&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/Prisma%20-%2320232a.svg?&style=for-the-badge&color=4C51BF&logo=Prisma&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/jest%20-%2320232a.svg?&style=for-the-badge&color=C21325&logo=jest&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
</div>

## Install Dependencies

```bash
$ npm install
```

## Add a environment variable

#### Exemple: DATABASE_URL="mysql://user:password@localhost:3306/mydb?schema=public"

## Create database with Prisma

```
$ npx prisma migrate dev
```

## Run the application

```
$ npm run start:dev
```

## To run e2e tests

### Create a test environment:

#### Exemple: .env.test

#### Exemple URL: DATABASE_URL="mysql://user:password@localhost:3306/mydb_test?schema=public"

## Run the test

```
  $ npm run test:e2e
```
