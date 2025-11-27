// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { View, ActivityIndicator, Text } from 'react-native';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
import EditNote from './screens/EditNote';
import Account from './screens/Account';

const Stack = createNativeStackNavigator();

const InsideLayout = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="AddNote" component={AddNote} />
    <Stack.Screen name="EditNote" component={EditNote} />
    <Stack.Screen name="Account" component={Account} />
  </Stack.Navigator>
);

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f5ff' }}>
        <ActivityIndicator size="large" color="#8e24aa" />
        <Text style={{ marginTop: 20, color: '#6a1b9a' }}>Memuat NOTEKU...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}