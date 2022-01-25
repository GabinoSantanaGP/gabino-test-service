USERNAME = $(jq < gp-repo-config.json .USERNAME)
TEAM_NAME = $(jq < gp-repo-config .TEAM_NAME)
install:
	# install
	yarn
setup/service-%:
	mkdir packages/${@}
token:
	gp-dev-jwt-creator % bin/index.js -u 17167 -p 351 -t G -l form-service -e ${USERNAME}@globalization-partners.com

preinstall:
	pnpm i -g typescript
	tsc --init
	pnpx gitignore node
## yalc for localdev
yalc/add:
	yarn global add yalc
	# each service
	git submodule add git@github.com:globalization-partners/ui-components.git packages/ui-components
	cd packages/ui-components && yarn && yarn build:code
	yalc publish --private
	yalc add @globalization-partners/ui-components
yalc/remove:
	yalc remove --all
	yalc installations clean @globalization-partners/ui-components
	yarn

upgrade/selective:
	yarn upgrade-interactive

aws/token:
	open https://globalization-partners.awsapps.com/start#/

create/repo: ## add the repo and policy
	cd .. && bash ./devops-scripts/github/repocreate.sh -n gp-template-nodejs-service -b main
yarnrc: ## install yarnrc file
## backup
	cp ~/.yarnrc.yml ~/.yarnrc.yml.bak
	## replace token from env
	cat .yarnrc.yml | sed "s/PERSONAL_ACCESS_TOKEN/${PERSONAL_ACCESS_TOKEN}/" > ~/.yarnrc.yml
reposetup:
	node gp-setup.js
	sed "s/TEAM_NAME/${TEAM_NAME}/g" .github/workflows/regression.yml
addwebhooksecret:
	gh secret set CUSTOMER_SERVICE_SLACK_WEBHOOK -b "${CUSTOMER_SERVICE_SLACK_WEBHOOK}"
create-react-app:
	yarn create vite gp-react-app --template react-ts
docker/build:
	docker build . --build-arg PERSONAL_ACCESS_TOKEN=${PERSONAL_ACCESS_TOKEN} -t globalization-partners/gp-template-nodejs-service
docker/run:
	docker run -it --rm globalization-partners/gp-template-nodejs-service:latest
swoptoken:
		cat .yarnrc.yml | sed "s/PERSONAL_ACCESS_TOKEN/${PERSONAL_ACCESS_TOKEN}/" > tmp && mv tmp .yarnrc.yml
aws-local-build:
	npx @aws-actions/codebuild-run-build -p ProjectName -r remoteName
