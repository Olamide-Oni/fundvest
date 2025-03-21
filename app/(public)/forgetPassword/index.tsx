import { View, TextInput, Text, Button} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '@/colors';
import { Dimensions } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


const {height, width } = Dimensions.get('window');

export default function SignInScreen() {
  const { login, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('onboardingSeen', 'true');
    router.replace('/(public)/sign-in');
  };

 /*return (
    <View>
      <Text>Sign In</Text>
      <Button title="Login" onPress={handleLogin} disabled={isLoading} />
    </View>
  ); */
   return (
        <View style={styles.container}>      
            <View style={[styles.page, {backgroundColor: Colors.fence, paddingTop: '15%'}]}>
              < View style = {{ display: 'flex',width: '100%',flex: 1,justifyContent: 'space-between'}}>
                  <Text style={styles.onboardingTextHeader}>Welcome</Text>
                  <View style={styles.formContainer}>
                    <View style={{ padding: 20 }}>
                      <Text style={styles.onboardingText}>Username or Email</Text>
                      <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8,}}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                      />

                      <Text style={styles.onboardingText}>Password</Text>
                      <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 8,}}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                      />

                      <View>
                        <Button title="Login" onPress={handleLogin} disabled={isLoading} />
                        <Button title="Sign up" onPress={completeOnboarding} />
                      </View>  
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
  },
  page: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    /*flexDirection: 'row',
    justifyContent: 'center',*/
    padding: 20,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    bottom: '10%',
  },
  onboardingTextHeader: {
    lineHeight: 39,
    fontWeight: 'semibold',
    fontSize: 30,
    color: Colors.lightGreen,
    textAlign: 'center'
  },   
  onboardingText: {
    lineHeight: 15,
    fontWeight: 'semibold',
    fontSize: 15,
    color: Colors.lightGreen,
    textAlign: 'left',
    paddingBottom: 10
  },   
  formContainer: {
          width: '100%',
          height: '80%',
          backgroundColor: Colors.cyprus,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginHorizontal: 'auto',
          padding: 20
  },
});