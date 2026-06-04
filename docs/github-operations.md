# GitHub Operations

## Recommended repository ownership

For a company LP, the repository should live under the company organization:

```text
WDL-inc/vitaledge-lp
```

This keeps ownership with the company even if an individual account changes roles.

## Safe migration path

1. Confirm you are an owner of `WDL-inc` or have permission to create repositories.
2. Re-authenticate GitHub CLI if you want to operate from the terminal:

   ```bash
   gh auth login -h github.com
   ```

3. Either transfer the existing repository on GitHub, or create a new organization repository and push this code there.
4. After the organization repository exists, update the local remote:

   ```bash
   git remote set-url origin https://github.com/WDL-inc/vitaledge-lp.git
   ```

5. Connect the organization repository to Vercel.

## Collaboration rules

- Protect `main` after the first production deploy.
- Ask designers and developers to work on branches, then merge through pull requests.
- Keep preview credentials and deployment tokens in GitHub or Vercel secrets, never in source files.
- Review changes to `package.json`, `package-lock.json`, `next.config.ts`, and `src/proxy.ts` carefully because they affect deployment and security.
