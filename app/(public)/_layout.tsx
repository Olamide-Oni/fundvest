// app/(public)/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function PublicLayout() {
  return (
    <>
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
    <StatusBar style="light" />
    </>
  );
}