import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../FirebaseConfig';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const navigation = useNavigation<any>();
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(collection(FIRESTORE_DB, 'notes'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(list);
    });
    return unsubscribe;
  }, [user]);

  const hapus = (id: string) => {
    Alert.alert("Hapus", "Yakin hapus catatan ini?", [
      { text: "Batal" },
      { text: "Hapus", style: "destructive", onPress: () => deleteDoc(doc(FIRESTORE_DB, 'notes', id)) }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catatan</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Ionicons name="settings-outline" size={28} color="#4a148c" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, paddingTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <TouchableOpacity onPress={() => hapus(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#e74c3c" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardContent} numberOfLines={3}>{item.content}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="document-outline" size={80} color="#ddd" />
            <Text style={styles.emptyText}>Belum ada catatan</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddNote')}>
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f5ff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', elevation: 4 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#4a148c' },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 16, marginBottom: 14, elevation: 4 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#4a148c' },
  cardContent: { fontSize: 14, color: '#555', lineHeight: 20 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, color: '#aaa', marginTop: 20 },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#8e24aa', width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', elevation: 10 },
});

export default Home;