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

interface GulfAirProps {
  arrivalFuel: string;
  departureFuel: string;
  fob: string;
  sg: string;
  conversionFactor: string;
  meteredUplift: string;
  calculatedUplift: string;
  discrepancy: string;
}

export default function GulfAirScreen() {
  const initialFormValues: GulfAirProps = {
    arrivalFuel: "",
    departureFuel: "",
    fob: "",
    sg: "",
    conversionFactor: "",
    meteredUplift: "",
    calculatedUplift: "",
    discrepancy: "",
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
                  arrivalFuel,
                  departureFuel,
                  fob,
                  sg,
                  conversionFactor,
                  meteredUplift,
                  calculatedUplift,
                  discrepancy,
                } = values;
                useEffect(() => {
                  if (sg && parseFloat(sg) !== 0) {
                    const newConversionFactor = 1 / parseFloat(sg);
                    setFieldValue(
                      "conversionFactor",
                      parseFloat(newConversionFactor.toFixed(4))
                    );
                  } else {
                    setFieldValue("conversionFactor", "");
                  }

                  if (departureFuel && fob && conversionFactor) {
                    const newCalculatedUplift =
                      (parseFloat(departureFuel) - parseFloat(fob)) *
                      parseFloat(conversionFactor);
                    setFieldValue(
                      "calculatedUplift",
                      parseFloat(newCalculatedUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("calculatedUplift", "");
                  }

                  if (meteredUplift && calculatedUplift) {
                    const newDiscrepancy =
                      parseFloat(meteredUplift) - parseFloat(calculatedUplift);
                    setFieldValue(
                      "discrepancy",
                      parseFloat(newDiscrepancy.toFixed(10))
                    );
                  } else {
                    setFieldValue("discrepancy", "");
                  }
                }, [
                  arrivalFuel,
                  departureFuel,
                  fob,
                  sg,
                  conversionFactor,
                  meteredUplift,
                  calculatedUplift,
                ]);
                return (
                  <View style={styles.container}>
                    <View style={styles.inputs}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>ARRIVAL FUEL</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("arrivalFuel", value)
                            }
                            value={arrivalFuel}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>DEPARTURE FUEL</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("departureFuel", value)
                            }
                            value={departureFuel}
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
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>CONVERSION FACTOR</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) =>
                              setFieldValue("conversionFactor", value)
                            }
                            value={conversionFactor.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>METERED UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("meteredUplift", value)
                            }
                            value={meteredUplift}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>CALCULATED UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
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
                            style={styles.textInputNonEditable}
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
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#000",
  },
  inputs: {
    padding: 10,
    width: "90%",
    marginTop: 20,
    backgroundColor: "transparet",
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
    width: "45%",
  },
  textInput: {
    height: 30,
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.60)",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    borderRadius: 10,
    borderColor: "rgb(182,0,0)",
    borderWidth: 2,
  },
  textInputNonEditable: {
    height: 32,
    width: "75%",
    backgroundColor: "rgba(255,255,255,0.60)",
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 2,
  },
  unit: {
    fontSize: 16,
    width: "20%",
    textAlign: "left",
    color: "white",
  },
});
