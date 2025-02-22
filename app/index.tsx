import { StyleSheet, Text, View, Pressable, StatusBar } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["rgb(28,28,28)", "rgb(10, 10, 10)"]}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} />
      <Text style={styles.titleText}>Select Airline</Text>
      <View style={styles.buttonContainer}>
        <Link href="/srilankan" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>SriLankan Airlines</Text>
          </Pressable>
        </Link>
        <Link href="/gulfair" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Gulf Air</Text>
          </Pressable>
        </Link>
        <Link href="/qatar" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Qatar Airways</Text>
          </Pressable>
        </Link>
        <Link href="/omanair" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Oman Air</Text>
          </Pressable>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "rgba(225,225,225,0.75)",
    fontSize: 20,
  },
  buttonContainer: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgb(40,40,40)",
    width: "60%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
