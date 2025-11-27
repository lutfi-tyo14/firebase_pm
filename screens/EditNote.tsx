import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { doc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
  noteId: string;
};

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { noteId } = route.params as RouteParams;

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, 'notes', noteId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || '');
          setContent(data.content || '');
        } else {
          Alert.alert('Error', 'Catatan tidak ditemukan');
          navigation.goBack();
        }
      } catch (error: any) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const updateNote = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Judul dan isi tidak boleh kosong');
      return;
    }

    try {
      const docRef = doc(FIRESTORE_DB, 'notes', noteId);
      await updateDoc(docRef, {
        title,
        content,
        updatedAt: serverTimestamp()
      });
      Alert.alert('Sukses', 'Catatan berhasil diperbarui');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Gagal', error.message);
    }
  };

  const deleteNote = () => {
    Alert.alert(
      'Hapus Catatan',
      'Yakin ingin menghapus catatan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(FIRESTORE_DB, 'notes', noteId));
              Alert.alert('Terhapus', 'Catatan telah dihapus');
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Gagal', error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6a1b9a" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Tombol Kembali - Ikon saja, kiri atas, tanpa kotak */}
      <TouchableOpacity 
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#6a1b9a" />
      </TouchableOpacity>

      {/* Judul halaman */}
      <Text style={styles.title}>Edit Catatan</Text>

      {/* Form */}
      <TextInput
        style={styles.input}
        placeholder="Judul catatan"
        value={title}
        onChangeText={setTitle}
      />
      
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Tulis isi catatan..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      {/* Tombol Simpan & Hapus */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveBtn} onPress={updateNote}>
          <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={deleteNote}>
          <Ionicons name="trash-outline" size={20} color="white" />
          <Text style={styles.deleteBtnText}>Hapus Catatan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5f5',
    justifyContent: 'center',
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a148c',
    textAlign: 'center',
    marginBottom: 30,
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
  contentInput: {
    height: 300,
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveBtn: {
    backgroundColor: '#6a1b9a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  deleteBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
  },
});

export default EditNote;