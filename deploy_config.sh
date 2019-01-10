export API_KEY='a'
export AUTH_DOMAIN='b'
export DATABASE_URL='c'
export PROJECT_ID='d'
export STORAGE_BUCKET='e'
export MESSAGE_SENDER_ID='f'

echo 'where are we here'
pwd
ls


sed -i '' 's/\(API_KEY\)/'$API_KEY'/' /src/environments/environment.ts
sed -i '' 's/\(AUTH_DOMAIN\)/'$AUTH_DOMAIN'/' /src/environments/environment.ts
sed -i '' 's/\(DATABASE_URL\)/'$DATABASE_URL'/' /src/environments/environment.ts
sed -i '' 's/\(PROJECT_ID\)/'$PROJECT_ID'/' /src/environments/environment.ts
sed -i '' 's/\(STORAGE_BUCKET\)/'$STORAGE_BUCKET'/' /src/environments/environment.ts
sed -i '' 's/\(MESSAGE_SENDER_ID\)/'$MESSAGE_SENDER_ID'/' /src/environments/environment.ts

# rm -rf 'environment.ts.backup'

cat /src/environments/environment.ts