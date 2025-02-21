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

interface GulfAirProps {
  requiredFuel: string;
  qtyBeforeRefuel: string;
  requiredUplift: string;
  meteredUpliftLts: string;
  sg: string;
  arrivalFuel: string;
  meteredUpliftKg: string;
  departureFuel: string;
  fog: string;
  discrepancy: string;
}

export default function GulfAirScreen() {
  const initialFormValues: GulfAirProps = {
    requiredFuel: "",
    qtyBeforeRefuel: "",
    requiredUplift: "",
    meteredUpliftLts: "",
    sg: "",
    arrivalFuel: "",
    meteredUpliftKg: "",
    departureFuel: "",
    fog: "",
    discrepancy: "",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
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
                requiredFuel,
                qtyBeforeRefuel,
                requiredUplift,
                meteredUpliftLts,
                sg,
                arrivalFuel,
                meteredUpliftKg,
                departureFuel,
                fog,
                discrepancy,
              } = values;
              useEffect(() => {
                if (requiredFuel && qtyBeforeRefuel) {
                  const newRequiredUplift =
                    parseFloat(requiredFuel) - parseFloat(qtyBeforeRefuel);
                  setFieldValue(
                    "requiredUplift",
                    parseFloat(newRequiredUplift.toFixed(4))
                  );
                } else {
                  setFieldValue("requiredUplift", "");
                }

                if (sg && meteredUpliftLts) {
                  const newMeteredUpliftKg =
                    parseFloat(meteredUpliftLts) * parseFloat(sg);
                  setFieldValue(
                    "meteredUpliftKg",
                    parseFloat(newMeteredUpliftKg.toFixed(4))
                  );
                } else {
                  setFieldValue("meteredUpliftKg", "");
                }

                if (arrivalFuel && qtyBeforeRefuel) {
                  const newFog =
                    parseFloat(arrivalFuel) - parseFloat(qtyBeforeRefuel);
                  setFieldValue("fog", parseFloat(newFog.toFixed(10)));
                } else {
                  setFieldValue("fog", "");
                }

                if (meteredUpliftKg && departureFuel && arrivalFuel && fog) {
                  const newDiscrepancy =
                    parseFloat(meteredUpliftKg) -
                    (parseFloat(departureFuel) - parseFloat(arrivalFuel)) -
                    parseFloat(fog);
                  setFieldValue(
                    "discrepancy",
                    parseFloat(newDiscrepancy.toFixed(10))
                  );
                } else {
                  setFieldValue("discrepancy", "");
                }
              }, [
                requiredFuel,
                qtyBeforeRefuel,
                sg,
                meteredUpliftLts,
                arrivalFuel,
                meteredUpliftKg,
                departureFuel,
                fog,
              ]);
              return (
                <View style={styles.container}>
                  <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>REQUIRED FUEL</Text>
                      <View style={styles.inputAndUnit}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(value) =>
                            setFieldValue("requiredFuel", value)
                          }
                          value={requiredFuel}
                          keyboardType="numeric"
                        />
                        <Text style={styles.unit}>kg</Text>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>QUANTITY BEFORE REFUEL</Text>
                      <View style={styles.inputAndUnit}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(value) =>
                            setFieldValue("qtyBeforeRefuel", value)
                          }
                          value={qtyBeforeRefuel}
                          keyboardType="numeric"
                        />
                        <Text style={styles.unit}>kg</Text>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>REQUIRED UPLIFT</Text>
                      <View style={styles.inputAndUnit}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(value) =>
                            setFieldValue("requiredUplift", value)
                          }
                          value={requiredUplift.toString()}
                          keyboardType="numeric"
                          editable={false}
                        />
                        <Text style={styles.unit}>kg</Text>
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>METERED UPLIFT (LTS)</Text>
                      <View style={styles.inputAndUnit}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(value) =>
                            setFieldValue("meteredUpliftLts", value)
                          }
                          value={meteredUpliftLts}
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
                      <Text style={styles.label}>METERED UPLIFT (KG)</Text>
                      <View style={styles.inputAndUnit}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(value) =>
                            setFieldValue("meteredUpliftKg", value)
                          }
                          value={meteredUpliftKg.toString()}
                          keyboardType="numeric"
                          editable={false}
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
                      <Text style={styles.label}>FUEL USED ON GROUND</Text>
                      <View style={styles.inputAndUnit}>
                        <TextInput
                          style={styles.textInput}
                          onChangeText={(value) => setFieldValue("fog", value)}
                          value={fog.toString()}
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
                  </View>
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  },
  inputContainer: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    width: "60%",
    fontSize: 20,
  },
  inputAndUnit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
  },
  textInput: {
    height: 40,
    width: "75%",
    backgroundColor: "#EEE",
    fontSize: 20,
    textAlign: "center",
    borderRadius: 10,
  },
  unit: {
    fontSize: 20,
    width: "20%",
    textAlign: "left",
  },
});
