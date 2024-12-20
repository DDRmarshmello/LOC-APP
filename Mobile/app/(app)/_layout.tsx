import {
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Redirect, Stack, Tabs } from "expo-router";
import { useAuth } from "~/services/AuthContext";
import { useColorScheme } from "~/lib/useColorScheme";
import { PhotoProvider } from "~/services/PhotoContext";
import { EventProvider } from "~/services/EventContext";

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  const { isDarkColorScheme } = useColorScheme();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, styles.horizontal]}
        className="bg-white dark:bg-gray-800"
      >
        <ActivityIndicator
          size="large"
          color={isDarkColorScheme ? "#fafafa" : "#0284c7"}
        />
      </SafeAreaView>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user?.token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <PhotoProvider>
      <EventProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="cam"
            options={{
              title: "Settings",
              headerShown: false,
            }}
          />
          <Stack.Screen name="newItems" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ headerShown: false }} />
        </Stack>
      </EventProvider>
    </PhotoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
