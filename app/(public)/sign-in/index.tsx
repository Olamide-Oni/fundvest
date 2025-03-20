import { View, Text, Button} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function SignInScreen() {
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <Button title="Login" onPress={handleLogin} disabled={isLoading} />
    </View>
  );
}