#!/bin/bash

# creates ENVs and puts them into .env.local file
# NOTE: this is ONLY used for development purposes only.

set -x
# generate ENVs

echo -n '' > .env.local # empty the .env.local file
echo "NEXT_PUBLIC_BUILD_VERSION=$(npm run -s generateVersion)" >> .env.local;
echo "NEXT_PUBLIC_BUILD_ID=$(npm run -s generateBuildId)" >> .env.local;

# iron session
echo "SECRET_COOKIE_PASSWORD=cteBV25ymu4HnVAvhDVf46JbGxZePA6Q" >> .env.local;
echo "SECURE_COOKIE_TTL=$(expr 5 \* 60 \* 60)" >> .env.local;                 # time in seconds
echo "NEXT_PUBLIC_POLLING_AUTH_SESSION=1000" >> .env.local

# next-auth
echo "NEXTAUTH_SECRET=cteBV25ymu4HnVAvhDVf46JbGxZePA6Q" >> .env.local
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local

# fetching from /api/summary
echo "NEXT_PUBLIC_POLLING_SUMMARY=2000" >> .env.local                         # time in milliseconds

# fetching from /api/forwardedDestinations
echo "NEXT_PUBLIC_POLLING_FORWARDED_DESTINATIONS=60000" >> .env.local         # time in milliseconds

# fetching from /api/queryTypes
echo "NEXT_PUBLIC_POLLING_QUERY_TYPES=60000" >> .env.local                    # time in milliseconds

# top permitted and blocked queries
echo "NEXT_PUBLIC_POLLING_TOP_PERMITTED_QUERIES=10000" >> .env.local          # time in milliseconds
echo "NEXT_PUBLIC_POLLING_TOP_BLOCKED_QUERIES=10000" >> .env.local            # time in milliseconds
echo "NEXT_PUBLIC_NUM_ENTRIES_TOP_PERMITTED_QUERIES=10" >> .env.local
echo "NEXT_PUBLIC_NUM_ENTRIES_TOP_BLOCKED_QUERIES=10" >> .env.local

# Top clients and Top clients blocked
echo "NEXT_PUBLIC_POLLING_TOP_CLIENTS_ALLOWED_QUERIES=10000" >> .env.local    # time in milliseconds
echo "NEXT_PUBLIC_POLLING_TOP_CLIENTS_BLOCKED_QUERIES=10000" >> .env.local    # time in milliseconds
echo "NEXT_PUBLIC_NUM_ENTRIES_TOP_CLIENTS_ALLOWED_QUERIES=10" >> .env.local
echo "NEXT_PUBLIC_NUM_ENTRIES_TOP_CLIENTS_BLOCKED_QUERIES=10" >> .env.local

# queries overtime (for bar chart)
echo "NEXT_PUBLIC_POLLING_QUERIES_OVERTIME=600000" >> .env.local              # time in milliseconds

# clients overtime (for bar chart)
echo "NEXT_PUBLIC_POLLING_CLIENTS_OVERTIME=600000" >> .env.local              # time in milliseconds

# built date and time
# using unix time
echo "NEXT_PUBLIC_BUILD_TIME=$(date +%s)" >> .env.local
