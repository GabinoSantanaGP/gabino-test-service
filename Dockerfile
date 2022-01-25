# Alias alpine base image
FROM node:14.18.0-slim as slim
ARG PERSONAL_ACCESS_TOKEN

ENV APP_DIR /app/gp-template-nodejs-service-backend
ENV DIST_DIR /dist
ENV NODE_ENV development

ENV PERSONAL_ACCESS_TOKEN=${PERSONAL_ACCESS_TOKEN}
WORKDIR ${APP_DIR}
# # Compile source
# FROM alpine as compile
# ARG PERSONAL_ACCESS_TOKEN
COPY .yarn .yarn
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY .yarnrc.yml .
# COPY .yarn/releases .yarn/releases
# COPY .yarn/plugins .yarn/plugins
# COPY .yarn/install-state.gz .yarn/
COPY ./packages ./packages

# RUN yarn upgrade version berry && yarn upgrade version 3.0.2
RUN yarn config set --home "npmRegistries['https://npm.pkg.github.com'].npmAuthToken" "${PERSONAL_ACCESS_TOKEN}" &&\
  cp .yarnrc.yml tmp && cat tmp | sed "s/PERSONAL_ACCESS_TOKEN/${PERSONAL_ACCESS_TOKEN}/g" > .yarnrc.yml &&\
  echo @globalization-partners:registry=https://npm.pkg.github.com/ > .npmrc &&\
  echo //npm.pkg.github.com/:_authToken=$PERSONAL_ACCESS_TOKEN >> .npmrc &&\
  yarn install &&\
  rm .npmrc && mv tmp .yarnrc.yml
# # Install runtime dependencies
# FROM alpine AS rundep
# COPY --from=compile .npmrc yarn.lock ./
# COPY package.json tsconfig.json ./
# # babel.config.ts
# RUN yarn install --frozen-lockfile --production && rm -f .npmrc

# # Setup runtime image and run service
# FROM alpine AS run
# COPY --from=compile ${DIST_DIR} ${APP_DIR}${DIST_DIR}
# COPY --from=rundep .yarn ${APP_DIR}/.yarn
# COPY package.json *.env* ${APP_DIR}/
# # COPY docs/api/professional-api.yaml ${APP_DIR}/docs/api/professional-api.yaml
# WORKDIR ${APP_DIR}
RUN npm install --global typescript@4.5.0-dev.20211012

RUN yarn build
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]

# ...

CMD ["yarn", "node", "packages/gp-template-nodejs-service-backend/build/src/server.js"]
