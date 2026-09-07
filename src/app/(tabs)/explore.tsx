import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function ExploreScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: insets.top + Spacing.four,
          paddingBottom: insets.bottom + BottomTabInset + Spacing.six,
        },
      ]}>
      <ThemedView style={styles.container}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Architecture</ThemedText>
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
            <ThemedText style={styles.chapterHeading}>File-based routing & tabs</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.chapterBody}>
              Routes are mapped directly from files inside the <ThemedText type="code">src/app/(tabs)/</ThemedText> directory. Top-level tabs are bottom-anchored in the natural thumb zone, while the reader opens as a fullscreen modal.
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
              Interfaces use pure alpha black and white opacity ladders, system font optical tracking, continuous squircle curves, and physical spring motion.
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
  },
  titleContainer: {
    gap: Spacing.two,
    alignItems: 'flex-start',
    paddingBottom: Spacing.two,
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
    letterSpacing: -0.2,
  },
  chapterBody: {
    fontSize: 14,
    lineHeight: 22,
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.two,
    borderCurve: 'continuous',
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.two,
  },
});
