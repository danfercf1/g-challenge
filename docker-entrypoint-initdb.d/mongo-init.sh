echo "STARTING MONGO"
mongo --eval "db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD'); db = db.getSiblingDB('$MONGO_DB_NAME'); db.createUser({ user: '$MONGO_DB_USER', pwd: '$MONGO_DB_PASSWORD', roles: [{ role: 'readWrite', db: '$MONGO_DB_NAME' }] });"
