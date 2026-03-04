import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../theme';
import { logger } from '../utils/logger';

export default function RootLayout() {
  useEffect(() => {
    logger.info('Mobile app started', {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001',
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background.DEFAULT }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background.DEFAULT,
          },
          headerTintColor: colors.text.primary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: colors.background.DEFAULT,
          },
        }}
      />
    </GestureHandlerRootView>
  );
}
