import { router } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth, AuthProvider } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import AppWrapper from '@/app/AppWrapper';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}

function RootLayoutContent() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(protected)/(tabs)/home');
      } else {
        router.replace('/(public)/onboarding');
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppWrapper />;
}