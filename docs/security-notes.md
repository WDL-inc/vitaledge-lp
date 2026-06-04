# Security Notes

## Current status

- `npm audit --omit=dev` reports 2 moderate findings through Next.js' bundled `postcss`.
- `npm audit fix --force` currently proposes a downgrade to `next@9.3.3`, which is not acceptable for this App Router project.
- Keep Next.js on the newest compatible 16.x release and re-run `npm audit --omit=dev` before deployment.

## Preview authentication

`src/proxy.ts` supports Basic authentication only when both environment variables are set:

- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASSWORD`

Do not commit real credentials. Configure them in the deployment platform, for example Vercel Project Settings > Environment Variables.

## Deployment checklist

- Confirm `npm run build` passes.
- Confirm `npm audit --omit=dev` has no high or critical findings.
- Confirm preview credentials are set outside source control if the preview site should be private.
- Confirm `/terms` and `/privacy` have been reviewed by counsel before public launch.
