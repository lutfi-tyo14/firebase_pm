// File: screens/Details.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Detail</Text>
      <Text style={styles.text}>Anda berhasil login!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#555' },
});

export default Details;