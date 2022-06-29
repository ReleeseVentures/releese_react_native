import React from "react"
import { View, Text, StyleSheet, Platform } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import BackArrow from "../../../components/BackArrow";

export const PrivacyPolicyOptions = {
    headerLeft: () => <BackArrow btnColor='#34d5eb' />,
    title: 'Privacy policy',
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

const PrivacyPolicy: React.FC = () => {

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titlePrimary}>Privacy policy</Text>

            <View>
                <Text style={styles.privacyText}>**Privacy Policy**</Text>

                <Text style={styles.privacyText}>Reroot built the Releese app as an Ad Supported app. This SERVICE is provided by Reroot at no cost and is intended for use as is.</Text>

                <Text style={styles.privacyText}>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</Text>

                <Text style={styles.privacyText}>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</Text>

                <Text style={styles.privacyText}>The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at My Pals unless otherwise defined in this Privacy Policy.</Text>

                <Text style={styles.privacyText}>**Information Collection and Use**</Text>

                <Text style={styles.privacyText}>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Location. The information that we request will be retained by us and used as described in this privacy policy.</Text>

                <Text style={styles.privacyText}>The app does use third party services that may collect information used to identify you.</Text>

                <Text style={styles.privacyText}>Link to privacy policy of third party service providers used by the app</Text>

                <Text style={styles.privacyText}>*   [Google Play Services](https://www.google.com/policies/privacy/)</Text>
                <Text style={styles.privacyText}>*   [Google Analytics for Firebase](https://firebase.google.com/policies/analytics)</Text>
                <Text style={styles.privacyText}>*   [Facebook](https://www.facebook.com/about/privacy/update/printable)</Text>

                <Text style={styles.privacyText}>**Log Data**</Text>

                <Text style={styles.privacyText}>We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</Text>

                <Text style={styles.privacyText}>**Cookies**</Text>

                <Text style={styles.privacyText}>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.</Text>

                <Text style={styles.privacyText}>This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</Text>

                <Text style={styles.privacyText}>**Service Providers**</Text>

                <Text style={styles.privacyText}>We may employ third-party companies and individuals due to the following reasons:</Text>

                <Text style={styles.privacyText}>*   To facilitate our Service;</Text>
                <Text style={styles.privacyText}>*   To provide the Service on our behalf;</Text>
                <Text style={styles.privacyText}>*   To perform Service-related services; or</Text>
                <Text style={styles.privacyText}>*   To assist us in analyzing how our Service is used.</Text>

                <Text style={styles.privacyText}>We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.</Text>

                <Text style={styles.privacyText}>**Security**</Text>

                <Text style={styles.privacyText}>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</Text>

                <Text style={styles.privacyText}>**Links to Other Sites**</Text>

                <Text style={styles.privacyText}>This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</Text>

                <Text style={styles.privacyText}>**Children’s Privacy**</Text>

                <Text style={styles.privacyText}>These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13\. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</Text>

                <Text style={styles.privacyText}>**Changes to This Privacy Policy**</Text>

                <Text style={styles.privacyText}>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</Text>

                <Text style={styles.privacyText}>This policy is effective as of 2021-01-01</Text>

                <Text style={styles.privacyText}>**Contact Us**</Text>

                <Text style={styles.privacyText}>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at [App contact information].</Text>

                <Text style={styles.privacyText}>This privacy policy page was created at [privacypolicytemplate.net](https://privacypolicytemplate.net) and modified/generated by [App Privacy Policy Generator](https://app-privacy-policy-generator.firebaseapp.com/)</Text>
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
        fontFamily: 'mulish-semibold'
    },

    privacyText: {
        marginBottom: 24,
        fontSize: 14,
        opacity: 0.5,
        fontFamily: 'mulish-regular'
    }

});

export default PrivacyPolicy;