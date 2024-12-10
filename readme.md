# Project Name

A web application built with Deno, Hono, and PocketBase.

## Prerequisites

- [Deno](https://deno.com/) installed on your system
- A PocketBase instance.

## Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
PB_API_URL="your-pocketbase-url"
PB_API_ADMIN_USER="your-admin-email"
PB_API_ADMIN_PASSWORD="your-admin-password"
```

## Available Scripts

The project includes the following Deno scripts:

- `deno task dev` - Runs the application in development mode with file watching enabled
- `deno task serve` - Serves the application in production mode

## Dependencies

This project uses:
- [@enhance/ssr](https://jsr.io/@enhance/ssr) - Server-side rendering
- [@hono/hono](https://jsr.io/@hono/hono) - Web framework
- [pocketbase](https://www.npmjs.com/package/pocketbase) - Backend and database