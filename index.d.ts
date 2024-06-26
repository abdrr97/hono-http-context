import { Namespace } from 'cls-hooked'
import { Context } from 'hono'

/** Hono.js middleware that is responsible for initializing the context for each request. */
export declare function middleware(_c: Context, next: () => Promise<void>): Promise<void>

/**
 * Gets a value from the context by key.  Will return undefined if the context has not yet been initialized for this request or if a value is not found for the specified key.
 */
export declare function get<T = any>(key: string): T | undefined

/**
 * Adds a value to the context by key.  If the key already exists, its value will be overwritten.  No value will persist if the context has not yet been initialized.
 */
export declare function set<T = any>(key: string, value: T): void

/**
 * Gets the underlying continuation namespace.
 */
export declare const ns: Namespace
