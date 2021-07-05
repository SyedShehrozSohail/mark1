// components/dashboard.js

import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../database/firebase';
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }
    componentDidMount = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({
                displayName: userInfo?.user?.name ? userInfo.user.name : "",
                uid: userInfo?.user?.id ? userInfo.user.id : "",
            });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                this.setState({ loggedIn: false });
            } else {
                this.setState({ loggedIn: false });
            }
        }
    }
    
    // signOut = () => {
    //     firebase.auth().signOut().then(() => {
    //         this.props.navigation.navigate('Login')
    //     })
    //         .catch(error => this.setState({ errorMessage: error.message }))
    // }
    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut().then(() => {
            this.props.navigation.navigate('Signup')
        })
            .catch(error => this.setState({ errorMessage: error.message }));
        } catch (error) {
            console.error(error);
        }
    };
    render() {
        // this.state = {
        //     displayName: GoogleSignin.signInSilently()?.user?.givenName ? GoogleSignin.signInSilently().user.givenName: "" ,
        //     uid: "firebase.auth().currentUser.uid"
        // }
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Hello, {this.state.displayName}
                </Text>

                <Button
                    color="#3740FE"
                    title="Logout"
                    onPress={() => this.signOut()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    }
});