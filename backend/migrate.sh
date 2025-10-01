#!/bin/bash
set -euo pipefail

ENV=${1:-dev}

case "$ENV" in
  dev)
    ENV_FILE=".env.dev"
    RUN_MIGRATE='npx dotenv -e ".env.dev" -- npm run db:migrate'
    RUN_GENERATE='npm run prisma:generate'   # generate는 보통 환경변수 필요 없음
    MSG="Prisma migrate dev (dev)"
    ;;
  apply)
    # apply = dev 환경에 deploy만 수행하고 generate까지
    ENV_FILE=".env.dev"
    RUN_MIGRATE='npx dotenv -e ".env.dev" -- npm run db:deploy'
    RUN_GENERATE='npm run prisma:generate'
    MSG="Prisma migrate deploy (apply=dev)"
    ;;
  prod)
    ENV_FILE=".env.prod"
    RUN_MIGRATE='npx dotenv -e ".env.prod" -- npm run db:deploy'
    RUN_GENERATE='npm run prisma:generate'
    MSG="Prisma migrate deploy (prod)"
    ;;
  *)
    echo "Usage: $0 [dev|apply|prod]"
    exit 1
    ;;
esac

echo "🔧 Using environment: $ENV_FILE"
[ -f "$ENV_FILE" ] || { echo "❌ $ENV_FILE 없음"; exit 1; }

echo "$MSG"
eval "$RUN_MIGRATE"
eval "$RUN_GENERATE"

echo "Migration completed!"
