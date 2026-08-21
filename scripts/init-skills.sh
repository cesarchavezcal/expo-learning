#!/usr/bin/env bash
# Forwarding script for legacy compatibility -> scripts/setup-project.sh
exec "$(dirname "$0")/setup-project.sh" "$@"
