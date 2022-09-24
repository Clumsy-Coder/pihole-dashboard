#!/bin/bash

set -x
# generate ENVs

echo -n '' > .env.local # empty the .env.local file
echo "NEXT_PUBLIC_BUILD_VERSION=$(npm run -s generateVersion)" >> .env.local;
echo "NEXT_PUBLIC_BUILD_ID=$(npm run -s generateBuildId)" >> .env.local;
echo "SECRET_COOKIE_PASSWORD=cteBV25ymu4HnVAvhDVf46JbGxZePA6Q" >> .env.local;
