import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Button, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from "@/colors";
import OnboardingImage from '@/components/OnboardingImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo
import OnboardingImage2 from '@/components/OnboardingImage2';

const {height, width } = Dimensions.get('window');

export default function OnboardingScreen() {

   const scrollViewRef = useRef<ScrollView>(null);
    const [currentPage, setCurrentPage] = useState(0);
  
  
    const handleNextPage = () => {
      const nextPage = currentPage + 1;
      if (nextPage < 2) {
        setCurrentPage(nextPage);
        scrollViewRef.current?.scrollTo({
          x: nextPage * width,
          animated: true,
        });
      }
    };


  

  return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const page = Math.floor(event.nativeEvent.contentOffset.x / width);
            setCurrentPage(page);
          }}
        >
          <View style={[styles.page, {backgroundColor: Colors.fence, paddingTop: '15%'}]}>
            < View style = {{
              display: 'flex',
              width: '100%',
              flex: 1,
              justifyContent: 'space-between'
              }}>
                <Text style={
                  styles.onboardingText
                }>Build You Wealth</Text>
                <OnboardingImage />
                     
            </View>         
          </View>
          <View style={[styles.page, {backgroundColor: Colors.fence, paddingTop: '15%'}]}>
            < View style = {{
              display: 'flex',
              width: '100%',
              flex: 1,
              justifyContent: 'space-between'
              }}>
                <Text style={
                  styles.onboardingText
                }>Are you ready to take control of your finances?</Text>
                {/* <OnboardingImage /> */}
                <OnboardingImage2 />
                     
            </View>         
          </View>
        </ScrollView>
  
        <View style={styles.buttons}>
          {currentPage === 1 ? (
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => router.push('/(public)/sign-in')}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextPage}
              disabled={currentPage === 2}
            >
              <Text style={styles.buttonText}>Next</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          )}
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
    width: '100%', // Ensure the container spans the full width
    position: 'absolute',
    bottom: '10%', // Position the buttons at the bottom
    alignItems: 'center', // Center the buttons horizontally
    justifyContent: 'center', // Center the content within the container
    padding: 20,
  },
  onboardingText: {
    lineHeight: 39,
    fontWeight: 'semibold',
    fontSize: 30,
    color: Colors.lightGreen,
    textAlign: 'center'
  },   
  getStartedButton: {
    backgroundColor: Colors.void,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: Colors.void,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});