import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import EmojiInput from 'react-native-emoji-input';

export default class input extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            emoji: ''
        };
    }

    render() {
        if (!this.state.pressed)
            return (
                <View style={[styles.container, this.props.navigation.state.params.backgroundColor]}>
                    <View style={styles.init}>
                        <Text
                            style={styles.text}
                            onPress={() => {
                                this.setState({ pressed: true })
                            }}
                        >Press here to{"\n"}
                            choose an {"\n"}emoji</Text>
                    </View>
                </View >)

        else return (
            <View style={[styles.container, this.props.navigation.state.params.backgroundColor]}>
                {!this.state.emoji &&
                    <View style={styles.circle}>
                        <Text style={styles.text}>Choose an emoji and press here to{"\n"} confirm</Text>
                    </View>
                }

                {this.state.emoji &&
                    <Text
                        style={styles.emoji}
                        onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate('Compass', { emoji: this.state.emoji, backgroundColor: this.props.navigation.state.params.backgroundColor });
                        }}>
                        {this.state.emoji}
                    </Text>}
                <EmojiInput
                    onEmojiSelected={e =>
                        this.setState({ emoji: e.char })} />

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    init: {
        width: '55%',
        height: '30%',
        borderRadius: 1000,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center'
    },
    circle: {
        marginTop: '10%',
        marginBottom: '5%',
        width: '55%',
        height: '30%',
        borderRadius: 1000,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center'
    },
    emoji: {
        marginTop: '10%',
        marginBottom: '0.5%',
        width: '55%',
        height: '30%',
        textAlign: 'center',
        fontSize: 200
    },
    text: {
        marginTop: '35%',
        textAlign: 'center',
        width: '95%',
        fontSize: 20,
        color: 'white'
    }
})