FROM oven/bun:alpine AS base

ARG outputDir=".output"

# install node.js
RUN apk add --no-cache nodejs

# install dependencies
FROM base AS deps
WORKDIR /deps

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# build app
FROM base AS build
WORKDIR /build

COPY . .
RUN rm -rf node_modules $outputDir
COPY --from=deps /deps/node_modules node_modules
RUN /bin/sh -c "source env.sh && export NITRO_PRESET=node_server && bun run build"

# copy and run built artifacts and dependencies
FROM base AS runtime
WORKDIR /app
RUN chown -R bun:bun /app && chmod -R 755 /app

USER bun
COPY --from=deps --chown=bun /deps/node_modules node_modules
COPY --from=build --chown=bun /build/package.json package.json
COPY --from=build --chown=bun /build/$outputDir dist
COPY --from=build --chown=bun /build/env.sh env.sh
RUN mkdir /app/.tmp

EXPOSE 80/tcp
ENV NITRO_PORT=80
CMD ["/bin/sh", "-c", "source env.sh && node dist/server/index.mjs"]