import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { useRef } from 'react';
import 'react-native-reanimated';
import AuthProvider from './services/AuthProvider';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const renderCount = useRef(0);
  renderCount.current++;
  console.log(`app _layout layout Component rendered ${renderCount.current} times`);
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </ThemeProvider>
  );
}
