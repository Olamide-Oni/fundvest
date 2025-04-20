import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Colors } from "@/colors";
import { Link } from "expo-router";

interface InvestmentProps {
  title: string;
  returns: string;
  minimum: number;
  investors: number;
}

const DATA: InvestmentProps[] = [
  {
    title: "6-months vesting plan",
    returns: "20%",
    minimum: 50000,
    investors: 130,
  },
  {
    title: "12-months vesting plan",
    returns: "30%",
    minimum: 100000,
    investors: 200,
  },
  {
    title: "18-months vesting plan",
    returns: "40%",
    minimum: 150000,
    investors: 300,
  },
];

const renderItem = ({ item }: { item: InvestmentProps }) => (
  <View style={styles.investmentCard}>
    <View style={styles.investmentDetailsContainer}>
      <Text style={styles.investmentPlanTitle}>{item.title}</Text>
      <Text style={styles.investmentDetail}>Returns: {item.returns}</Text>
      <Text style={styles.investmentDetail}>
        Minimum Investment: #{item.minimum}
      </Text>
      <Text style={styles.investmentDetail}>Investors: {item.investors}</Text>
    </View>
  </View>
);

export default function YourInvestmentSection() {
  return (
    <View style={styles.investmentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.investmentTitle}>Your Investments</Text>
        {/*<Link href="/(protected)/(tabs)/(invest)/explore" style={styles.seeMoreLink}>
          See more
        </Link> */}
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => index.toString()} // Ensure unique keys
        renderItem={renderItem} // Render each item
        horizontal // Make the FlatList horizontal
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        initialNumToRender={2} // Render at least 2 items initially
        contentContainerStyle={styles.flatListContainer} // Add padding for horizontal scrolling
      />
    </View>
  );
}

const styles = StyleSheet.create({
  investmentContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: Colors.honeyDew,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  investmentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.cyprus,
  },
  seeMoreLink: {
    fontSize: 12,
    color: Colors.lBlue,
    textDecorationLine: "underline",
  },
  flatListContainer: {
    paddingHorizontal: 8, // Add padding for horizontal scrolling
  },
  investmentCard: {
    backgroundColor: Colors.lBlue,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginRight: 12, // Add spacing between cards
    width: 200, // Set a fixed width for each card
  },
  investmentDetailsContainer: {
    marginBottom: 16,
  },
  investmentPlanTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.fence,
    marginBottom: 8,
  },
  investmentDetail: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
});