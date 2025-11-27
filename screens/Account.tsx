import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  const navigation = useNavigation<any>();
  const user = FIREBASE_AUTH.currentUser;

  const logout = () => {
    Alert.alert('Keluar', 'Yakin ingin keluar?', [
      { text: 'Batal' },
      { text: 'Keluar', style: 'destructive', onPress: () => signOut(FIREBASE_AUTH) }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#4a148c" />
        </TouchableOpacity>
        <Text style={styles.title}>Akun Saya</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.profile}>
        <Image
          source={{ uri: user?.photoURL || 'https://via.placeholder.com/120?text=U' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.displayName || 'Pengguna'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Login via: {user?.providerData[0]?.providerId?.includes('google') ? 'Google' : 'Email'}</Text>
        <Text style={styles.infoText}>UID: {user?.uid?.slice(0, 15)}...</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Keluar dari Akun</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>NOTEKU v1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f5ff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 50, backgroundColor: 'white', elevation: 4 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4a148c' },
  profile: { alignItems: 'center', marginTop: 40 },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#8e24aa' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#4a148c', marginTop: 15 },
  email: { fontSize: 16, color: '#666', marginTop: 5 },
  info: { margin: 30, backgroundColor: 'white', padding: 20, borderRadius: 16, elevation: 4 },
  infoText: { fontSize: 16, color: '#444', marginBottom: 10 },
  logoutBtn: { flexDirection: 'row', backgroundColor: '#e74c3c', marginHorizontal: 30, padding: 18, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  logoutText: { color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 10 },
  footer: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 12 },
});

export default Account;