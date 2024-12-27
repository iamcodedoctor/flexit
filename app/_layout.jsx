import React from 'react';
import { ApplicationProvider, Layout, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Stack } from 'expo-router';

export default function LayoutComponent() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>

  );
}
