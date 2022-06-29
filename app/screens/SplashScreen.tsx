import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import * as Analytics from 'expo-firebase-analytics';

const firebaseConfig = {
    clientId: '990688668366-hokgo2votf2p5i1qo1flc5f3g2hqaapj.apps.googleusercontent.com',
//appId: '',
apiKey: 'AIzaSyCnLDIkeuYrceEq_Fv1TxU3n5Aug2FzAI0',
//databaseURL: '',
storageBucket: 'releese-24538.appspot.com',
//messagingSenderId: '',
projectId: 'releese-24538',
  };
  
  const app = initializeApp(firebaseConfig);

  Analytics.logEvent('screen_view', { "currentScreen" : 4});


// app.initializeApp({
//     //other config
//    measurementId : process.env.REACT_APP_MEASUREMENT_ID,
//    appId : process.env.REACT_APP_DEV_ID
//  })
 
 //put inside your constructor
 


const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/Logo.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34d5eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SplashScreen;
