# Implementation Plan: Enable Gemini / AGY Provider in GGA

Connect Gentleman Guardian Angel (`.gga`) with Google Antigravity / Gemini CLI (`agy`) for automated code reviews.

---

## 1. Concrete Code Changes

### Step 1: Update GGA Provider Adapter
#### [MODIFY] `/opt/homebrew/Cellar/gga/2.10.1/libexec/lib/providers.sh`
- Support `gemini` and `agy` by checking `command -v agy || command -v gemini`.
- Route execution through `agy -p "$prompt" --disable-slash-commands 2>&1`.

```bash
# In validate_provider:
gemini|agy)
  if command -v agy &> /dev/null || command -v gemini &> /dev/null; then
    return 0
  fi
  echo -e "${RED}❌ Gemini / Antigravity (agy) CLI not found${NC}"
  return 1
  ;;

# In execute_gemini:
execute_gemini() {
  local prompt="$1"
  if command -v agy &> /dev/null; then
    agy -p "$prompt" --disable-slash-commands 2>&1
    return $?
  elif command -v gemini &> /dev/null; then
    if ! is_gemini_authenticated; then
      echo -e "${RED}❌ Gemini CLI is not authenticated${NC}" >&2
      return 1
    fi
    gemini -p "$prompt" 2>&1
    return $?
  fi
}
```

---

### Step 2: Update Repository Configuration
#### [MODIFY] [`.gga`](file:///Users/cesaradalbertochavezcalderon/Personal/agent-boilerplate/.gga)
```diff
- PROVIDER="claude"
+ PROVIDER="gemini"
```

---

## 2. Verification Plan

- Run `gga config` to confirm `PROVIDER: gemini`.
- Run `gga run --pr-mode --diff-only` to test the live review stream with `agy`.
