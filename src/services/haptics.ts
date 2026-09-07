/**
 * Multimodal Haptics Service (Apple WWDC Designing Audio-Haptic Experiences)
 * Ensures causality and harmony by providing tactile feedback on state commits.
 */

let HapticsModule: typeof import('expo-haptics') | null = null;

function getHaptics() {
  if (HapticsModule !== null) return HapticsModule;
  if (process.env.EXPO_OS === 'web') return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    HapticsModule = require('expo-haptics');
    return HapticsModule;
  } catch {
    return null;
  }
}

export function triggerLightImpact(): void {
  const haptics = getHaptics();
  if (!haptics) return;
  try {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Light).catch(() => {});
  } catch {
    // Graceful no-op
  }
}

export function triggerMediumImpact(): void {
  const haptics = getHaptics();
  if (!haptics) return;
  try {
    haptics.impactAsync(haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  } catch {
    // Graceful no-op
  }
}

export function triggerSuccessNotification(): void {
  const haptics = getHaptics();
  if (!haptics) return;
  try {
    haptics.notificationAsync(haptics.NotificationFeedbackType.Success).catch(() => {});
  } catch {
    // Graceful no-op
  }
}

export function triggerSelectionChange(): void {
  const haptics = getHaptics();
  if (!haptics) return;
  try {
    haptics.selectionAsync().catch(() => {});
  } catch {
    // Graceful no-op
  }
}
