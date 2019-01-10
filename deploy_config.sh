export API_KEY='a'
export AUTH_DOMAIN='b'
export DATABASE_URL='c'
export PROJECT_ID='d'
export STORAGE_BUCKET='e'
export MESSAGE_SENDER_ID='f'

echo 'where are we here'
pwd
ls
cd src/environments

sed -i 's/\(API_KEY\)/'$API_KEY'/' environment.ts
sed -i 's/\(AUTH_DOMAIN\)/'$AUTH_DOMAIN'/' environment.ts
sed -i 's/\(DATABASE_URL\)/'$DATABASE_URL'/' environment.ts
sed -i 's/\(PROJECT_ID\)/'$PROJECT_ID'/' environment.ts
sed -i 's/\(STORAGE_BUCKET\)/'$STORAGE_BUCKET'/' environment.ts
sed -i 's/\(MESSAGE_SENDER_ID\)/'$MESSAGE_SENDER_ID'/' environment.ts

# rm -rf 'environment.ts.backup'

cat environment.ts