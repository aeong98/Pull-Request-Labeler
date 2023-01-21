# Pull-Request Labeler

## github action file example (for use)
- you only need `github secret token`

```yml
name: PR Branch Labeler

on: pull_request

permissions: write-all

jobs:
  label_prs:
    runs-on: ubuntu-latest
    steps:
      - name: Label PRs
        env:
          ACTIONS_STEP_DEBUG: true
        uses: aeong98/Pull-Request-Labeler@pre-release
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

## config file example
- config file must be placed at `.github/pr-branch-labeler.yml`

```yml
develop:
  base: ["develop/*", "develop*", "develop"]
release:
  base: ["main"]
feature:
  head: ["feature/*", "feat/*"]
fix:
  head: ["bugfix/*", "fix/*"]
hotfix:
  head: "hotfix/*"
enhancement:
  base: ["feature/*"]
  head: ["enhance/*", "enhancement/*"]
```
