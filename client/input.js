import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import { Font } from 'expo';


export default class input extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello World!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(128,130,133)',
        alignItems: 'center',
        justifyContent: 'center'
    }
})