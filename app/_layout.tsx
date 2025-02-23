import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="srilankan"
          options={{
            title: "SriLankan Airlines",
            headerStyle: { backgroundColor: "rgb(28,28,28)" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="gulfair"
          options={{
            title: "Gulf Air",
            headerStyle: { backgroundColor: "rgb(28,28,28)" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="qatar"
          options={{
            title: "Qatar Airways",
            headerStyle: { backgroundColor: "rgb(28,28,28)" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="omanair"
          options={{
            title: "Oman Air",
            headerStyle: { backgroundColor: "rgb(28,28,28)" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="airindia"
          options={{
            title: "Air India",
            headerStyle: { backgroundColor: "rgb(28,28,28)" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
