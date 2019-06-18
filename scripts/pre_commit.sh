#!/bin/sh
# pre_commit.sh

cd src/environments/
pwd
rm -rf environment.ts
rm -rf environment.prod.ts
pwd
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $GL_ENVIRONMENT
curl -H "Authorization:token $GITHUB_TOKEN" -H "Accept:application/vnd.github.v3.raw" -O -L $GL_ENVIRONMENT_PROD
