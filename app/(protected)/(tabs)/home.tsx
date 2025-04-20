import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'expo-router';
import { Colors } from "@/colors";
import PerformanceChart from "@/components/PerformanceChart";
import Ionicons from '@expo/vector-icons/Ionicons';
import YourInvestmentSection from "@/components/YourInvestmentSection";

const { width: screenWidth } = Dimensions.get('window');

export default function Overview() {
  const { user } = useAuth();
  const [selectedInvestment, setSelectedInvestment] = useState({
    title: "6-months vesting plan",
    returns: "20%",
    minimum: 50000,
    investors: 130,
  });
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [activeIndex, setActiveIndex] = useState(0); // Track the active card index

  const handleAddFunds = () => {
    setModalVisible(true); // Show the modal
  };

  const handleConfirmDeposit = () => {
    const parsedAmount = parseFloat(inputAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setDepositAmount(parsedAmount);
      setModalVisible(false); // Close the modal
      showAccountDetails(parsedAmount);
    } else {
      alert("Invalid Amount. Please enter a valid amount.");
    }
  };

  const showAccountDetails = (amount: number) => {
    alert(`Account Name: FundVest Investments\nAccount Number: 1234567890\nAmount: #${amount}`);
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth - 50));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.greetingText}>Hi, {user?.firstName}</Text>
            <Text style={styles.welcomeText}>Welcome back</Text>
          </View>
          <Link href="/notifications">
            <Ionicons name="notifications-outline" size={24} color={Colors.void} />
          </Link>
        </View>

        {/* Horizontal ScrollView for full-width cards */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Total Balance</Text>
              <Text style={styles.cardValue}>#50,000</Text>
            </View>

            <TouchableOpacity style={styles.addFundsButton} onPress={handleAddFunds}>
              <Text style={styles.addFundsButtonText}>Add Funds</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Total Invested</Text>
              <Text style={styles.cardValue}>#100,000</Text>
            </View>
          </View>
        </ScrollView>

        {/* Swipe Indicator */}
        <View style={styles.indicatorContainer}>
          {[0, 1].map((index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                activeIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Chart Section */}
      <PerformanceChart
        data={[5000, 10000, 15000, 20000, 25000, 30000]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]}
      />

      {/* Modal for Add Funds */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusts for iOS and Android
        >
          <View style={styles.bottomModal}>
            <Text style={styles.modalTitle}>Add Funds</Text>

            {/* Suggestions */}
            <View style={styles.suggestionsContainer}>
              {["50000", "60000", "100000", "200000", "500000"].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={styles.suggestionButton}
                  onPress={() => setInputAmount(amount)}
                >
                  <Text style={styles.suggestionText}>#{parseInt(amount).toLocaleString()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Input Field */}
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={inputAmount}
              onChangeText={setInputAmount}
            />

            {/* Modal Buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setInputAmount(""); // Clear the input field
                  setModalVisible(false); // Close the modal
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirmDeposit}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Your Investment Section */}
      <YourInvestmentSection/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.honeyDew,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.void,
    textAlign: 'left',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.cyprus,
    textAlign: 'left',
    marginBottom: 16,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    width: screenWidth - 50,
    backgroundColor: Colors.caribbean,
    borderRadius: 8,
    padding: 24,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  addFundsButton: {
    backgroundColor: Colors.void,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addFundsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.darkGray,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.caribbean,
  },
  chartContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.cyprus,
    marginBottom: 16,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns the modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  bottomModal: {
    backgroundColor: Colors.honeyDew,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.cyprus,
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  suggestionButton: {
    backgroundColor: Colors.lightGreen,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    width: '30%',
    alignItems: 'center',
  },
  suggestionText: {
    color: Colors.void,
    fontWeight: 'bold',
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: Colors.cyprus,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: Colors.void,
  },
  confirmButton: {
    backgroundColor: Colors.lightGreen,
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: Colors.void,
    fontWeight: 'bold',    
  },
  
});