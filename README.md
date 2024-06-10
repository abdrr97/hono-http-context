[![coveralls](https://img.shields.io/coveralls/skonves/hono-http-context.svg)](https://coveralls.io/github/skonves/hono-http-context)
[![npm](https://img.shields.io/npm/v/hono-http-context.svg)](https://www.npmjs.com/package/hono-http-context)
[![npm](https://img.shields.io/npm/dm/hono-http-context.svg)](https://www.npmjs.com/package/hono-http-context)
[![david](https://img.shields.io/david/skonves/hono-http-context.svg)](https://david-dm.org/skonves/hono-http-context)

# Hono HTTP Context

Get and set request-scoped context anywhere. This is just an unopinionated, idiomatic HonoJS implementation of [cls-hooked](https://github.com/Jeff-Lewis/cls-hooked) (forked from [continuation-local-storage](https://www.npmjs.com/package/continuation-local-storage)). It's a great place to store user state, claims from a JWT, request/correlation IDs, and any other request-scoped data. Context is preserved even over async/await (in node 8+).

Please checkout the express version : [express-http-context](https://github.com/skonves/express-http-contexts)

## How to use it

Install: `npm install --save hono-http-context`

Use the middleware immediately before the first middleware that needs to have access to the context.
You won't have access to the context in any middleware "used" before this one.

Note that some popular middlewares (such as body-parser, hono-jwt) may cause context to get lost.
To workaround such issues, you are advised to use any third party middleware that does NOT need the context
BEFORE you use this middleware.

```ts
import hono from 'hono'
import httpContext from 'hono-http-context'

const app = hono()
// Use any third party middleware that does not need access to the context here, e.g.
// app.use(some3rdParty.middleware);
app.use(httpContext.middleware)
// all code from here on has access to the same context for each request
```

Set values based on the incoming request:

```ts
// Example authorization middleware
app.use(async (c, next) => {
  var token = c.req.header('Authorization')
  if (token) {
    httpContext.set('user', { id: '123' })
  }
  await next()
})
```

Get them from code that doesn't have access to the hono `req` object:

```ts
import httpContext from 'hono-http-context'

// Somewhere deep in the Todo Service
function createTodoItem(title, content, callback) {
  var user = httpContext.get('user')
  db.insert({ title, content, userId: user.id }, callback)
}
```

You can access cls namespace directly as (it may be useful if you want to apply some patch to it ):

```js
import { ns } from 'hono-http-context'
```

## Troubleshooting

To avoid weird behavior with hono:

1. Make sure you require `hono-http-context` in the first row of your app. Some popular packages use async which breaks CLS.
