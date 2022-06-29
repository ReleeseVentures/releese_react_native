import * as Font from 'expo-font';
import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import AppNavigator from './app/AppNavigator';
import AppLoading from 'expo-app-loading';
import { LogBox } from 'react-native';
import { ThemeProvider } from 'react-native-ios-kit';

enableScreens();


//This removes UI warnings, comment out when working on development
//LogBox.ignoreAllLogs();

const getFonts = () => {
    return Font.loadAsync({
        'mulish-bold': require('./assets/fonts/Mulish-Bold.ttf'),
        'mulish-semibold': require('./assets/fonts/Mulish-SemiBold.ttf'),
        'mulish-medium': require('./assets/fonts/Mulish-Medium.ttf'),
        'mulish-regular': require('./assets/fonts/Mulish-Regular.ttf'),
        'mulish-light': require('./assets/fonts/Mulish-Light.ttf'),
    })
}

export default function App() {

    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);


    if (fontsLoaded) {
        return (
            <ThemeProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppNavigator />
                </PersistGate>
            </Provider>
            </ThemeProvider>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={() => null}
            />
        )
    }
};

