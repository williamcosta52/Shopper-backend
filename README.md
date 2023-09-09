# Para rodar o projeto:

## Instale as depêndencias

```bash
$ npm install
```

## Adicione a variável de ambiente

Exemplo: DATABASE_URL="mysql://user:password@localhost:3306/mydb?schema=public"

## Crie o banco com o Prisma

```
$ npx prisma migrate dev
```

## Rode a aplicação

```
$ npm run start:dev
```
