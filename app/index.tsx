import { StyleSheet, Text, View, Pressable } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Select Airline</Text>
      <View style={styles.buttonContainer}>
        <Link href="/srilankan" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Sri Lankan</Text>
          </Pressable>
        </Link>
        <Link href="/gulfair" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Gulf Air</Text>
          </Pressable>
        </Link>
        <Link href="/qatar" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Qatar</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 35,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    width: "50%",
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
  },
});
