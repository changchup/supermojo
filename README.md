# Supermojo Interview

## Requirements

- Docker
- NodeJS (>=16)

## Instructions

Today we're going to build a URL shortener.

First, read through the [requirements](#general-requirements). Then, check out Part 1.

### General Requirements

**Technical Requirements**

- Shortened URL slugs are randomly generated
- Shortened URLs are persisted
- Shortened URL slugs should be a minimum of 4 characters
- It should be fast
- It should be possible to host this on any domain (e.g., links.supermojo.com/<SLUG>, )

**Code Requirements**

- Pay attention to code quality.
- For take-home submission, please use `git` and stick to the strategy of atomic commits

#### API Interface

The backend should expose two routes:

1. Create a short URL

```
PUT /url
{"url": "https://www.google.com/"}

200 {"slug": "as983Hn"}
```

2. Navigate to the short-url

```
GET /as983Hn

302 https://www.google.com/
```

### Part 1: API

#### First Start

1. Install deps: `yarn`
2. Copy .env.example file `cp .env.example .env`
3. Start the databases `yarn docker`
4. Run database migrations `yarn prisma migrate dev`
5. Run the compiler in watch mode `yarn build-watch`
6. Run tests `yarn test`

Now you should be able to start writing and editing, while the Typescript compiler runs in watch mode. Keep an eye on the output for errors.

#### How to start

- Start the API server with `yarn dev`
- Test that it works `curl localhost:9000/hello`

- We're using an Express API server.
  - The routes are defined in [routes.ts](src/routes.ts)
  - The database client is in [db.ts](src/db.ts)
    - It already has two helper functions to create and get URLs
    - You shouldn't need to make any changes here
- There is a Redis client (if you need or want to use a server-side cache) in [cache.ts](src/cache.ts)
- There is a single test file, [app.test.ts](src/app.test.ts)
  - We're using [jest](https://jestjs.io/) for testing
  - You can run tests with `yarn test` (make sure to run the through the [first start](#first-start) instructions first

### Part 2: Front-End

- Build a simple front-end that allows a user to generate a short URL from any URL they enter.
- Use the language and framework of your choice (e.g., vanilla JS, React).
- Please provide instructions for running the front-end

### For Discussion

If you have time, please run through these questions for discussion.
They don't necessarily need to be implemented (though if you really want to, and have time, go for it).

- How might you track link opens?
- We will likely be used by spammers. How might you prevent the use of our link shortener for spam?
- How might you create authenticated or password-protected links?

## Submission

## Notes

- If you want to modify the database schema,

  - Edit [schema.prisma](prisma/schema.prisma)
  - Then, generate a new migration, `yarn prisma migrate dev --name <name-of-your-migration>`
    - This will also apply the migration
  - [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
  - [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

- To inspect the database:
  - With a UI, `yarn prisma studio`
  - postgres cli, `yarn pg-cli`
