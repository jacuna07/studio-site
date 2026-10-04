#!/bin/bash
# When Claude finishes a turn, run tsc and lint. If either fails, Claude is told to fix it.
input=$(cat)
active=$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).stop_hook_active?"1":"0")}catch(e){console.log("0")}})')
[ "$active" = "1" ] && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
# Only check when source files changed
git status --porcelain -- src | grep -q . || exit 0
out=$(npx tsc --noEmit 2>&1) || { echo "TypeScript errors:" >&2; echo "$out" | head -30 >&2; exit 2; }
out=$(npx next lint 2>&1) || { echo "Lint errors:" >&2; echo "$out" | head -30 >&2; exit 2; }
exit 0
