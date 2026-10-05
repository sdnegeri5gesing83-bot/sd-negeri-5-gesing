#!/bin/bash
cd /home/z/my-project
export DATABASE_URL="postgresql://postgres.qfsyfawnwlqvptnghbqp:Sdn5Gesing2026@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
export NEXTAUTH_SECRET="dev-secret-change-in-production-sdn5gesing"
export NEXTAUTH_URL="http://localhost:3000"

while true; do
  node node_modules/.bin/next dev -p 3000 > /home/z/my-project/dev.log 2>&1
  echo "Server crashed at $(date), restarting in 3s..." >> /home/z/my-project/dev.log
  sleep 3
done
