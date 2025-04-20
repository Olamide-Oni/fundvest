import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Button, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from "@/colors";
import { Link } from 'expo-router';
import { FlipInEasyX } from 'react-native-reanimated';
import VestingOpportunities from '@/components/VestingOpportunities';
import YourInvestmentSection from '@/components/YourInvestmentSection';


const { width: screenWidth } = Dimensions.get('window'); 

type Plan = {
  image: string,
  title: string,
  openings: string,
  returns: string
  minimum: number,
  investors: number,
  duration: number,
}

const DATA = [
  {
    image:'image',
    title: '6-months vesting plan',
    openings: "Invest Now",
    returns: "20%",
    minimum: 50000,
    investors: 130,
    duration: 6
  },
  {
    image:'image',
    title: '12-months vesting plan',
    openings: "Invest Now",
    returns: "30%",
    minimum: 100000,
    investors: 130,
    duration: 12
  }
]

const Item = ({ item }: { item: Plan }) => (
  <View style={styles.itemContainer}>
    <Image
      source={require('@/assets/images/coinhand.png')}
      style={styles.itemImage}
    />
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemReturns}>{item.returns} in {item.duration} months</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemDetailText}>Minimum: #{item.minimum}</Text>
        <Text style={styles.itemDetailText}>{item.investors} investors</Text>
      </View>
    </View>
  </View>
);

export default function Invest() {
  return (
    <View style={styles.container}>
      <Text style={styles.onboardingText}>My Investments</Text>
      <View style={styles.card}>
      <View style={{ backgroundColor: Colors.lightGreen, padding: 4, borderRadius: 12 }}>
        <Text style={{ color: Colors.void, fontWeight: "bold", textAlign: "center" }}>up to 30% returns</Text>
      </View>      
        <View>
          <Text style={styles.cardTitle}>Total Invested</Text>
          <Text style={styles.cardValue}>#100,000</Text>
        </View>
      </View>
      <YourInvestmentSection/>
      <VestingOpportunities />
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.honeyDew,
    flex: 1,
    paddingHorizontal: 16,
    width: "100%",
  },
  onboardingText: {
    marginTop: 60,
    lineHeight: 29,
    fontWeight: '600',
    fontSize: 20,
    color: Colors.void,
    textAlign: 'center',
    marginBottom: 16,
  },
    card: {
      width: "95%",
      height: 120,
      backgroundColor: Colors.cyprus,
      borderRadius: 8,
      padding: 16,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      alignSelf: "center",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: Colors.honeyDew,
      marginBottom: 8,
    },
    cardValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.honeyDew,
    },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lBlue,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.fence,
    marginBottom: 8,
  },
  itemReturns: {
    fontSize: 14,
    color: Colors.void,
    marginBottom: 8,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDetailText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});