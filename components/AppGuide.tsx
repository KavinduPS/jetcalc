import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type AppGuideProps = {
  isVisible: boolean;
  onClose: () => void;
};
const AppGuide = ({ isVisible, onClose }: AppGuideProps) => {
  return (
    <Modal visible={isVisible}>
      <LinearGradient
        colors={["rgb(28,28,28)", "rgb(10, 10, 10)"]}
        style={styles.container}
      >
        <View style={styles.closeIconContainer}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={30} color={"#FFF"} />
          </TouchableOpacity>
        </View>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "center",
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.bodyText}>TEXT GOES HERE!</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Modal>
  );
};

export default AppGuide;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeIconContainer: {
    position: "absolute",
    right: 5,
    top: 40,
    width: 40,
    height: 40,
  },
  textContainer: {},
  bodyText: {
    color: "#FFF",
  },
});
