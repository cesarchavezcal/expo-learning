# Spec Test Contracts: Bottom Tabs Navigation

## SCEN-001: Tab Navigation Availability
- **Given**: App launched at `/`.
- **When**: The user observes the viewport.
- **Then**: Bottom tab bar renders Library, Focus, and Architecture tabs.

## SCEN-002: Fullscreen Reader Route
- **Given**: Any book card in Library.
- **When**: The user taps to read.
- **Then**: `/reader/[id]` route opens in fullscreen modal mode without bottom tabs visible.
