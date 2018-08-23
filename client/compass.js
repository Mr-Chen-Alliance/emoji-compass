import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class compass extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    render() {
        const emoji = this.props.navigation.state.params.emoji
        return (
            <View style={styles.container}>
                <Text style={styles.emoji}>{emoji}</Text>>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(147,149,152)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    emoji: {
        fontSize: 200
    }
})