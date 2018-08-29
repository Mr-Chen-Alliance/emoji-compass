import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { Constants, Permissions } from 'expo';

export default class compass extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state = {
            errorMessage: null,
            heading: null
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

    componentWillUpdate() {
        this.spin()
    }

    spin() {
        let start = JSON.stringify(this.spinValue);
        let heading = Math.round(this.state.heading);

        let rot = +start;
        let rotM = rot % 360;

        // if (rotM < 180 && (heading > (rotM + 180)))
        //     rot -= 360;
        // if (rotM >= 180 && (heading <= (rotM - 180)))
        //     rot += 360

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
            <View style={styles.container}>
                <Animated.Text
                    style={{
                        transform: [{ rotate: spin }],
                        fontSize: 200,
                    }} >
                    <Text style={{
                        fontSize: 30,
                        textAlign: 'center'
                    }}>N{"\n"}</Text>
                    {emoji}
                </Animated.Text>
                <Text style={styles.text}>{text + '°'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    }
});