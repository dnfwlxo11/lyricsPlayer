#!/bin/bash

echo `./wait-for-it.sh daein-elastic:9200 -t 600 -- echo "Check ElasticSearch"`

echo "git setting start"

cd /app/server

git checkout master

git reset --hard HEAD
git pull origin master

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

cat > .env << EOF
SERVER_PORT=3000
DB_HOST=daein-mariadb
DB_PORT=3306
DB_USER=root
DB_PASS=daein
DB_NAME=lyrics_player
SECRET_TOKEN=daein.dev
EOF

npm run dev