# Design: Ergonomic Native Bottom Tabs Architecture

## 1. Route Hierarchy

```text
src/app/
├── _layout.tsx                     # Root Stack (headerShown: false)
│   ├── (tabs)/                     # Translucent Bottom Tabs Navigator
│   │   ├── _layout.tsx             # Tabs configuration & haptic listeners
│   │   ├── index.tsx               # 📚 Library (Bookshelf & EPUB Import)
│   │   ├── tasks.tsx               # 🎯 Focus (ADHD Task Hero)
│   │   └── explore.tsx             # 🏛️ Architecture & Notes
│   └── reader/
│       └── [id].tsx                # 📖 Fullscreen Modal Reader
```

## 2. Tab Bar Styling & Interaction Tokens
- `tabBarStyle`: Translucent background (`rgba(255,255,255,0.85)` / `rgba(10,10,10,0.85)`), `position: 'absolute'`.
- `tabBarActiveTintColor`: System primary text.
- `tabBarInactiveTintColor`: Secondary alpha text (`0.44`).
- `tabPress`: Triggers `triggerSelectionChange()`.
- Screen ScrollViews: `contentInsetAdjustmentBehavior="automatic"`, bottom padding accounting for tab bar.
