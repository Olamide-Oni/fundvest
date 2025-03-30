import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Button, FlatList, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from "@/colors";
import { Link } from 'expo-router';
import { FlipInEasyX } from 'react-native-reanimated';

const {height, width } = Dimensions.get('window'); 

type Plan = {
  image: string,
  title: string,
  openings: string,
  returns: string
  minimum: number,
  investors: number,
}

const DATA = [
  {
    image:'image',
    title: '6-months vesting plan',
    openings: "Invest Now",
    returns: "20%",
    minimum: 50000,
    investors: 130
  },
  {
    image:'image',
    title: '12-months vesting plan',
    openings: "Invest Now",
    returns: "30%",
    minimum: 100000,
    investors: 130
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
      <Text style={styles.itemReturns}>{item.returns} in 6 months</Text>
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
      <Text style={styles.onboardingText}>Explore Investments</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()} // Ensure unique keys
        renderItem={({ item }) => <Item item={item} />} // Pass item as a prop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cyprus,
    flex: 1,
    padding: 16,
  },
  onboardingText: {
    marginTop: 70,
    lineHeight: 29,
    fontWeight: '600',
    fontSize: 20,
    color: Colors.lightGreen,
    textAlign: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.honeyDew,
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