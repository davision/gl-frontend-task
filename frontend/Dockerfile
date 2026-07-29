FROM node:22-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --store-dir /pnpm/store

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "pnpm install --frozen-lockfile --store-dir /pnpm/store && pnpm dev --host 0.0.0.0 --port 3000"]
