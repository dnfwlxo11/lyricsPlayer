#!/bin/bash
BACKUP_PATH=./app/backup/db_backup_$(date +%Y_%m_%d_%H%M%S).sql
docker exec daein-mariadb mysqldump -uroot -pdaein -h localhost lyrics_player > $BACKUP_PATH