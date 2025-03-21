import { View, TextInput, Text, Button, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/colors';
import { Dimensions } from 'react-native';
import { router, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

export default function SignUpScreen() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const signUpUrl = `${apiUrl}/signup`;

  const { login, isLoading } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

   /* if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address!');
      return;
    } */

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    const userData = { firstName, lastName, email, phoneNumber, password };

    try {
      const response = await fetch(signUpUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message || 'Account created!');
        await AsyncStorage.setItem('onboardingSeen', 'true');
        router.replace('/(public)/sign-in');
      } else {
        Alert.alert('Error', result.error || 'Something went wrong!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server!');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>      
      <View style={[styles.page, { backgroundColor: Colors.fence, paddingTop: '15%' }]}>        
        <Text style={styles.onboardingTextHeader}>Create Account</Text>
        <View style={styles.formContainer}>
          <Text style={styles.onboardingText}>First Name</Text>
          <TextInput style={styles.input} placeholder="First name" value={firstName} onChangeText={setFirstName} />

          <Text style={styles.onboardingText}>Last Name</Text>
          <TextInput style={styles.input} placeholder="Last name" value={lastName} onChangeText={setLastName} />

          <Text style={styles.onboardingText}>Email Address</Text>
          <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.onboardingText}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Phone number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType='numeric' />

          <Text style={styles.onboardingText}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter password" value={password} onChangeText={setPassword} secureTextEntry={true} />

          <Text style={styles.onboardingText}>Confirm Password</Text>
          <TextInput style={styles.input} placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />

          <Button title="Sign Up" onPress={handleSignUp} />
        </View>        
      </View>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  page: { width, height: '100%', justifyContent: 'center', alignItems: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8 },
  onboardingTextHeader: { fontSize: 30, color: Colors.lightGreen, textAlign: 'center' },
  onboardingText: { fontSize: 15, color: Colors.lightGreen, paddingBottom: 10 },
  formContainer: { width: '100%', padding: 20 }
});
