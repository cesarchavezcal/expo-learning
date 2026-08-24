import * as Device from 'expo-device';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText>
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.heroSection}>
          <AnimatedIcon />
          <View style={styles.headerTextBlock}>
            <ThemedText type="title">Welcome to Expo</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.subtitle}>
              Hands-on playground for React Native, Expo Router, and mobile design craft.
            </ThemedText>
          </View>
        </View>

        <View style={styles.sectionChapter}>
          <View style={[styles.chapterHeader, { borderBottomColor: theme.border }]}>
            <ThemedText style={styles.chapterTitle}>Getting started</ThemedText>
          </View>

          <View style={styles.stepContainer}>
            <HintRow
              title="Entry route"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Developer menu" hint={getDevMenuHint()} />
            <HintRow
              title="Reset template"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </View>
        </View>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    width: '100%',
    gap: Spacing.five,
  },
  heroSection: {
    alignItems: 'flex-start',
    gap: Spacing.four,
    paddingTop: Spacing.three,
  },
  headerTextBlock: {
    gap: Spacing.two,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  sectionChapter: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  chapterHeader: {
    paddingBottom: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  chapterTitle: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
    opacity: 0.64,
  },
  stepContainer: {
    paddingTop: Spacing.one,
  },
});
