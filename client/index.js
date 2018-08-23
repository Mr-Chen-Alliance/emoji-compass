import { createStackNavigator } from 'react-navigation';
import loading from './loading';
import input from './input';
import compass from './compass'
// import navigation from './navigation';


export default RootNavigator = createStackNavigator({
    Main: {
        screen: loading
    },
    Input: {
        screen: input
    },
    Compass: {
        screen: compass
    }
})