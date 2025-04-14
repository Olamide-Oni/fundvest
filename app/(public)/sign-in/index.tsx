import { View, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/colors';
import { Dimensions } from 'react-native';
import { router, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function SignInScreen() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.page, { backgroundColor: Colors.fence, paddingTop: '30%' }]}>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.subHeaderText}>Sign in to continue</Text>

        <View style={styles.formContainer}>
          <View style={{ padding: 20 }}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={Colors.darkGray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={Colors.darkGray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => router.push('/(public)/forgetPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <Link href="/(public)/signup" style={styles.signupLink}>
                Create Account
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fence,
  },
  page: {
    width,
    height: '100%',
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    paddingTop: 50, // Add padding at the top
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.lightGreen,
    textAlign: 'center',
    marginBottom: 8, // Space below the header
    marginTop: 20, // Space above the header
  },
  subHeaderText: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 30, // Space below the subheader
  },
  formContainer: {
    flex: 1, // Ensures the form container takes up the remaining space
    width: '100%',
    backgroundColor: Colors.cyprus,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: Colors.lightGreen,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: Colors.lightGreen,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: Colors.fence,
    backgroundColor: Colors.honeyDew,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.lightGreen,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: Colors.lightGreen,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: Colors.void,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.darkGray,
    marginRight: 4,
  },
  signupLink: {
    fontSize: 14,
    color: Colors.lightGreen,
    fontWeight: 'bold',
  },
});