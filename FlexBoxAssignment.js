import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.bigWidget}>
                            <View>
                                <Text> Good Financial </Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.row}>
                        <TouchableOpacity style={styles.widgets}>
                            <View>
                                <Text>
                                    Send Money
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.widgets}>
                            <View><Text> Pay Items </Text></View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.widgets}>
                            <View><Text> Top Up </Text></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.widgets}>
                            <View><Text> Request Money </Text></View>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        height: 120,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15
    },
    widgets: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        width: '44%',
        marginLeft: 15,
        marginRight: 15
    },
    bigWidget: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        elevation: 2,
        width: '96%',
        marginLeft: 15,
        marginRight: 15
    }
})

export default App;