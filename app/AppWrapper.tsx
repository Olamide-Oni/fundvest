// app/AppWrapper.tsx
import { Slot } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function AppWrapper() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}