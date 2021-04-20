#!/bin/bash
# grab local workspace
workspace=$(vtex local workspace)

resolvedConfig="resolved-cypress.json"

# replace <workspace> placeholder in baseUrl
# and write config to $resolvedConfig
cat cypress.json | sed -e "s/<workspace>/$workspace/" > $resolvedConfig

# cmd is either 'open' or 'run'
cmd=$1

# discard cmd from argument list
shift

yarn cypress $cmd -C $resolvedConfig "$@" --browser chrome

rm $resolvedConfig
