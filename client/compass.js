// import React, { Component } from 'react';
// import { StyleSheet, View, Text } from 'react-native';

// export default class compass extends Component {

//     static navigationOptions = {
//         header: null
//     }

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         const emoji = this.props.navigation.state.params.emoji
//         return (
//             <View style={styles.container}>
//                 <View style={styles.pointer}>
//                     {/* <Text style={styles.s}>S</Text>
//                     <Text style={styles.w}>W</Text> */}
//                     <Text style={styles.emoji}>{emoji}</Text>
//                     {/* <Text style={styles.e}>E</Text>
//                     <Text style={styles.n}>N</Text> */}
//                 </View>
//             </View >
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'rgb(147,149,152)',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     pointer: {
//         height: '40%',
//         width: '70%',        
//         alignItems: 'center',
//         justifyContent: 'center',
//         // backgroundColor: 'red'
//     },
//     emoji: {
//         height: '60%',
//         width: '60%',
//         fontSize: 160,
//         // backgroundColor: 'white'
//     },
//     s: {
//         height: '10%',
//         width: '10%',
//         // backgroundColor: 'yellow'
//     },
//     w: {
//         height: '10%',
//         width: '10%',
//         // backgroundColor: 'yellow'
//     },
//     e: {
//         height: '10%',
//         width: '10%',
//         // backgroundColor: 'yellow'
//     },
//     n: {
//         height: '10%',
//         width: '10%',
//         // backgroundColor: 'yellow'
//     },
// })



import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class compass extends Component {
  state = {
    // location: null,
    errorMessage: null,
    heading: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    // Checking device location permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    else
    {
      Expo.Location.watchHeadingAsync((obj) => {
        let heading = obj.magHeading;
        this.setState({heading: heading})
      })
    }
  };
  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.heading) {
      text = JSON.stringify(this.state.heading);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
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
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});