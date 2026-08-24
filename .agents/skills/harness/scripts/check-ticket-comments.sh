#!/usr/bin/env bash
#
# check-ticket-comments.sh — blocks ticket-reference provenance in code comments.
#
# WHY: ticket keys in code comments rot as tickets close, rename, or migrate.
# Provenance belongs in the commit message / PR body / blame, not the source.
# Fails when a CHANGED line adds a comment containing a ticket key.
#
# ALLOWED: TODO(KEY) / FIXME(KEY) / HACK(KEY) markers, case-insensitive.
#
# SCOPE: only ADDED lines are scanned. Data/doc files (.md, .json, .yaml,
# lockfiles, ...) are skipped.
#
# USAGE:
#   check-ticket-comments.sh                      # scan staged changes (pre-commit)
#   check-ticket-comments.sh --range <revrange>   # scan a diff range, e.g. origin/main...HEAD
#
# EXIT: 0 = clean, 1 = violation(s) printed as file:line, 2 = usage error.
#
# WIRING (per-repo, optional): call from .githooks/pre-commit to enforce on every commit:
#   bash path/to/check-ticket-comments.sh || exit 1
# /harness invokes it directly in executor pre-commit verification and finalize gate.
#
# CONFIG: override the denylist (non-ticket KEY-NNN-shaped tokens, e.g. UTF-8,
# SHA-256) via TICKET_GUARD_DENYLIST — a '|'-separated alternation of exact
# alpha tokens (no trailing -NNN). Each candidate's FULL alpha prefix is
# matched against the list as a whole (anchored, not a substring): a denylist
# entry can never tail-strip part of a longer real key. Single-letter entries
# are inert — the ticket regex requires 2+ alnum chars before the hyphen.
#
# CASE NOTE: entries must be ALL-CAPS. A candidate's alpha prefix is always
# uppercase letters/digits and the comparison is case-sensitive; a mixed- or
# lower-case entry can never match.

set -uo pipefail

DENYLIST="${TICKET_GUARD_DENYLIST:-UTF|SHA|MD|ISO|RFC|AES|RGBA|RGB|UTC|GMT|IPV|IPV4|IPV6|EC|CVE|ES|HTTP|TLS|SSL|PKCS|SOCKS}"

if [ "${1:-}" = "--range" ]; then
  [ -n "${2:-}" ] || { echo "usage: $0 --range <revrange>" >&2; exit 2; }
  DIFF=$(git diff --no-color -U0 "$2" 2>&1)
  GIT_STATUS=$?
else
  DIFF=$(git diff --no-color -U0 --cached 2>&1)
  GIT_STATUS=$?
fi

# A failing `git diff` must not be treated as "no changes" — fail loud instead.
if [ "$GIT_STATUS" -ne 0 ]; then
  echo "✗ git diff failed (exit $GIT_STATUS) — cannot verify ticket-comment guard:" >&2
  printf '%s\n' "$DIFF" >&2
  exit 2
fi

[ -z "$DIFF" ] && exit 0
printf '%s\n' "$DIFF" | awk -v deny="$DENYLIST" '
  # Compiles the denylist as an anchored whole-token regex unconditionally,
  # so a malformed TICKET_GUARD_DENYLIST aborts loudly even with no candidate.
  BEGIN { deny_anchored = "^(" deny ")$"; discard = match("", deny_anchored) }
  # Returns the 1-based index where the comment portion of the line begins, or 0.
  # Restricts the ticket-key search to the comment, not the whole line.
  function comment_start(s,   c, p) {
    c = 0
    # First // not backslash-escaped and not part of a URL scheme (<scheme>://).
    pos = 1
    while (pos <= length(s)) {
      seg = substr(s, pos)
      if (!match(seg, /(^|[^\\])\/\//)) break
      slash = pos + RSTART - 1
      if (substr(seg, RSTART, 2) != "//") slash++

      # Ignore <scheme>:// (e.g. https://, file://), but allow cases like `case 1://`.
      if (slash > 1 && substr(s, slash - 1, 1) == ":") {
        pre = substr(s, 1, slash - 1)
        if (pre ~ /[A-Za-z][A-Za-z0-9+.-]+:$/) { pos = slash + 2; continue }
      }

      c = slash
      break
    }
    if (match(s, /\/\*/) && (c == 0 || RSTART < c))  c = RSTART
    if (match(s, /<!--/) && (c == 0 || RSTART < c))  c = RSTART
    # `#` is a comment delimiter only for file types that use it.
    if (file ~ /\.(sh|bash|zsh|rb|py|pl|pm|[Rr]|toml|cfg|conf|mk|ini)$/ || file ~ /(^|\/)\.(bashrc|zshrc|profile|bash_profile|bash_logout|zprofile|zshenv|zlogin|zlogout)$/ || file ~ /(^|\/)(Dockerfile|Makefile)([.][^\/]*)?$/) {
      if (match(s, /(^|[ \t])#/)) {
        p = RSTART + (substr(s, RSTART, 1) ~ /[ \t]/ ? 1 : 0)
        if (c == 0 || p < c) c = p
      }
    }
    if (c == 0 && s ~ /^[ \t]*\*[ \t]/) c = 1   # jsdoc/blockquote continuation line
    return c
  }
  /^diff --git/ { file = ""; next }
  /^\+\+\+ /    { file = $0; sub(/^\+\+\+ (b\/)?/, "", file); next }
  /^--- /       { next }
  /^@@/         { match($0, /\+[0-9]+/); new = substr($0, RSTART + 1, RLENGTH - 1) + 0; next }
  /^-/          { next }
  /^\+/ {
    line = substr($0, 2); cur = new; new++
    if (file ~ /\.(md|mdx|markdown|txt|json|ya?ml|lock|svg|csv|snap)$/) next
    if (file ~ /(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|composer\.lock|Cargo\.lock)$/) next
    cstart = comment_start(line)
    if (cstart == 0) next
    cs = substr(line, cstart)
    # Walks every ticket-shaped candidate, checking each alpha prefix in FULL
    # against the denylist (anchored whole-token match, not a substring
    # strip) — a denylist entry can never tail-strip part of a longer real key.
    ticket_found = 0
    base = 0; rest = cs
    while (match(rest, /[A-Z][A-Z0-9]+-[0-9]+/)) {
      tokstart = base + RSTART; toklen = RLENGTH
      tok = substr(cs, tokstart, toklen)
      match(tok, /-[0-9]+$/)
      alpha = substr(tok, 1, RSTART - 1)
      if (!match(alpha, deny_anchored)) { ticket_found = 1; break }
      base = tokstart + toklen - 1
      rest = substr(cs, base + 1)
    }
    if (ticket_found) {
      # Allows TODO(KEY)/FIXME(KEY)/HACK(KEY), case-insensitive.
      if (cs ~ /([Tt][Oo][Dd][Oo]|[Ff][Ii][Xx][Mm][Ee]|[Hh][Aa][Cc][Kk])\([^)]*[A-Za-z][A-Za-z0-9]+-[0-9]+[^)]*\)/) next
      printf "%s:%s: %s\n", file, cur, line
      found = 1
    }
  }
  END { exit (found ? 1 : 0) }
'
STATUS=$?

# awk exits 0 (clean) or 1 (violations found). Any other status is a runtime
# error and must fail loud, not fall through to exit 0.
if [ "$STATUS" -ne 0 ] && [ "$STATUS" -ne 1 ]; then
  echo "✗ ticket-comment scan failed (awk exit $STATUS) — cannot verify guard." >&2
  exit 2
fi

if [ "$STATUS" -eq 1 ]; then
  echo "" >&2
  echo "✗ Ticket reference(s) found in added code comments (see above)." >&2
  echo "  Move the 'why' into the comment and the ticket key into the commit/PR." >&2
  echo "  Live-work markers TODO(KEY)/FIXME(KEY)/HACK(KEY) are allowed." >&2
  exit 1
fi

exit 0
