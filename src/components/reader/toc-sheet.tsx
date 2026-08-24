import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { THEME_PALETTES } from '@/hooks/use-reader-settings';
import { Chapter, ReaderThemeMode } from '@/types/reader';

type TocSheetProps = {
  visible: boolean;
  chapters: Chapter[];
  currentChapterIndex: number;
  themeMode: ReaderThemeMode;
  onSelectChapter: (index: number) => void;
  onClose: () => void;
};

export function TocSheet({
  visible,
  chapters,
  currentChapterIndex,
  themeMode,
  onSelectChapter,
  onClose,
}: TocSheetProps) {
  const insets = useSafeAreaInsets();
  const palette = THEME_PALETTES[themeMode];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            {
              backgroundColor: palette.background,
              borderColor: palette.border,
              paddingBottom: Math.max(insets.bottom, Spacing.four),
            },
          ]}
          onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: palette.text }]}>Table of Contents</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={16}
                tintColor={palette.textSecondary}
              />
            </Pressable>
          </View>

          <ScrollView style={styles.chapterList}>
            {chapters.map((ch, idx) => {
              const isCurrent = idx === currentChapterIndex;
              return (
                <Pressable
                  key={ch.id}
                  onPress={() => {
                    onSelectChapter(idx);
                    onClose();
                  }}
                  style={[
                    styles.chapterItem,
                    {
                      borderBottomColor: palette.border,
                      backgroundColor: isCurrent ? palette.surface : 'transparent',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.chapterIndex,
                      { color: isCurrent ? palette.text : palette.textSecondary },
                    ]}>
                    {idx + 1}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.chapterTitle,
                      {
                        color: isCurrent ? palette.text : palette.textSecondary,
                        fontWeight: isCurrent ? '600' : '400',
                      },
                    ]}>
                    {ch.title}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: Spacing.four,
    borderTopRightRadius: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    maxHeight: '70%',
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.two,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  chapterList: {
    marginTop: Spacing.one,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: Spacing.three,
  },
  chapterIndex: {
    fontSize: 13,
    width: 20,
    fontVariant: ['tabular-nums'],
  },
  chapterTitle: {
    fontSize: 14,
    flex: 1,
  },
});
