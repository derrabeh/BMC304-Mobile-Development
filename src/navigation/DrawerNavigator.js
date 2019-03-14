import { createDrawerNavigator } from 'react-navigation';
import { DetailsScreen } from '../screen/DetailsScreen';
import { HomeScreen } from '../screen/HomeScreen';

const AppDrawerNavigator = createDrawerNavigator(
    {
      Home: {
        screen: HomeScreen
      }, 
      Details: {
        screen: DetailsScreen
      }
    }
  );

  export { AppDrawerNavigator };

