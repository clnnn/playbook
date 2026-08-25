#!/usr/bin/env bash
# Claude Code status line: dir/branch · context tokens + % bar · session cost
set -uo pipefail

input=$(cat)

IFS=$'\t' read -r dir cost used_pct win_size in_tok out_tok cache_c cache_r <<<"$(
  printf '%s' "$input" | jq -r '
    [ (.workspace.current_dir // "."),
      (.cost.total_cost_usd // 0),
      (.context_window.used_percentage // 0),
      (.context_window.context_window_size // 0),
      (.context_window.current_usage.input_tokens // 0),
      (.context_window.current_usage.output_tokens // 0),
      (.context_window.current_usage.cache_creation_input_tokens // 0),
      (.context_window.current_usage.cache_read_input_tokens // 0)
    ] | @tsv'
)"

# --- context usage -----------------------------------------------------------
used=$(( in_tok + out_tok + cache_c + cache_r ))
# Fall back to percentage-derived estimate if per-part usage isn't reported yet.
if [ "$used" -eq 0 ] && [ "$win_size" -gt 0 ]; then
  used=$(awk -v p="$used_pct" -v w="$win_size" 'BEGIN{printf "%d", p*w/100}')
fi
pct=$(awk -v p="$used_pct" 'BEGIN{printf "%.0f", p}')

fmt_tokens() {
  awk -v t="$1" 'BEGIN{
    if (t >= 1000000) printf "%.2fM", t/1000000;
    else if (t >= 1000) printf "%.1fk", t/1000;
    else printf "%d", t;
  }'
}
used_h=$(fmt_tokens "$used")
win_h=$(fmt_tokens "$win_size")

# --- bar ---------------------------------------------------------------------
WIDTH=10
filled=$(awk -v p="$pct" -v w="$WIDTH" 'BEGIN{n=int(p*w/100); if(n==0 && p>0)n=1; if(n>w)n=w; if(n<0)n=0; print n}')
bar=""
for ((i = 0; i < WIDTH; i++)); do
  if [ "$i" -lt "$filled" ]; then bar+="█"; else bar+="░"; fi
done

# --- colors ------------------------------------------------------------------
DIM='\033[2m'; RESET='\033[0m'
BLUE='\033[34m'
GREEN='\033[32m'; YELLOW='\033[33m'; RED='\033[31m'
if [ "$pct" -ge 85 ]; then ctx_color=$RED
elif [ "$pct" -ge 60 ]; then ctx_color=$YELLOW
else ctx_color=$GREEN
fi

# --- git ---------------------------------------------------------------------
branch=$(git -C "$dir" branch --show-current 2>/dev/null)
[ -z "$branch" ] && branch=$(git -C "$dir" rev-parse --short HEAD 2>/dev/null)
git_part=""
if [ -n "$branch" ]; then
  dirty=""
  [ -n "$(git -C "$dir" status --porcelain 2>/dev/null | head -1)" ] && dirty="*"
  git_part=" ${DIM}on${RESET} ${BLUE}${branch}${dirty}${RESET}"
fi

cost_h=$(awk -v c="$cost" 'BEGIN{ if (c >= 1) printf "%.2f", c; else printf "%.3f", c }')

printf '%b\n' "${DIM}${dir##*/}${RESET}${git_part} ${DIM}|${RESET} ${ctx_color}${bar}${RESET} ${ctx_color}${pct}%${RESET} ${DIM}(${used_h}/${win_h})${RESET} ${DIM}|${RESET} ${GREEN}\$${cost_h}${RESET}"
