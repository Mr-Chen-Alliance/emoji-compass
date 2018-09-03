import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Animated, Easing, Image, TouchableOpacity } from 'react-native';
import { Constants, Permissions, Font } from 'expo';

export default class compass extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {
            errorMessage: null,
            heading: null,
            isBoldItalicLoaded: false,
            isItalicLoaded: false
        };
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    componentDidMount() {
        Font.loadAsync({ 'AvenirNextBoldItalic': require('../public/fonts/AvenirNextBoldItalic.ttf') })
            .then(() => {
                this.setState({ isBoldItalicLoaded: true })
            })
        Font.loadAsync({ 'AvenirNextItalic': require('../public/fonts/AvenirNextItalic.ttf') })
            .then(() => {
                this.setState({ isItalicLoaded: true })
            })
    }

    componentWillUpdate() {
        this.spin()
    }

    componentWillUnmount() {
        Expo.Location.watchHeadingAsync();
    }

    spin() {
        let start = JSON.stringify(this.spinValue);
        let heading = Math.round(this.state.heading);

        let rot = +start;
        let rotM = rot % 360;

        rot += (heading - rotM)

        Animated.timing(
            this.spinValue,
            {
                toValue: rot,
                duration: 300,
                easing: Easing.easeInOut
            }
        ).start()
    }

    _getLocationAsync = async () => {
        // Checking device location permissions
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        else {
            Expo.Location.watchHeadingAsync((obj) => {
                let heading = obj.magHeading;
                this.setState({ heading: heading })
            })
        }
    };
    render() {
        let text = 'Waiting...';
        const emoji = this.props.navigation.state.params.emoji;
        const { isBoldItalicLoaded, isItalicLoaded } = this.state;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.heading) {
            text = JSON.stringify(this.state.heading);
        }

        const spin = this.spinValue.interpolate({
            inputRange: [0, 360],
            outputRange: ['-0deg', '-360deg']
        })

        text = Math.round(JSON.stringify(this.spinValue))

        if (text < 0)
            text += 360
        if (text > 360)
            text %= 360

        return (
            <View style={[styles.container, this.props.navigation.state.params.backgroundColor]}>
                <Animated.View
                    style={{
                        flexDirection: 'column',
                        height: '50%', width: '80%',
                        transform: [{ rotate: spin }],
                        alignItems: 'center', justifyContent: 'center'
                    }} >
                    <View style={{ height: 40, width: 40, borderRadius: 50, backgroundColor: 'rgb(239,65,54)', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 30, color: '#E6E7E8'
                        }}>N</Text>
                    </View>
                    <View style={{ width: '100%', height: '80%', alignItems: 'center' }}><Text style={{ height: '100%', fontSize: 210 }}>{emoji}</Text></View>
                </Animated.View>
                <View style={{ flexDirection: 'row', width: '100%', height: 120, top: '20%' }}>
                    <View style={{ flexDirection: 'row', width: '75%' }}>
                        <Text style={[styles.text, isBoldItalicLoaded && { fontFamily: 'AvenirNextBoldItalic' },this.props.navigation.state.params.fontColor]}>{text + '°'}</Text>
                        <Text style={[isItalicLoaded && { top: '24%', marginLeft: '-14%', fontFamily: 'AvenirNextItalic', fontSize: 40 },this.props.navigation.state.params.fontColor]}>
                            {text >= 339 || text <= 22 ? 'N' : text >= 23 && text <= 68 ? 'NE' : text >= 69 && text <= 112 ? 'E' : text >= 113 && text <= 158 ? 'SE' : text >= 159 && text <= 202 ? 'S' : text >= 203 && text <= 248 ? 'SW' : text >= 249 && text <= 292 ? 'W' : 'NW'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate('Input')
                        }}
                        style={{ top: '8%', height: 80 }}>
                        <Image source={require('../public/img/back.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight
    },
    text: {
        marginLeft: '3%',
        fontSize: 110
    }
});