import { Namespace, createNamespace } from 'cls-hooked'
import { Context } from 'hono'

const nsid = 'YFK8UoQQUuld1JS9No9Eykgd6Cg6FNQ2+Dai3WXPQgk='
export const ns: Namespace = createNamespace(nsid)

/**
 * Hono middleware that is responsible for initializing the context for each request.
 */
export const middleware = async (_c: Context, next: () => Promise<void>): Promise<void> => {
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
export function get<T = any>(key: string): T | undefined {
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
export function set<T = any>(key: string, value: T): void {
  if (ns && ns.active) {
    ns.set(key, value)
  }
}
