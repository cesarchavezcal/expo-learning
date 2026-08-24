#!/bin/bash
set -e

echo "=== Harness Initialization: expo-learning ==="

if [ -f "package.json" ]; then
  echo "--> Running TypeScript type check..."
  npx tsc --noEmit
  echo "--> Running Unit Tests..."
  npx tsx --test src/services/__tests__/*.test.ts
fi

echo "=== Verification Complete ==="
echo ""
echo "Next steps:"
echo "1. Read feature_list.json to see current feature state"
echo "2. Pick ONE unfinished feature to work on"
echo "3. Implement only that feature"
echo "4. Re-run ./init.sh before claiming done"
