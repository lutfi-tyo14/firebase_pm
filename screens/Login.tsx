// screens/Login.tsx — FINAL + DUA ARAH NAVIGASI
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const signIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi!');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email.trim(), password);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        Alert.alert('Gagal Login', 'Email atau password salah!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Format email tidak valid!');
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert('Error', 'Tidak ada koneksi internet!');
      } else {
        Alert.alert('Login Gagal', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tombol Kembali (opsional) */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#4a148c" />
      </TouchableOpacity>

      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>Masuk ke akun NOTEKU Anda</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#8e24aa" />
      ) : (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={signIn}>
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          {/* TOMBOL KE REGISTER — CANTIK & KLIKABLE */}
          <View style={styles.registerLinkContainer}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5ff',
    padding: 30,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4a148c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7b1fa2',
    marginBottom: 50,
  },
  input: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1bee7',
  },
  loginButton: {
    backgroundColor: '#8e24aa',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: '#4a148c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;