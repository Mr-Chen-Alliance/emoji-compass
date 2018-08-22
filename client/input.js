import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TextInput } from 'react-native';
import { Font } from 'expo';
import EmojiInput from 'react-native-emoji-input';

export default class input extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = { emoji: '' };
    }


    render() {
        return (
            <View style={styles.container}>

                <View style={styles.circle}>
                    {/* <TextInput style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1
                    }}
                        onChangeText={(emoji) => this.setState({ emoji })} value={this.state.emoji} /> */}
                    <Text>
                        {this.state.emoji}
                    </Text>

                </View>
                <View style={styles.instruction}>
                    <Text style={styles.text}>Touch the circle area above to choose your
                            own emoji and navigate your location</Text>
                </View>
                <EmojiInput
                    onEmojiSelected={emoji =>
                        this.setState({ emoji })} />

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(147,149,152)',
        alignItems: 'center',
        // justifyContent: 'center'
    },
    circle: {
        marginTop: '35%',
        width: '55%',
        height: '30%',
        borderRadius: 500,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center'
    },
    instruction: {
        marginTop: '30%',
        width: '90%',
        height: 100
    },
    text: {
        marginTop: '8%',
        textAlign: 'center',
        height: 50,
        width: '100%',
        fontSize: 17,
        color: 'white'
    }
})