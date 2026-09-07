# Implementation Plan: Re-Run iOS Simulator

Cleanly restart the Expo development server and re-bundle the application on the iOS Simulator to pick up the newly installed native module (`expo-haptics`) and updated gesture handlers.

---

## 1. Goal Description
The user wants to re-run the app on the iOS Simulator. Because a new native package (`expo-haptics`) was installed and major gesture/UI polish changes were merged, a clean restart (`--clear`) ensures Metro bundles all modules without stale cache artifacts.

---

## 2. User Review Required

> [!NOTE]
> - The existing Metro process (`task-971`) will be terminated cleanly.
> - The iOS Simulator will be focused, and Expo will start with `--ios --clear`.

---

## 3. Proposed Steps

1. **Terminate Active Metro Server**:
   - Cancel background task `task-971` using `manage_task(Action='kill')`.
2. **Launch Simulator & Fresh Metro Bundler**:
   - Execute: `open -a Simulator && npx expo start --ios --clear`
3. **Verify Bundler Health**:
   - Inspect Metro logs to confirm 100% clean bundle on iPhone 17 Simulator.

---

## 4. Verification Plan

### Automated Checks
- Verify task exit code is 0 and Metro prints `› Opening exp://... on iPhone 17`.
- Inspect log to ensure `node_modules/expo-router/entry.js` bundles with 0 errors.

### Manual Verification
- In the iOS Simulator, confirm the app reloads with squircle curves, 1:1 swipe gestures in the reader, and tactile haptic responses.
