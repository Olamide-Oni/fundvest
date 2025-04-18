import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/colors";

export default function Notifications() {
  const router = useRouter();

  return (
    <>
      {/* Hide the default header */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        {/* Custom Header with Back Arrow */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.void} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        {/* Notifications Content */}
        <View style={styles.content}>
          <Text style={styles.placeholderText}>No new notifications</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.honeyDew,
    paddingVertical: 32,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.lightGreen,
    width: "100%"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.void,
    width: "100%",
    textAlign: "center"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
});