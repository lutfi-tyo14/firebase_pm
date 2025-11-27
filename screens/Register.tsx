// screens/Register.tsx — FINAL + ADA TOMBOL "SUDAH PUNYA AKUN? LOGIN DI SINI"
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const signUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password harus diisi!');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter!');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email.trim(), password);
      Alert.alert('Sukses', 'Akun berhasil dibuat! Silakan login.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Gagal', 'Email sudah terdaftar! Silakan login.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Gagal', 'Format email tidak valid!');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tombol Kembali */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#4a148c" />
      </TouchableOpacity>

      <Text style={styles.title}>Buat Akun Baru</Text>
      <Text style={styles.subtitle}>Isi data untuk mulai menggunakan NOTEKU</Text>

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
        placeholder="Password (min. 6 karakter)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#8e24aa" />
      ) : (
        <TouchableOpacity style={styles.registerButton} onPress={signUp}>
          <Text style={styles.registerButtonText}>Daftar</Text>
        </TouchableOpacity>
      )}

      {/* TULISAN BISA DIKLIK KE LOGIN */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Sudah punya akun? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login di sini</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4a148c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7b1fa2',
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e1bee7',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#8e24aa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#4a148c',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Register;