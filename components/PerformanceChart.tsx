import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { StyleSheet } from "react-native";
import { Colors } from "@/colors";

const { width: screenWidth } = Dimensions.get("window");

interface PerformanceChartProps {
  data: number[];
  labels: string[];
  chartTitle?: string;
  chartConfig?: object;
}

export default function PerformanceChart({
  data,
  labels,
  chartTitle = "Investment Performance",
  chartConfig,
}: PerformanceChartProps) {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{chartTitle}</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={screenWidth - 32}
        height={220}
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
          ...chartConfig, // Allow overriding default chartConfig
        }}
        style={{
          marginVertical: 16,
          borderRadius: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.cyprus,
    marginBottom: 16,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
  },
});