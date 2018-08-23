import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
                {!this.state.emoji &&
                    <View style={styles.circle}>
                        <Text style={styles.text}>Choose an emoji and press here to confirm</Text>
                    </View>}

                {this.state.emoji &&
                    <Text
                        style={styles.emoji}
                        onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate('Compass', { emoji: this.state.emoji });
                        }}>
                        {this.state.emoji}
                    </Text>}
                <EmojiInput
                    onEmojiSelected={emoji =>
                        this.setState({ emoji: emoji.char })
                    } />

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(147,149,152)',
        alignItems: 'center',
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
        fontSize: 180
    },
    text: {
        marginTop: '40%',
        textAlign: 'center',
        width: '95%',
        fontSize: 20,
        color: 'white'
    }
})