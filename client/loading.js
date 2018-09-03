import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import logo from '../public/img/logo.png';
import logo2 from '../public/img/logo2.png';


export default class loading extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: {},
            fontColor: {}
        }
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        let hr = new Date().getHours();
        if(hr<6 || hr>18){
            this.setState({backgroundColor:{backgroundColor: 'rgb(51,0,102)'}, fontColor:{color: 'rgb(153,51,255)'}})
        }else{
            this.setState({backgroundColor:{backgroundColor: 'rgb(128,130,133)'}, fontColor:{color: '#E6E7E8'}})
        }

        setTimeout(() => {
            navigate('Input', {backgroundColor: this.state.backgroundColor, fontColor: this.state.fontColor});
        }, 1500)
    }


    render() {
        return (
            <View style={[styles.container, this.state.backgroundColor]}>
                <StatusBar hidden={true} />
                <Image style={styles.img} source={this.state.backgroundColor.backgroundColor==='rgb(51,0,102)'?logo2:logo} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: '45%'
    },
    img: {
        top: '15%',
        height: 135,
        width: 220
    }
})