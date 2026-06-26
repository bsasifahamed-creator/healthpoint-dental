# Security Rules

These rules apply to all code generated in this project. They are non-negotiable.

## Secrets

- NEVER put API keys, database credentials, or tokens in frontend code
- NEVER put secret keys in environment variables prefixed with NEXT_PUBLIC_, VITE_, or REACT_APP_
- NEVER hardcode credentials in source files. Use environment variables loaded server-side only
- The .env file MUST be in .gitignore before the first commit
- Use .env.example with placeholder values only, never real credentials

## Authentication and Authorization

- EVERY API route that returns or modifies user data MUST have authentication middleware that runs BEFORE the handler
- Unauthenticated requests to protected endpoints MUST return 401
- EVERY route that takes a resource ID MUST verify the authenticated user owns that resource
- Session cookies MUST set httpOnly: true, secure: true, and sameSite: 'lax'

## Input and Output

- NEVER use dangerouslySetInnerHTML, v-html, or innerHTML with user-supplied content unless sanitized with DOMPurify
- ALL user input MUST be validated server-side
- File uploads MUST validate file type by reading magic bytes, not extension. Rename to UUIDs. Store on separate domain.

## Security Headers

Set these on ALL responses:
- Strict-Transport-Security: max-age=31536000; includeSubDomains
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy
- Referrer-Policy: strict-origin-when-cross-origin

## CORS

- NEVER set CORS origin to `*` (wildcard). Use an explicit allowlist.
- NEVER combine origin: '*' with credentials: true

## Rate Limiting

- Login, registration, and password reset endpoints MUST have rate limiting

## Payments

- Stripe webhook endpoints MUST verify the signature on every request
- Webhook handlers MUST track processed event IDs and skip duplicates

## Error Handling

- NEVER expose stack traces, SQL errors, file paths, or library names in API responses
- Production error responses MUST return only generic messages

## Password Hashing

- ALWAYS use bcrypt, Argon2, or scrypt for password hashing
- NEVER use MD5, SHA-1, or plain SHA-256

## Dependencies

- Pin exact versions in package.json (no ^ or ~ in production)
- Commit lock files
- Run npm audit before deployment
