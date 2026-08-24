import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="subtitle">Architecture & Conventions</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.introText}>
            Overview of project architecture, routing patterns, and mobile design principles.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
              <ThemedText type="link">Expo documentation</ThemedText>
              <SymbolView
                tintColor={theme.textSecondary}
                name={{ ios: 'arrow.up.right', android: 'link', web: 'link' }}
                size={12}
              />
            </Pressable>
          </ExternalLink>
        </View>

        <View style={styles.chaptersWrapper}>
          <View style={[styles.chapter, { borderTopColor: theme.border }]}>
            <ThemedText style={styles.chapterHeading}>File-based routing</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.chapterBody}>
              Routes are mapped directly from files inside the <ThemedText type="code">src/app/</ThemedText> directory. Nested layouts and tab navigators are configured in <ThemedText type="code">src/app/_layout.tsx</ThemedText>.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </View>

          <View style={[styles.chapter, { borderTopColor: theme.border }]}>
            <ThemedText style={styles.chapterHeading}>Cross-platform rendering</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.chapterBody}>
              Components run natively on iOS and Android while sharing universal layouts on the web with React Native Web.
            </ThemedText>
            <Image
              source={require('@/assets/images/tutorial-web.png')}
              style={[styles.imageTutorial, { borderColor: theme.border }]}
            />
          </View>

          <View style={[styles.chapter, { borderTopColor: theme.border }]}>
            <ThemedText style={styles.chapterHeading}>Design craft & typography</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.chapterBody}>
              Interfaces use pure alpha black and white opacity ladders, system font optical tracking, and physical spring motion.
            </ThemedText>
          </View>

          <View style={[styles.chapter, { borderTopColor: theme.border }]}>
            <ThemedText style={styles.chapterHeading}>Theme adaptivity</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.chapterBody}>
              Light and dark appearances dynamically adjust surfaces and text without heavy background tinted casts.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Theme guidelines</ThemedText>
            </ExternalLink>
          </View>
        </View>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  titleContainer: {
    gap: Spacing.two,
    alignItems: 'flex-start',
    paddingVertical: Spacing.four,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    marginTop: Spacing.one,
  },
  pressed: {
    opacity: 0.6,
  },
  chaptersWrapper: {
    paddingTop: Spacing.three,
  },
  chapter: {
    paddingVertical: Spacing.five,
    borderTopWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
  },
  chapterHeading: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  chapterBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.two,
  },
});
