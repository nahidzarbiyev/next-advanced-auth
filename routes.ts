/**
 * an array of routes that are accesible to the public
 * These routes do not require authentication
 * @type{String[]}
 */

export const publicRoutes = ["/", "/auth/new-verification"];
/**
 * an array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type{String[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];
/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type{String[]}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type{String[]}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
