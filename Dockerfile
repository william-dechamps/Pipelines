# Installer: only install all node modules
FROM node:18-alpine as installer 

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

# Builder:
# - transpile TS to JS
# - remove all node modules
# - reinstall node modules without dev dependencies
FROM node:18-alpine as builder

COPY --from=installer /app /app
COPY . /app

WORKDIR /app

RUN npm run build
RUN rm -rf node_modules
RUN npm ci --omit=dev

## Run: based on an ultra lite image, launch server
FROM gcr.io/distroless/nodejs18-debian11 as run

WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

CMD ["dist/index.js", "--config=./config/app.conf.json" ]

## Testinteg: get only test integ files and, node modules from installer (with dev dep) and package.json and run the test integ command
FROM node:18-alpine as testinteg

WORKDIR /app
COPY --from=installer /app/tests/integ /app/tests/integ
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/package.json /app/package.json
COPY --from=installer /app/tsconfig.json /app/tsconfig.json

CMD [ "npm", "run", "test:integ" ]