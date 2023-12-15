import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

const Friends = () => {
  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Text>Kommer snart...</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 200,
  },
});

export default Friends;
