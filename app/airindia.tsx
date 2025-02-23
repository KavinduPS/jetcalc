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

interface AirIndiaProps {
  arrivalFuel: string;
  departureFuel: string;
  calculatedUplift: string;
  meteredUplift: string;
  sg: string;
  actualUplift: string;
  discrepancy: string;
  discrepancyPercent: string;
  departureFuelX: string;
  arrivalFuelY: string;
  xy: string;
}

export default function AirIndiaScreen() {
  const initialFormValues: AirIndiaProps = {
    arrivalFuel: "",
    departureFuel: "",
    calculatedUplift: "",
    meteredUplift: "",
    sg: "",
    actualUplift: "",
    discrepancy: "",
    discrepancyPercent: "",
    departureFuelX: "",
    arrivalFuelY: "",
    xy: "",
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
                  calculatedUplift,
                  meteredUplift,
                  sg,
                  actualUplift,
                  discrepancy,
                  discrepancyPercent,
                  departureFuelX,
                  arrivalFuelY,
                  xy,
                } = values;
                useEffect(() => {
                  if (arrivalFuel && departureFuel) {
                    const newCalculatedUplift =
                      parseFloat(departureFuel) - parseFloat(arrivalFuel);
                    setFieldValue(
                      "calculatedUplift",
                      parseFloat(newCalculatedUplift.toFixed(4))
                    );
                  } else {
                    setFieldValue("calculatedUplift", "");
                  }

                  if (meteredUplift && sg) {
                    const newActualUplift =
                      parseFloat(meteredUplift) * parseFloat(sg);
                    setFieldValue(
                      "actualUplift",
                      parseFloat(newActualUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("actualUplift", "");
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

                  if (
                    discrepancy &&
                    actualUplift &&
                    parseFloat(actualUplift) !== 0
                  ) {
                    const newDiscrepancyPercent =
                      (parseFloat(discrepancy) / parseFloat(actualUplift)) *
                      100;
                    setFieldValue(
                      "discrepancyPercent",
                      parseFloat(newDiscrepancyPercent.toFixed(3))
                    );
                  } else {
                    setFieldValue("discrepancyPercent", "");
                  }

                  if (departureFuelX && arrivalFuelY) {
                    const newXY =
                      parseFloat(departureFuelX) - parseFloat(arrivalFuelY);
                    setFieldValue("xy", parseFloat(newXY.toFixed(10)));
                  } else {
                    setFieldValue("xy", "");
                  }
                }, [
                  arrivalFuel,
                  departureFuel,
                  calculatedUplift,
                  meteredUplift,
                  sg,
                  actualUplift,
                  discrepancy,
                  departureFuelX,
                  arrivalFuelY,
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
                        <Text style={styles.label}>METERED UPLIFT LTS</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("meteredUplift", value)
                            }
                            value={meteredUplift}
                            keyboardType="numeric"
                          />
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
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>ACTUAL UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
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
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>DISCREPANCY %</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) =>
                              setFieldValue("discrepancyPercent", value)
                            }
                            value={discrepancyPercent.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>DEPARTURE FUEL (X)</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("departureFuelX", value)
                            }
                            value={departureFuelX}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>ARRIVAL FUEL (Y)</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("arrivalFuelY", value)
                            }
                            value={arrivalFuelY}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>X-Y</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) => setFieldValue("xy", value)}
                            value={xy.toString()}
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
