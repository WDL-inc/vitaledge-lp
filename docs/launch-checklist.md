# Vitaledge LP Launch Checklist

## 1. Source Repository

Target repository:

```text
https://github.com/WDL-inc/vitaledge-lp
```

Recommended policy:

- Use the `WDL-inc` organization as the long-term owner.
- Keep `main` as the production branch.
- Protect `main` after the first deploy.
- Use pull requests for future designer and developer changes.
- Keep secrets in GitHub or Vercel settings, not in source files.

## 2. Local Verification

Run before pushing a release candidate:

```bash
npm ci
npm run build
npm audit --omit=dev
```

Current note:

- `npm run build` passes.
- `npm audit --omit=dev` reports 2 moderate findings through Next.js' bundled `postcss`.
- Do not run `npm audit fix --force` blindly because it currently proposes a breaking downgrade.

## 3. Required Public Pages

Confirm these routes render correctly:

- `/`
- `/cases`
- `/cases/clasian`
- `/terms`
- `/privacy`

Before public launch:

- Have `/terms` reviewed by counsel.
- Have `/privacy` reviewed by counsel.
- Replace any placeholder case study content before using it publicly.

## 4. Vercel Project Setup

Recommended platform:

```text
Vercel
```

Setup steps:

1. Create or import the GitHub repository under `WDL-inc`.
2. In Vercel, create a new project from `WDL-inc/vitaledge-lp`.
3. Framework preset should be `Next.js`.
4. Build command should be `npm run build`.
5. Output settings can remain the Vercel defaults for Next.js.

## 5. Preview Protection

If the preview site should not be public, set these Vercel environment variables:

```text
BASIC_AUTH_USER=<preview user>
BASIC_AUTH_PASSWORD=<long random password>
```

Do not set weak values such as `wdl / wdl`.

For final public production, either:

- leave these variables unset, or
- set them only for Preview environments, not Production.

## 6. Domain Setup

Production domain:

```text
vitaledge.jp
```

Steps:

1. Add `vitaledge.jp` in Vercel Project Settings > Domains.
2. Decide whether `www.vitaledge.jp` is also used.
3. Register Vercel's requested DNS records in お名前.com.
4. Wait for DNS propagation.
5. Confirm Vercel issues SSL certificates.
6. Confirm the canonical URL redirects as intended.

## 7. Email / CTA

Current CTA email:

```text
info@wdlab.jp
```

Before launch, decide whether to:

- keep `info@wdlab.jp`, or
- configure mail for `info@vitaledge.jp` and update the CTA.

Do not use `info@vitaledge.co.jp` unless that domain and mailbox are actually owned and configured.

## 8. Final Pre-Launch QA

Check on desktop and mobile:

- First view hero image and CTA.
- Header logo and footer logo.
- The black "silent killer" section graphic.
- Case study cards and images.
- CTA mail link.
- Footer links.
- Terms and privacy pages.
- 404 behavior for unknown routes.

## 9. Go-Live

1. Merge the launch branch to `main`.
2. Confirm Vercel production deploy succeeds.
3. Attach `vitaledge.jp`.
4. Test the live production URL.
5. Enable branch protection on `main`.
