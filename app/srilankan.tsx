import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SrilankanProps {
  plannedUplift: string;
  fob: string;
  actualUplift: string;
  calculatedUplift: string;
  discrepancy: string;
  bowserUplift: string;
  sg: string;
}

export default function SriLankanScreen() {
  const initialFormValues: SrilankanProps = {
    plannedUplift: "",
    fob: "",
    actualUplift: "",
    calculatedUplift: "",
    discrepancy: "",
    bowserUplift: "",
    sg: "",
  };

  return (
    <LinearGradient
      colors={["rgb(28,28,28)", "rgb(10, 10, 10)"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <Formik
              initialValues={initialFormValues}
              onSubmit={(values) => console.log(values)}
            >
              {({ values, setFieldValue }) => {
                const {
                  plannedUplift,
                  fob,
                  actualUplift,
                  calculatedUplift,
                  discrepancy,
                  bowserUplift,
                  sg,
                } = values;
                useEffect(() => {
                  if (sg && bowserUplift) {
                    const newActualUplift =
                      parseFloat(bowserUplift) * parseFloat(sg);
                    setFieldValue(
                      "actualUplift",
                      parseFloat(newActualUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("actualUplift", "");
                  }

                  if (plannedUplift && fob) {
                    const newCalculatedUplift =
                      parseFloat(plannedUplift) - parseFloat(fob);
                    setFieldValue(
                      "calculatedUplift",
                      parseFloat(newCalculatedUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("calculatedUplift", "");
                  }

                  if (actualUplift && calculatedUplift) {
                    const newDiscrepancy =
                      parseFloat(actualUplift) - parseFloat(calculatedUplift);
                    setFieldValue(
                      "discrepancy",
                      parseFloat(newDiscrepancy.toFixed(10))
                    );
                  } else {
                    setFieldValue("discrepancy", "");
                  }
                }, [
                  bowserUplift,
                  sg,
                  plannedUplift,
                  fob,
                  actualUplift,
                  calculatedUplift,
                ]);
                return (
                  <View style={styles.container}>
                    <View style={styles.inputs}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>PLANNED UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("plannedUplift", value)
                            }
                            value={plannedUplift}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>FOB</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("fob", value)
                            }
                            value={fob}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>ACTUAL UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("actualUplift", value)
                            }
                            value={actualUplift.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>CALCULATED UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("calculatedUplift", value)
                            }
                            value={calculatedUplift.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>DISCREPANCY</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("discrepancy", value)
                            }
                            value={discrepancy.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>BOWSER UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("bowserUplift", value)
                            }
                            value={bowserUplift}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>l</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>S.G</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) => setFieldValue("sg", value)}
                            value={sg}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                );
              }}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "#000",
  },
  inputs: {
    padding: 10,
    width: "90%",
    marginTop: 20,
    backgroundColor: "transparent",
  },
  inputContainer: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    width: "60%",
    fontSize: 16,
    color: "white",
  },
  inputAndUnit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
  },
  textInput: {
    height: 30,
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.60)",
    fontSize: 16,
    textAlign: "center",
    borderRadius: 10,
  },
  unit: {
    fontSize: 16,
    width: "20%",
    textAlign: "left",
    color: "white",
  },
});
