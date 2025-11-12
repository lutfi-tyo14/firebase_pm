// File: screens/Login.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Linking } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { FIREBASE_AUTH, GOOGLE_PROVIDER } from '../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  // CEK HASIL REDIRECT SETELAH KEMBALI DARI BROWSER
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(FIREBASE_AUTH);
        if (result?.user) {
          Alert.alert('Sukses', 'Login Google berhasil!');
        }
      } catch (error: any) {
        if (error.code !== 'auth/no-redirect-result') {
          Alert.alert('Error', error.message);
        }
      }
    };
    checkRedirectResult();
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error: any) {
      Alert.alert('Login Gagal', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      Alert.alert('Sukses', 'Akun dibuat! Cek email verifikasi.');
    } catch (error: any) {
      Alert.alert('Gagal Daftar', error.message);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN: BUKA BROWSER (REACT NATIVE)
  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(FIREBASE_AUTH, GOOGLE_PROVIDER);
    } catch (error: any) {
      Alert.alert('Google Gagal', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>Login atau buat akun baru</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <>
          <TouchableOpacity style={styles.btn} onPress={signIn}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline} onPress={signUp}>
            <Text style={styles.btnOutlineText}>Buat Akun</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>ATAU</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.googleBtn} onPress={signInWithGoogle}>
            <Ionicons name="logo-google" size={20} color="white" />
            <Text style={styles.googleText}>Masuk dengan Google</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#333' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: '#4F8EF7', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 },
  btnOutline: { backgroundColor: 'white', padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#4F8EF7', marginBottom: 20 },
  btnOutlineText: { color: '#4F8EF7', fontWeight: '600', fontSize: 16 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  or: { marginHorizontal: 15, color: '#888', fontSize: 14 },
  googleBtn: { flexDirection: 'row', backgroundColor: '#db4437', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  googleText: { color: 'white', marginLeft: 10, fontWeight: '600', fontSize: 16 },
});

export default Login;