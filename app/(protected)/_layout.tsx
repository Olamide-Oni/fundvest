import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show a loading indicator while auth state is initializing
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Redirect to public routes if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(public)/sign-in" />;
  }

  // Render protected routes
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    />
  );
}