# !/bin/bash
# deploy_config.sh
# This script updates Firebase Environment Variables at deployment
# Note that sed on OSX and sed in Linux operate different ways
# with OSX you have to pass a dummy blank file with -i like 'sed -i "" <s command> <file>'

cd src/environments
sed -i 's/\(API_KEY\)/'$API_KEY'/' environment.prod.ts
sed -i 's/\(AUTH_DOMAIN\)/'$AUTH_DOMAIN'/' environment.prod.ts
sed -i 's/\(DATABASE_URL\)/'$DATABASE_URL'/' environment.prod.ts
sed -i 's/\(PROJECT_ID\)/'$PROJECT_ID'/' environment.prod.ts
sed -i 's/\(STORAGE_BUCKET\)/'$STORAGE_BUCKET'/' environment.prod.ts
sed -i 's/\(MESSAGE_SENDER_ID\)/'$MESSAGING_SENDER_ID'/' environment.prod.ts
cat environment.prod.ts
