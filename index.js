'use strict'
const cls = require('cls-hooked')

const nsid = 'YFK8UoQQUuld1JS9No9Eykgd6Cg6FNQ2+Dai3WXPQgk='
const ns = cls.createNamespace(nsid)

/**
 * Hono middleware that is responsible for initializing the context for each request.
 */
const middleware = async (c, next) => {
  await ns.runPromise(async () => {
    await next()
  })
}

/**
 * Gets a value from the context by key.
 * Will return undefined if the context has not yet been initialized for this request
 * or if a value is not found for the specified key.
 * @param {string} key
 */
function get(key) {
  if (ns && ns.active) {
    return ns.get(key)
  }
}

/**
 * Adds a value to the context by key.
 * If the key already exists, its value will be overwritten.
 * No value will persist if the context has not yet been initialized.
 * @param {string} key
 * @param {*} value
 */
function set(key, value) {
  if (ns && ns.active) {
    ns.set(key, value)
  }
}

module.exports = {
  middleware,
  get,
  set,
  ns,
}
