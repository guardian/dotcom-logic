# ===============
# the first image as builder
FROM node as builder

WORKDIR /app

COPY ["./package.json", "./yarn.lock", "/app/"]

RUN yarn install --frozen-lockfile

COPY "./" "/app/"

## compile typescript
RUN yarn build

## remove packages of devDependencies
# See https://github.com/yarnpkg/yarn/issues/696#issuecomment-288922524
RUN yarn install --production --ignore-scripts --prefer-offline

# ===============
# the second image use node:slim image as the runtime
FROM node:slim as runtime

WORKDIR /app
ENV NODE_ENV=production

## Copy the necessary files form builder
COPY --from=builder "/app/dist/" "/app/dist/"
COPY --from=builder "/app/node_modules/" "/app/node_modules/"
COPY --from=builder "/app/package.json" "/app/package.json"

CMD ["pm2-runtime","app.js"]