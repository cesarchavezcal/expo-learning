#!/usr/bin/env bash
# Initial setup helper script for agent-boilerplate template

set -e

echo "🚀 Starting agent-boilerplate project initialization script..."

# 1. Base skills setup
echo "📦 Step 1: Installing base skills packages (mattpocock/skills & cesarchavezcal/personal-skills)..."
if command -v npx >/dev/null 2>&1; then
    npx skills@latest add mattpocock/skills -y || echo "⚠️ Warning: Could not auto-install mattpocock/skills. Please run manually."
    npx skills@latest add cesarchavezcal/personal-skills -y || echo "⚠️ Warning: Could not auto-install cesarchavezcal/personal-skills. Please run manually."
else
    echo "⚠️ npx is not available. Please install node/npm to manage agent skills."
fi



# 2. Stack file auto-detection
echo ""
echo "🔍 Step 2: Auto-detecting project tech stack files..."
DETECTED_STACK=""

if [ -f "package.json" ]; then
    echo "  ✓ Found package.json (Node/JavaScript/TypeScript ecosystem)"
    DETECTED_STACK="$DETECTED_STACK react typescript"
fi

if [ -f "pyproject.toml" ] || [ -f "requirements.txt" ]; then
    echo "  ✓ Found Python project manifest"
    DETECTED_STACK="$DETECTED_STACK python"
fi

if [ -f "Cargo.toml" ]; then
    echo "  ✓ Found Rust project manifest (Cargo.toml)"
    DETECTED_STACK="$DETECTED_STACK rust"
fi

if [ -f "go.mod" ]; then
    echo "  ✓ Found Go project manifest (go.mod)"
    DETECTED_STACK="$DETECTED_STACK go"
fi

# 3. Dynamic Skill Discovery
STACK_QUERY="${1:-$DETECTED_STACK}"
if [ -n "$STACK_QUERY" ]; then
    echo ""
    echo "🔎 Step 3: Searching skills for stack keywords: '$STACK_QUERY'..."
    npx skills find $STACK_QUERY || echo "⚠️ npx skills find search completed."
else
    echo ""
    echo "🔎 Step 3: Searching skills default catalog..."
    npx skills find react || true
fi

echo ""
echo "✅ Base setup helper finished! To install any discovered skills, run:"
echo "   npx skills add <owner/repo@skill-name> -g -y"
