// app/(public)/_layout.tsx
import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
   <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}

