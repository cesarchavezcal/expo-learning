import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NowCard } from '@/components/tasks/now-card';
import { QuickCapture } from '@/components/tasks/quick-capture';
import { TaskItem } from '@/components/tasks/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTasks } from '@/hooks/use-tasks';
import { useTheme } from '@/hooks/use-theme';

export default function TasksScreen() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const {
    nowTask,
    laterTasks,
    doneTasks,
    addTask,
    completeTask,
    promoteToNow,
    addMicroStep,
    toggleMicroStep,
    deleteTask,
  } = useTasks();

  const [showLater, setShowLater] = useState(true);
  const [showDone, setShowDone] = useState(false);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + Spacing.four,
            paddingBottom: insets.bottom + Spacing.six,
          },
        ]}>
        <View style={styles.contentWrapper}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View>
              <ThemedText type="title">Focus</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.headerSubtitle}>
                {doneTasks.length} completed today • 1 thing right now
              </ThemedText>
            </View>

            <View style={styles.headerActions}>
              <Pressable
                onPress={() => router.push('/')}
                style={[styles.navButton, { borderColor: theme.border }]}>
                <SymbolView
                  name={{ ios: 'books.vertical', android: 'menu_book', web: 'menu_book' }}
                  size={14}
                  tintColor={theme.text}
                />
                <Text style={[styles.navButtonText, { color: theme.text }]}>Library</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push('/explore')}
                style={[styles.navButton, { borderColor: theme.border }]}>
                <Text style={[styles.navButtonText, { color: theme.text }]}>Arch</Text>
              </Pressable>
            </View>
          </View>

          {/* Quick Brain Dump Bar */}
          <QuickCapture onAdd={addTask} />

          {/* "NOW" Hero Card */}
          <View style={styles.section}>
            <NowCard
              task={nowTask}
              onComplete={() => nowTask && completeTask(nowTask.id)}
              onToggleMicroStep={(stepId) => nowTask && toggleMicroStep(nowTask.id, stepId)}
              onAddMicroStep={(title) => nowTask && addMicroStep(nowTask.id, title)}
              onSkip={() => {
                if (nowTask && laterTasks.length > 0) {
                  promoteToNow(laterTasks[0].id);
                }
              }}
            />
          </View>

          {/* "LATER" Queue Section */}
          <View style={styles.section}>
            <Pressable
              onPress={() => setShowLater((v) => !v)}
              style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                LATER QUEUE ({laterTasks.length})
              </Text>
              <SymbolView
                name={{
                  ios: showLater ? 'chevron.up' : 'chevron.down',
                  android: showLater ? 'expand_less' : 'expand_more',
                  web: showLater ? 'expand_less' : 'expand_more',
                }}
                size={14}
                tintColor={theme.textTertiary}
              />
            </Pressable>

            {showLater && (
              <View style={styles.taskList}>
                {laterTasks.length === 0 ? (
                  <Text style={[styles.quietText, { color: theme.textTertiary }]}>
                    No tasks waiting. Your mind is free.
                  </Text>
                ) : (
                  laterTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={() => completeTask(task.id)}
                      onPromote={() => promoteToNow(task.id)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))
                )}
              </View>
            )}
          </View>

          {/* "DONE TODAY" Momentum Log */}
          {doneTasks.length > 0 && (
            <View style={styles.section}>
              <Pressable
                onPress={() => setShowDone((v) => !v)}
                style={[styles.sectionHeader, { borderBottomColor: theme.border }]}>
                <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
                  COMPLETED TODAY ({doneTasks.length})
                </Text>
                <SymbolView
                  name={{
                    ios: showDone ? 'chevron.up' : 'chevron.down',
                    android: showDone ? 'expand_less' : 'expand_more',
                    web: showDone ? 'expand_less' : 'expand_more',
                  }}
                  size={14}
                  tintColor={theme.textTertiary}
                />
              </Pressable>

              {showDone && (
                <View style={styles.taskList}>
                  {doneTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={() => completeTask(task.id)}
                      onDelete={() => deleteTask(task.id)}
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
  },
  contentWrapper: {
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
    gap: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: Spacing.one,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: Spacing.half,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
    height: 32,
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.one,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  taskList: {
    gap: Spacing.two,
  },
  quietText: {
    fontSize: 13,
    fontStyle: 'italic',
    paddingVertical: Spacing.one,
  },
});
