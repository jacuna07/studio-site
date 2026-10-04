#!/bin/bash
# Blocks edits to the parked Spanish site.
input=$(cat)
path=$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).tool_input.file_path||"")}catch(e){console.log("")}})')
case "$path" in
  */src/app/es/*|*/src/content/projects-es/*)
    echo "Blocked: the Spanish site is parked (English only). Ask Javier first." >&2
    exit 2;;
esac
exit 0
