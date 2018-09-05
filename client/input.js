import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import EmojiInput from 'react-native-emoji-input';
import triangleImg from '../public/img/triangle.png';

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
            scroll: new Animated.Value(0),
            triangle: new Animated.Value(0)
        };
    }

    componentDidMount(){
        this.runAnimation();
    }

    componentWillUnmount(){
        this.state.triangle.stopAnimation()
    }

    runAnimation(){
        Animated.timing(this.state.triangle, {
            toValue: -5,
            duration: 1000,
            easing: Easing.linear
        }).start(()=>{
            Animated.timing(this.state.triangle, {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear
            }).start(()=>{
                this.runAnimation();
            })
        })
    }


    render() {
        const { scroll, triangle } = this.state;
            return (
                <TouchableOpacity style={[styles.container, this.props.navigation.state.params.backgroundColor]} 
                                  activeOpacity={1}
                                  onPress={()=> {
                                    this.setState({ pressed: false });
                                    Animated.timing(scroll,{toValue: 0, duration: 500}).start();
                                  }}>

                    <TouchableOpacity
                            style={styles.init}
                            onPress={() => {
                                if(!this.state.pressed){
                                    this.setState({ pressed: true });
                                    Animated.timing(scroll,{toValue: -330, duration: 500}).start()
                                }else{
                                    this.setState({ pressed: false });
                                    Animated.timing(scroll,{toValue: 0, duration: 500}).start();
                                }
                            }}>

                        {this.state.emoji!=''&&<Text style={styles.emoji}
                                                     onPress={() => {
                                                              const { navigate } = this.props.navigation;
                                                              navigate('Compass', { emoji: this.state.emoji, backgroundColor: this.props.navigation.state.params.backgroundColor, fontColor: this.props.navigation.state.params.fontColor})
                                                              }}>{this.state.emoji}</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.triangle}
                        onPress={() => {
                            this.setState({ pressed: true });
                            Animated.timing(scroll,{toValue: -330, duration: 500}).start()
                        }}
                    >
                        <Animated.Image style={{transform: [{translateY: triangle}]}} source={triangleImg}/>

                    </TouchableOpacity>
                    
                    <Animated.View style={{
                        position: 'absolute',
                        transform: [{translateY: scroll}], height: '50%', width: '100%', top: '100%'
                    }}>
                        <EmojiInput
                            onEmojiSelected={e =>
                                this.setState({ emoji: e.char })} />
                    </Animated.View>

                </TouchableOpacity >)
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
        top: '-20%',
        bottom: '10%'
    },
    emoji: {
        marginTop: '-6%',
        marginLeft: '6%',
        fontSize: 210,
        textAlign: 'center'
    },
    triangle: {
        height: '10%',
        width: '30%', top: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})