#!/bin/bash
# Blocks any `git push`. Javier pushes from GitHub Desktop.
input=$(cat)
cmd=$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).tool_input.command||"")}catch(e){console.log("")}})')
if printf '%s' "$cmd" | grep -Eq 'git( +-[^ ]+( +[^ -][^ ]*)?)* +push'; then
  echo "Blocked: never push. Commit locally; Javier pushes from GitHub Desktop." >&2
  exit 2
fi
exit 0
