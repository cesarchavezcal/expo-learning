import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { MicroStep } from '@/types/task';

type MicroStepListProps = {
  steps: MicroStep[];
  onToggle: (stepId: string) => void;
  onAddStep: (title: string) => void;
};

export function MicroStepList({ steps, onToggle, onAddStep }: MicroStepListProps) {
  const theme = useTheme();
  const [newStepText, setNewStepText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (newStepText.trim()) {
      onAddStep(newStepText);
      setNewStepText('');
      setIsAdding(false);
    }
  };

  return (
    <View style={styles.container}>
      {steps.map((step) => (
        <Pressable
          key={step.id}
          onPress={() => onToggle(step.id)}
          style={[styles.stepRow, { borderBottomColor: theme.border }]}>
          <View
            style={[
              styles.stepCheckbox,
              {
                borderColor: step.isCompleted ? theme.textSecondary : theme.borderStrong,
                backgroundColor: step.isCompleted ? theme.text : 'transparent',
              },
            ]}>
            {step.isCompleted && (
              <SymbolView
                name={{ ios: 'checkmark', android: 'check', web: 'check' }}
                size={10}
                tintColor={theme.background}
              />
            )}
          </View>

          <Text
            style={[
              styles.stepTitle,
              {
                color: step.isCompleted ? theme.textTertiary : theme.text,
                textDecorationLine: step.isCompleted ? 'line-through' : 'none',
              },
            ]}>
            {step.title}
          </Text>
        </Pressable>
      ))}

      {/* Add Micro-step inline */}
      {isAdding ? (
        <View style={[styles.inputRow, { borderColor: theme.border }]}>
          <TextInput
            autoFocus
            value={newStepText}
            onChangeText={setNewStepText}
            onSubmitEditing={handleAdd}
            placeholder="Next 2-minute step..."
            placeholderTextColor={theme.textTertiary}
            returnKeyType="done"
            style={[styles.input, { color: theme.text }]}
          />
          <Pressable hitSlop={8} onPress={handleAdd} style={styles.addBtn}>
            <Text style={[styles.addBtnText, { color: theme.text }]}>Add</Text>
          </Pressable>
          <Pressable hitSlop={8} onPress={() => setIsAdding(false)}>
            <SymbolView
              name={{ ios: 'xmark', android: 'close', web: 'close' }}
              size={12}
              tintColor={theme.textTertiary}
            />
          </Pressable>
        </View>
      ) : (
        <Pressable hitSlop={8} onPress={() => setIsAdding(true)} style={styles.showAddBtn}>
          <SymbolView
            name={{ ios: 'plus', android: 'add', web: 'add' }}
            size={12}
            tintColor={theme.textSecondary}
          />
          <Text style={[styles.showAddText, { color: theme.textSecondary }]}>
            Break into micro-step (&lt; 2 mins)
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
    marginTop: Spacing.two,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.one,
    gap: Spacing.two,
  },
  stepCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 14,
    lineHeight: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  input: {
    flex: 1,
    fontSize: 13,
    paddingVertical: 2,
  },
  addBtn: {
    paddingHorizontal: Spacing.one,
  },
  addBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  showAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.one,
  },
  showAddText: {
    fontSize: 13,
    fontWeight: '400',
  },
});
