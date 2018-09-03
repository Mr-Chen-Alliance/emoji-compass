import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Font } from 'expo';
import EmojiInput from 'react-native-emoji-input';

export default class input extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            isItalicLoaded: false,
            emoji: '',
            scroll: new Animated.Value(0)
        };
    }

    componentDidMount(){
        Font.loadAsync({ 'AvenirNextItalic': require('../public/fonts/AvenirNextItalic.ttf') })
            .then(() => {
                this.setState({ isItalicLoaded: true })
            })
    }

    render() {
        const { isItalicLoaded } = this.state;
        const { scroll } = this.state;
            return (
                <View style={[styles.container, this.props.navigation.state.params.backgroundColor]}>
                    <TouchableOpacity
                            style={styles.init}
                            onPress={() => {
                                !this.state.pressed?this.setState({ pressed: true }):this.setState({ pressed: false });
                                !this.state.pressed?
                                    Animated.timing(scroll,{toValue: -360, duration: 500}).start():
                                    Animated.timing(scroll,{toValue: 0, duration: 500}).start();
                            }}>
                            
                        {this.state.emoji!=''&&<Text style={[styles.emoji, {fontSize: 210}]}
                                                     onPress={() => {
                                                              const { navigate } = this.props.navigation;
                                                              navigate('Compass', { emoji: this.state.emoji, backgroundColor: this.props.navigation.state.params.backgroundColor, fontColor: this.props.navigation.state.params.fontColor})
                                                              }}>{this.state.emoji}</Text>}
                    </TouchableOpacity>

                    <Text style={[styles.text, isItalicLoaded && {fontFamily: 'AvenirNextItalic'}, this.props.navigation.state.params.fontColor]}>
                            Touch the circle area above to choose{"\n"}your favorite emoji 😃
                    </Text>
                    
                    <Animated.View style={{
                        position: 'absolute',
                        transform: [{translateY: scroll}], height: '55%', width: '100%', top: '100%'
                    }}>
                        <EmojiInput
                            onEmojiSelected={e =>
                                this.setState({ emoji: e.char })} />
                    </Animated.View>

                </View >)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    init: {
        width: '61%',
        height: '35%',
        borderRadius: 1000,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
        top: '-23%',
        bottom: '10%'
    },
    emoji: {
        marginTop: '-6%',
        marginLeft: '6%',
        width: '100%',
        height: 250,
        textAlign: 'center'
    },
    text: {
        top: '5%',
        textAlign: 'center',
        width: '95%',
        fontSize: 20
    }
})