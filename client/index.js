import { createStackNavigator } from 'react-navigation';
import loading from './loading';
import input from './input';
// import navigation from './navigation';


export default RootNavigator = createStackNavigator({
    Main: {
        screen: loading
    },
    input: {
        screen: input
    }
})