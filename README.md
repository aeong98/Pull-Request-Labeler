# Pull-Request Labeler

## github action file example (for use)
### input
- repo-token: your github secret token
- config-pathname : pathname of your config file

```yml
name: PR Branch Labeler

on: pull_request

jobs:
  label_prs:
    runs-on: ubuntu-latest
    steps:
      - name: Label PRs
        uses: aeong98/Pull-Request-Labeler@v1
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          config-pathname: .github/pr-branch-labeler.yml

```

## config file example

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
