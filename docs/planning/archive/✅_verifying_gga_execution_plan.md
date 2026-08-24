# Implementation Plan: Verifying Gentleman Guardian Angel (GGA) Execution

A technical guide explaining how GGA runs, what output to expect during git operations, and how to manually verify its active status.

---

## 1. How GGA Operates

GGA (Gentleman Guardian Angel) is an AI-powered code review gatekeeper that operates in **two modes**:
1. **Automated Pre-Commit Hook**: Fires automatically on every `git commit`.
2. **Manual On-Demand CLI**: Run manually before staging or opening PRs.

---

## 2. The 3 Ways to Know GGA is Running

### Method 1: Automatic Pre-Commit Banner (The Primary Way)
Whenever you run `git commit`, GGA intercepts the commit and displays its ASCII banner in the terminal:

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Gentleman Guardian Angel v2.10.1
  Provider-agnostic code review using AI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Reviewing staged changes with gemini against AGENTS.md rules...

✅ Review passed: Clean architecture, strict typing, tests verified.
[chore/CCH/initial-setup-complete 8a2f1c0] chore(setup): ...
```

If any staged file violates Section 6 coding rules in `AGENTS.md` (e.g. untyped `any`, swallowed error, missing tests), GGA **aborts the commit** and prints the violations.

---

### Method 2: Manual CLI Review (Test Without Committing)
You can run GGA manually on staged changes at any time without committing:

```bash
# Review current staged changes against AGENTS.md rules
gga check

# Or review PR mode against main branch
gga pr
```

---

### Method 3: Inspect Installed Git Hook
Check that `.git/hooks/pre-commit` contains the GGA execution trigger:

```bash
cat .git/hooks/pre-commit
```

Expected content:
```bash
#!/bin/sh
gga hook
```

---

## 3. Verification Plan

### Automated / Command Verification
1. Inspect `.git/hooks/pre-commit` to verify hook script installation.
2. Run `gga --version` to verify CLI availability.
3. Test a dry-run commit to observe the live GGA terminal review banner.
