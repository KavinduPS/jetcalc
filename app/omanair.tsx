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

interface OmanAirProps {
  arrivalFuel: string;
  fbr: string;
  fog: string;
  totalRDF: string;
  meteredFuel: string;
  sg: string;
  conversionFactor: string;
  meteredUplift: string;
  totalOnboard: string;
  actualUplift: string;
  discrepancy: string;
}

export default function OmanAirScreen() {
  const initialFormValues: OmanAirProps = {
    arrivalFuel: "",
    fbr: "",
    fog: "",
    totalRDF: "",
    meteredFuel: "",
    sg: "",
    conversionFactor: "",
    meteredUplift: "",
    totalOnboard: "",
    actualUplift: "",
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
                  fbr,
                  fog,
                  totalRDF,
                  meteredFuel,
                  sg,
                  conversionFactor,
                  meteredUplift,
                  totalOnboard,
                  actualUplift,
                  discrepancy,
                } = values;
                useEffect(() => {
                  if (arrivalFuel && fbr) {
                    const newFog = parseFloat(arrivalFuel) - parseFloat(fbr);
                    setFieldValue("fog", parseFloat(newFog.toFixed(10)));
                  } else {
                    setFieldValue("fog", "");
                  }

                  if (sg && parseFloat(sg) !== 0) {
                    const newConversionFactor = 1 / parseFloat(sg);
                    setFieldValue(
                      "conversionFactor",
                      parseFloat(newConversionFactor.toFixed(4))
                    );
                  } else {
                    setFieldValue("conversionFactor", "");
                  }

                  if (meteredFuel && conversionFactor) {
                    const newMeteredUplift =
                      parseFloat(meteredFuel) / parseFloat(conversionFactor);
                    setFieldValue(
                      "meteredUplift",
                      parseFloat(newMeteredUplift.toFixed())
                    );
                  } else {
                    setFieldValue("meteredUplift", "");
                  }

                  if (fbr && totalOnboard) {
                    const newActualUplift =
                      parseFloat(totalOnboard) - parseFloat(fbr);
                    setFieldValue(
                      "actualUplift",
                      parseFloat(newActualUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("actualUplift", "");
                  }

                  if (actualUplift && meteredUplift) {
                    const newDiscrepancy =
                      ((parseFloat(meteredUplift) - parseFloat(actualUplift)) /
                        parseFloat(actualUplift)) *
                      100;
                    setFieldValue(
                      "discrepancy",
                      parseFloat(newDiscrepancy.toFixed(3))
                    );
                  } else {
                    setFieldValue("discrepancy", "");
                  }
                }, [
                  arrivalFuel,
                  fbr,
                  fog,
                  totalRDF,
                  meteredFuel,
                  sg,
                  conversionFactor,
                  meteredUplift,
                  totalOnboard,
                  actualUplift,
                  discrepancy,
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
                        <Text style={styles.label}>
                          FUEL FIG BEFORE REFUELING
                        </Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("fbr", value)
                            }
                            value={fbr}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>FUEL USED ON GROUND</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("fog", value)
                            }
                            value={fog.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>TOTAL REQ DEP FUEL</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("totalRDF", value)
                            }
                            value={totalRDF}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>METERED FUEL</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("meteredFuel", value)
                            }
                            value={meteredFuel}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>l</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>REFUELING S.G</Text>
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
                            style={styles.textInput}
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
                            value={meteredUplift.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                          TOTAL ONBOARD (ECAM OR ECAS)
                        </Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("totalOnboard", value)
                            }
                            value={totalOnboard}
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
                          <Text style={styles.unit}>%</Text>
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
