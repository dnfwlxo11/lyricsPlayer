#!/bin/bash

echo "git setting start"

cd /app/server

git checkout ${BRANCH_NAME}

git reset --hard HEAD
git pull origin ${BRANCH_NAME}

echo "git ${BRANCH_NAME} pull completed"

rm package-lock.json
rm -rf node_modules
npm install

cat > pm2config.json << EOF
{
  "apps": [{
    "name": "app-instance",
    "script": "app.js",
    "instances": "4",
    "exec_mode": "cluster"
  }]
}
EOF

cat > .env.json << EOF
PORT=3000
HOST=localhost
DB_HOST=daein-mariadb
DB_PORT=3306
DB_USER=root
DB_PASS=daein
DB_NAME=lyrics_player
SECRET_TOKEN=secret.key
EOF

npm run dev