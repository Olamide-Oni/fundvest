import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'expo-router';
import { Colors } from "@/colors";
import { LineChart } from "react-native-chart-kit"; // Import the chart component

const { width: screenWidth } = Dimensions.get('window'); // Get the screen width dynamically

export default function Overview() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.greetingText}>Hi, {user?.firstName}</Text>
          <Text style={styles.welcomeText}>Welcome back</Text>
        </View>
        <Link href=''></Link>
      </View>

      {/* Horizontal ScrollView for full-width cards */}
      <ScrollView
        horizontal
        pagingEnabled // Enables snapping to each card
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Balance</Text>
          <Text style={styles.cardValue}>#50,000</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Invested</Text>
          <Text style={styles.cardValue}>#100,000</Text>
        </View>
      </ScrollView>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Investment Performance</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [5000, 10000, 15000, 20000, 25000, 30000],
              },
            ],
          }}
          width={screenWidth - 32} // Chart width
          height={220} // Chart height
          yAxisLabel="#"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#1e2227",
            backgroundGradientFrom: "#1e2227",
            backgroundGradientTo: "#25292e",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 8,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#fff",
            },
          }}
          style={{
            marginVertical: 16,
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#25292e',
    backgroundColor: Colors.cyprus,
    padding: 16,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.lightGreen,
    textAlign: 'left',
    marginTop: 50,
  },
  welcomeText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 16,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    width: screenWidth - 32, // Full width minus padding
    backgroundColor: '#1e2227',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.lightGreen,
  },
  chartContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
});