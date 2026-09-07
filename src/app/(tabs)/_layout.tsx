import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { triggerSelectionChange } from '@/services/haptics';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: theme.border,
          backgroundColor: Platform.select({
            ios: theme.background === '#FFFFFF' ? 'rgba(255, 255, 255, 0.88)' : 'rgba(10, 10, 10, 0.88)',
            default: theme.background,
          }),
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.1,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? 'books.vertical.fill' : 'books.vertical',
                android: 'menu_book',
                web: 'menu_book',
              }}
              size={22}
              tintColor={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => triggerSelectionChange(),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Focus',
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? 'target' : 'circle.circle',
                android: 'adjust',
                web: 'adjust',
              }}
              size={22}
              tintColor={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => triggerSelectionChange(),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Architecture',
          tabBarIcon: ({ color, focused }) => (
            <SymbolView
              name={{
                ios: focused ? 'square.stack.3d.up.fill' : 'square.stack.3d.up',
                android: 'layers',
                web: 'layers',
              }}
              size={22}
              tintColor={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => triggerSelectionChange(),
        }}
      />
    </Tabs>
  );
}
