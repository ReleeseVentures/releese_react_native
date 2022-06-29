import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import BackArrow from "../../../components/BackArrow";

export const TermsOfUseOptions = {
    headerLeft: () => <BackArrow btnColor='#34d5eb' />,
    title: 'Terms of use',
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: '#ffffff',
    },
    headerTitleStyle: {
        fontSize: 14,
        marginLeft: Platform.OS === 'ios' ? -150 : -16,
        fontFamily: 'mulish-semibold'
    }
};

const TermsOfUse: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titlePrimary}>General Terms {'&'} Conditions</Text>

            <Text style={styles.titleSecondary}>Terms and conditions</Text>

            <View>
                <Text style={styles.termsText}>Welcome to Website Name!</Text>

                <Text style={styles.termsText}>These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.</Text>

                <Text style={styles.termsText}>By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.</Text>

                <Text style={styles.termsText}>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Text>

                <Text style={styles.titleTerc}>Cookies</Text>

                <Text style={styles.termsText}>We employ the use of cookies. By accessing Website Name, you agreed to use cookies in agreement with the Company Name's Privacy Policy.</Text>

                <Text style={styles.termsText}>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 16,
        paddingRight: 16
    },

    titlePrimary: {
        alignSelf: 'center',
        marginTop: 8,
        fontSize: 24,
        marginBottom: 40,
        width: 240,
        textAlign: 'center',
        fontFamily: 'mulish-semibold'
    },

    titleSecondary: {
        marginTop: 40,
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'mulish-regular'
    },

    titleTerc: {
        marginTop: 24,
        marginBottom: 16,
        fontSize: 16,
        fontFamily: 'mulish-regular'
    },

    termsText: {
        marginBottom: 24,
        fontSize: 14,
        opacity: 0.5,
        fontFamily: 'mulish-regular'
    }

});

export default TermsOfUse;