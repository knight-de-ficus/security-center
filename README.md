<div  align="center">
  <h1>Kdf SC Design Template</h1>
  <h4>Demo goes <a href="https://knight-de-ficus.github.io/security-center">here</a></h4>
</div>

## GitHub Pages

The site is configured for https://knight-de-ficus.github.io/security-center/.
The entry point opens the Chinese dashboard; English is available at `/security-center/en/`.

1. Push this project to the `knight-de-ficus/security-center` repository.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Push to the repository's default branch (or run the workflow manually on that branch) to build and deploy.

The workflow runs `npm ci` and `npm run build` on Node.js 24 for pushes and pull requests. Only the default branch deploys to Pages. No additional secrets are required.

To reproduce the static build in PowerShell:

```powershell
$env:GITHUB_PAGES = "true"
npm run build
node scripts/prepare-pages.mjs
Remove-Item Env:GITHUB_PAGES
```

Static output is written to `.next-pages/`. Regular `npm run dev` and server builds retain their existing root URL configuration. GitHub Pages uses pre-rendered locale routes and does not run the Next.js proxy or server redirects.
