// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import firebase from '../database/firebase';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';
import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
} from "@invertase/react-native-apple-authentication";

export default class Signup extends Component {

    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            isLoading: false
        }
    }
    onAppleButtonPress = async () => {
        debugger;
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            if (!appleAuthRequestResponse.identityToken) {
                throw 'Apple Sign-In failed - no identify token returned';
            }

            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            debugger;
            // Sign the user in with the credential
            auth().signInWithCredential(appleCredential);
            // user is authenticated
            alert("User is authenticated");
        }
    }

    initUser = (token) => {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' + token)
            .then((response) => {
                response.json().then((json) => {
                    const ID = json.id
                    console.log("ID " + ID); 

                    const EM = json.email
                    console.log("Email " + EM); 

                    const FN = json.first_name
                    console.log("First Name " + FN); 
                })
            })
            .catch(() => {
                console.log('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    onFacebookButtonPress = async () => {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken().then((user) => {
            const { accessToken } = user
            this.initUser(accessToken)

            return user
        });

    if (!data) {
        throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
}
    _signIn = async () => {
        
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '530870938747-eq3rvq0vpvn3e4tgmhe4gpq1cejhq714.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        });
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);        
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential).then(() =>
            this.props.navigation.navigate('Dashboard'), err => {
                console.log('Fetch Error: ', err);
            }
        );
         
    };
    
    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                this.setState({ loggedIn: false });
            } else {
                // some other error
                this.setState({ loggedIn: false });
            }
        }
    };

    registerUser = () => {
        if (this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to signup!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    res.user.updateProfile({
                        displayName: this.state.displayName
                    })
                    console.log('User registered successfully!')
                    this.setState({
                        isLoading: false,
                        displayName: '',
                        email: '',
                        password: ''
                    })
                    this.props.navigation.navigate('Login')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                {/* <TextInput
                    style={styles.inputStyle}
                    placeholder="Name"
                    value={this.state.displayName}
                    onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        width: widthPercentageToDP(48),
                        borderBottomWidth: 1,
                        borderColor: "#777",
                        borderTopWidth:0.3,
                        borderRightWidth: 0.5,
                        borderLeftWidth: 0.5,
                        height: heightPercentageToDP(6),
                        justifyContent: "center"
                    }}
                    onPress={() => this.registerUser()}
                >
                    <Text style={{ alignSelf: "center", fontWeight: "bold", color: "#777" }}>
                    Sign up with Email
                    </Text>
                </TouchableOpacity> */}
            
                
                    <GoogleSigninButton
                        style={{ width: widthPercentageToDP(50), height: heightPercentageToDP(7.5), alignSelf:"center" }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={this._signIn}
                    />
                {/* <LoginButton
                    style={{ width: widthPercentageToDP(48), height: heightPercentageToDP(6), alignSelf: "center" }}
                    onPress={this.onFacebookButtonPress}
                /> */}
                <TouchableOpacity
                    style={{
                        alignSelf: "center",
                        width: widthPercentageToDP(48),
                        borderBottomWidth: 1,
                        borderColor: "#777",
                        backgroundColor: "#007BFB",
                        borderTopWidth: 0.3,
                        borderRightWidth: 0.5,
                        borderLeftWidth: 0.5,
                        height: heightPercentageToDP(6),
                        justifyContent: "center"
                    }}
                    onPress={this.onFacebookButtonPress}
                >
                    <Text style={{ alignSelf: "center", fontWeight: "bold", color: "#fff" }}>
                        Sign up with Facebook
                    </Text>
                </TouchableOpacity>
                {
                    Platform.OS === "ios" &&
                    <AppleButton
                        buttonStyle={AppleButton.Style.WHITE}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                            alignSelf: "center",
                            width: widthPercentageToDP(48),
                            height: heightPercentageToDP(6),
                            justifyContent: "center"
                        }}
                        // style={{ width: widthPercentageToDP(50), height: heightPercentageToDP(7.5), alignSelf: "center" }}

                        onPress={() => this.onAppleButtonPress()}
                    />
                }
                
                {/* <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Already Registered? Click here to login
        </Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});