import {
  Image,
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
          <Image
            source={require("../assets/icon/index-page-image.png")}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>Note to User:</Text>
            <Text style={styles.bodyText}>
              This application has been developed with the intention of easing
              the workload of aircraft technicians, aircarft engineers, and
              pilots by simplifying routine fuel calculations. It is designed to
              serve as a helpful tool to support day to day functions in the
              aviation environment. {"\n\n"}However, please note that while
              every effort has been made to ensure the accuracy and reliability
              of this app, the developer does not take responsibility for any
              errors, miscalculations, or issues arising from its use. Users are
              advised to use the app at their sole discretion and always cross
              check critical values with official procedures and documentation.{" "}
              {"\n\n"}Thank you for using the app, and I hope it adds value to
              your work.
            </Text>
            <Text style={styles.textTitle}>How to use:</Text>
            <Text style={styles.bodyText}>
              1. Select the airline from home page {"\n\n"}2. Fill in the red
              outlined mandatory fields{"\n\n"}
              <Text style={styles.redText}>
                {"\n\n"}Kindly verify that the current airline procedures for
                these calculations are still applicable before using this app
              </Text>
            </Text>
          </View>
          <View />
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    alignSelf: "center",
  },
  closeIconContainer: {
    position: "absolute",
    right: 10,
    top: 50,
    width: 40,
    height: 40,
  },
  textContainer: { maxWidth: "80%" },
  textTitle: {
    maxWidth: "80%",
    fontWeight: 500,
    color: "white",
    marginBottom: 20,
    fontSize: 20,
  },
  bodyText: {
    fontWeight: 300,
    color: "#FFF",
    textAlign: "justify",
    marginBottom: 20,
  },
  redText: { fontWeight: 600, fontSize: 16, color: "rgb(238, 73, 8)" },
});
