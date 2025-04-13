import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AppGuide from "@/components/AppGuide";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [isHelpModalVisible, setIsHelpModalVisible] = useState<boolean>(false);
  const handleClose = (): void => {
    setIsHelpModalVisible(false);
  };
  return (
    <LinearGradient
      colors={["rgb(28,28,28)", "rgb(10, 10, 10)"]}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} />
      <Link href={"/"} asChild>
        <TouchableOpacity
          onPress={() => setIsHelpModalVisible(true)}
          style={styles.helpContainer}
        >
          <Ionicons
            name="information-circle-outline"
            size={25}
            color={"#FFF"}
          />
        </TouchableOpacity>
      </Link>
      <Image
        source={require("../assets/icon/index-page-image.png")}
        style={styles.image}
      />
      <Text style={styles.titleText}>Select Airline</Text>
      <View style={styles.buttonContainer}>
        <Link href="/srilankan" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SriLankan Airlines</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/emirates" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Emirates</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/qatar" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Qatar Airways</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/gulfair" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Gulf Air</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/omanair" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Oman Air</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/airindia" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Air India</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/malaysia" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Malaysia Airlines</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <AppGuide isVisible={isHelpModalVisible} onClose={handleClose} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  helpContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    width: 22,
    height: 22,
    position: "absolute",
    top: 53,
    right: 25,
  },
  help: {
    color: "#FFF",
    fontWeight: 500,
    fontSize: 15,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
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
