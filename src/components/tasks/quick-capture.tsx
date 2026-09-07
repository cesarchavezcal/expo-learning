import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type QuickCaptureProps = {
  onAdd: (title: string) => void;
};

export function QuickCapture({ onAdd }: QuickCaptureProps) {
  const theme = useTheme();
  const [text, setText] = useState('');

  const handleSub = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <View style={[styles.container, { borderColor: theme.borderStrong, backgroundColor: theme.backgroundElement }]}>
      <SymbolView
        name={{ ios: 'plus.circle.fill', android: 'add_circle', web: 'add_circle' }}
        size={18}
        tintColor={theme.textSecondary}
      />
      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSub}
        placeholder="Dump a thought, task, or to-do..."
        placeholderTextColor={theme.textTertiary}
        returnKeyType="done"
        style={[styles.input, { color: theme.text }]}
      />
      {text.trim().length > 0 && (
        <Pressable hitSlop={8} onPress={handleSub} style={styles.sendButton}>
          <SymbolView
            name={{ ios: 'arrow.up.circle.fill', android: 'arrow_upward', web: 'arrow_upward' }}
            size={22}
            tintColor={theme.text}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
    gap: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 2,
  },
  sendButton: {
    padding: 2,
  },
});
