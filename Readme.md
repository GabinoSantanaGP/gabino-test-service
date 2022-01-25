# Current Template

set up

edit gp-repo-config.json

```json
{
  "CODEOWNERS": ["AodhainMcd", "BFrancisgp", "nialltoner-gp", "klynchkurzawa", "duncanhealy-gp"],
  "USERNAME": "dhealy", // user email
  "SERVICE_NAME": "customer-experience",
  "TEAM_URL": "trail-01.gpdev.us",
  "SERVICES": ["ui-components"]
}
```

- `make yarnrc` to get PERSONAL_ACCESS_TOKEN from environment. This saves to the developers home directory

## note needs parent directory to have package from gp

- `make reposetup` to replace with your team settings
- `git add . && git commit -m 'fix: team settings'`
- `make create/repo` to set branch permissions and access for team
- `yarn` to install

## to get an aws token

`make aws/token`

## to set up branch permissions

`make create/repo`

## post install

run
`yarn xpostinstall` to set husky hooks
should check for existence of .husky folder to see if we are inside development repo

## environment setup

`make addwebhooksecret`

## Troubleshooting typescript issues

### adding sub-package

- add to references in `tsconfig.json`
- check `decs.d.ts`
- checking `tsconfig.json` in sub-package to include all files
- check the import path `/dist/..` or `/build` or `/lib` may need to be added
- `*` to get all imports from a package may behave differently to what you expect c.f. express
- adding `/// <reference types="Module" />` to `.ts` files to give hints to typescript

## package

- `yarn npm publish` requires `private` field in package.json to be unset
