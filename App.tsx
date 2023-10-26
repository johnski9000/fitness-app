import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Home from './app/screens/Home';
import Profile from './app/screens/Profile';
import Workout from './app/screens/Workout';
import Diet from './app/screens/Diet';
import store from './store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { setUser } from './userSlice';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ animation: 'none' }}>
      <InsideStack.Screen name='Home' component={Home} options={{ headerShown: true }}/>
      <InsideStack.Screen name='Profile' component={Profile} options={{ headerShown: true }}/>
      <InsideStack.Screen name='Workout' component={Workout} options={{ headerShown: true }}/>
      <InsideStack.Screen name='Diet' component={Diet} options={{ headerShown: true }}/>
    </InsideStack.Navigator>
  );
}

function MyApp() {
  function extractUserData(user) {
    if (!user) return null;
  
    const { uid, email, displayName, photoURL, emailVerified } = user;
    return {
      uid,
      email,
      displayName,
      photoURL,
      emailVerified,
    };
  }
  
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      const userData = extractUserData(user);
      dispatch(setUser(userData));
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {
          user.user ? (
            <Stack.Screen name='InsideLayout' component={InsideLayout} options={{ headerShown: false }}/>
          ) : (
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

