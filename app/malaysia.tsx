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

interface MalaysiaProps {
  totalBeforeFueling: string;
  uplift: string;
  departure: string;
  upliftLts: string;
  sg: string;
  bowserUplift: string;
  minSecFuel: string;
  departureGauge: string;
  discrepancy: string;
}

export default function MalaysiaScreen() {
  const initialFormValues: MalaysiaProps = {
    totalBeforeFueling: "",
    uplift: "",
    departure: "",
    upliftLts: "",
    sg: "",
    bowserUplift: "",
    minSecFuel: "",
    departureGauge: "",
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
                  totalBeforeFueling,
                  uplift,
                  departure,
                  upliftLts,
                  sg,
                  bowserUplift,
                  minSecFuel,
                  departureGauge,
                  discrepancy,
                } = values;
                useEffect(() => {
                  if (departure && totalBeforeFueling) {
                    const newUplift =
                      parseFloat(departure) - parseFloat(totalBeforeFueling);
                    setFieldValue("uplift", parseFloat(newUplift.toFixed(10)));
                  } else {
                    setFieldValue("uplift", "");
                  }

                  if (upliftLts && sg) {
                    const newBowserUplift =
                      parseFloat(upliftLts) * parseFloat(sg);
                    setFieldValue(
                      "bowserUplift",
                      parseFloat(newBowserUplift.toFixed(10))
                    );
                  } else {
                    setFieldValue("bowserUplift", "");
                  }

                  if (departureGauge && departure) {
                    const newDiscrepancy =
                      parseFloat(departureGauge) - parseFloat(departure);
                    setFieldValue(
                      "discrepancy",
                      parseFloat(newDiscrepancy.toFixed(10))
                    );
                  } else {
                    setFieldValue("discrepancy", "");
                  }
                }, [
                  departure,
                  totalBeforeFueling,
                  upliftLts,
                  sg,
                  departureGauge,
                ]);
                return (
                  <View style={styles.container}>
                    <View style={styles.inputs}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>
                          TOTAL FUEL BEFORE FUELING
                        </Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("totalBeforeFueling", value)
                            }
                            value={totalBeforeFueling}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) =>
                              setFieldValue("uplift", value)
                            }
                            value={uplift.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>DEPARTURE</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("departure", value)
                            }
                            value={departure}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>UPLIFT LTS</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("upliftLts", value)
                            }
                            value={upliftLts}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>l</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>S.G/DENSITY</Text>
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
                        <Text style={styles.label}>BOWSER UPLIFT</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInputNonEditable}
                            onChangeText={(value) =>
                              setFieldValue("bowserUplift", value)
                            }
                            value={bowserUplift.toString()}
                            keyboardType="numeric"
                            editable={false}
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <Text style={styles.separatorText}>
                        TO BE FILLED BY THE TECH CREW
                      </Text>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>MIN SECTOR FUEL</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("minSecFuel", value)
                            }
                            value={minSecFuel}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>DEPARTURE GAUGE</Text>
                        <View style={styles.inputAndUnit}>
                          <TextInput
                            style={styles.textInput}
                            onChangeText={(value) =>
                              setFieldValue("departureGauge", value)
                            }
                            value={departureGauge}
                            keyboardType="numeric"
                          />
                          <Text style={styles.unit}>kg</Text>
                        </View>
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>UPLIFT DISCREPANCY</Text>
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
  separatorText: {
    marginVertical: 20,
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  inputAndUnit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "45%",
  },
  textInput: {
    height: 32,
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
