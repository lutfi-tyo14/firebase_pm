import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigation = useNavigation<any>();

  const saveNote = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Judul dan isi tidak boleh kosong');
      return;
    }

    try {
      await addDoc(collection(FIRESTORE_DB, 'notes'), {
        title,
        content,
        userId: FIREBASE_AUTH.currentUser?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#6a1b9a" />
      </TouchableOpacity>

      <Text style={styles.title}>Catatan Baru</Text>

      <TextInput
        style={styles.input}
        placeholder="Judul catatan"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.content]}
        placeholder="Tulis isi catatan..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.btn} onPress={saveNote}>
        <Text style={styles.btnText}>Simpan Catatan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3e5f5', padding: 20 },
  back: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4a148c', textAlign: 'center', marginTop: 60 },
  input: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginTop: 20, borderWidth: 1, borderColor: '#e1bee7' },
  content: { height: 300 },
  btn: { backgroundColor: '#6a1b9a', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: 'white', fontWeight: '600', fontSize: 16 }
});

export default AddNote;