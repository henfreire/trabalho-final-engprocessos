import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View, StatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./src/routing/Navigation";
import store, { persistor } from "./src/config/configuredStore";
import "./src/config/axios";
import "./src/utils/window";

import * as Notifications from "expo-notifications";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
    },
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
  }),
});

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={styles.container}>
                    <StatusBar hidden />
                    <Navigation />
                </View>
            </PersistGate>
        </Provider>
    );
}