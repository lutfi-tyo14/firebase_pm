// File: screens/Register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert('Sukses', 'Akun dibuat! Silakan login.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buat Akun</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" />

      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <TouchableOpacity style={styles.btn} onPress={signUp}>
          <Text style={styles.btnText}>Daftar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: '#4F8EF7', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
});

export default Register;