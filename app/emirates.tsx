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

interface EmiratesProps {
  arrivalFOB: string;
  fog: string;
  fobPreRefuel: string;
  reqDepartureFuel: string;
  reqUplift: string;
  sg: string;
  bowserUpliftLts: string;
  actualUplift: string;
  fobDeparture: string;
  calcFobDiff: string;
  discrepancy: string;
  discrepancyPercent: string;
}

export default function EmiratesScreen() {
  const initialFormValues: EmiratesProps = {
    arrivalFOB: "",
    fog: "",
    fobPreRefuel: "",
    reqDepartureFuel: "",
    reqUplift: "",
    sg: "",
    bowserUpliftLts: "",
    actualUplift: "",
    fobDeparture: "",
    calcFobDiff: "",
    discrepancy: "",
    discrepancyPercent: "",
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
                  arrivalFOB,
                  fog,
                  fobPreRefuel,
                  reqDepartureFuel,
                  reqUplift,
                  sg,
                  bowserUpliftLts,
                  actualUplift,
                  fobDeparture,
                  calcFobDiff,
                  discrepancy,
                  discrepancyPercent,
                } = values;
                useEffect(() => {
                  if (arrivalFOB && fobPreRefuel) {
                    const newFog =
                      parseFloat(arrivalFOB) - parseFloat(fobPreRefuel);
                    setFieldValue("fog", parseFloat(newFog.toFixed(4)));
                  } else {
                    setFieldValue("fog", "");
                  }

                  if (reqDepartureFuel && fobPreRefuel) {
                    const newReqUplift =
                      parseFloat(reqDepartureFuel) - parseFloat(fobPreRefuel);
                    setFieldValue(
                      "reqUplift",
                      parseFloat(newReqUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("reqUplift", "");
                  }

                  if (sg && bowserUpliftLts) {
                    const newActualUplift =
                      parseFloat(sg) * parseFloat(bowserUpliftLts);
                    setFieldValue(
                      "actualUplift",
                      parseFloat(newActualUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("actualUplift", "");
                  }

                  if (fobDeparture && fobPreRefuel) {
                    const newCalcFobDiff =
                      parseFloat(fobDeparture) - parseFloat(fobPreRefuel);
                    setFieldValue(
                      "calcFobDiff",
                      parseFloat(newCalcFobDiff.toFixed(10))
                    );
                  } else {
                    setFieldValue("calcFobDiff", "");
                  }

                  if (actualUplift && calcFobDiff) {
                    const newDiscrepancy =
                      parseFloat(actualUplift) - parseFloat(calcFobDiff);
                    setFieldValue(
                      "discrepancy",
                      parseFloat(newDiscrepancy.toFixed(10))
                    );
                  } else {
                    setFieldValue("discrepancy", "");
                  }

                  if (
                    calcFobDiff &&
                    parseFloat(calcFobDiff) !== 0 &&
                    discrepancy
                  ) {
                    const newDiscrepancyPercent =
                      (parseFloat(discrepancy) / parseFloat(calcFobDiff)) * 100;
                    setFieldValue(
                      "discrepancyPercent",
                      parseFloat(newDiscrepancyPercent.toFixed(3))
                    );
                  } else {
                    setFieldValue("discrepancyPercent", "");
                  }
                }, [
                  arrivalFOB,
                  fobPreRefuel,
                  reqDepartureFuel,
                  sg,
                  bowserUpliftLts,
                  actualUplift,
                  fobDeparture,
                  calcFobDiff,
                  discrepancy,
                  discrepancyPercent,
                ]);
                return (
                  <View style={styles.container}>
                    <View style={styles.inputs}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>ARRIVAL FOB</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("arrivalFOB", value)
                            }
                            value={arrivalFOB}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>FUEL USED ON GROUND</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
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
                        <Text style={styles.label}>
                          INDICATED FOB PRE-REFUEL
                        </Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("fobPreRefuel", value)
                            }
                            value={fobPreRefuel}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                          REQUIRED DEPARTURE FUEL
                        </Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("reqDepartureFuel", value)
                            }
                            value={reqDepartureFuel}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>REQUIRED UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) =>
                              setFieldValue("reqUplift", value)
                            }
                            value={reqUplift.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>FUEL S.G</Text>
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
                        <Text style={styles.label}>BOWSER UPLIFT LTS</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("bowserUpliftLts", value)
                            }
                            value={bowserUpliftLts}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>l</Text>
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
                        <Text style={styles.label}>
                          INDICATED FOB DEPARTURE
                        </Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("fobDeparture", value)
                            }
                            value={fobDeparture}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>CALCULATED FOB DIFF</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) =>
                              setFieldValue("calcFobDiff", value)
                            }
                            value={calcFobDiff.toString()}
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
