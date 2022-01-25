# Tech stack for backend service

- `tsoa` library https://tsoa-community.github.io/docs/
- `yarn build:specandroutes` needs to be run separately -> `routes.ts` generated has an error until we bring template in house
- `yarn node build/src/server.js` to run express server
- `ts-node src/server.ts` to run typescript directly
- swagger docs at localhost:${PORT}/docs
