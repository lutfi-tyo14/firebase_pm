// File: screens/Home.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation<any>();
  const user = FIREBASE_AUTH.currentUser;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Selamat Datang!</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Details')}>
        <Text style={styles.btnText}>Buka Detail</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={() => FIREBASE_AUTH.signOut()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f0f4f8' },
  welcome: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  email: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  btn: { backgroundColor: '#4F8EF7', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  btnText: { color: 'white', fontWeight: '600' },
  logout: { backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#ddd' },
  logoutText: { color: '#333', fontWeight: '600' },
});

export default Home;