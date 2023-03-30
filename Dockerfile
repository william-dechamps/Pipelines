FROM node:18-alpine as installer

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

FROM node:18-alpine as builder

COPY --from=installer /app /app
COPY . /app

WORKDIR /app

RUN npm run build
RUN rm -rf node_modules
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs18-debian11 as run

WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

CMD ["dist/index.js", "--config=./config/app.conf.json" ]

FROM node:18-alpine as testinteg

WORKDIR /app
COPY --from=installer /app/tests/integ /app/tests/integ
COPY --from=installer /app/node_modules /app/node_modules
COPY --from=installer /app/package.json /app/package.json
COPY --from=installer /app/tsconfig.json /app/tsconfig.json

CMD [ "npm", "run", "test:integ" ]