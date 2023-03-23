import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TextInput, BackHandler } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import { useScanAnimatedQr } from '../hooks/bcur.hook';

export default function HomeScreen() {
  const [data, setData] = useState('');

  const { onBarCodeScan, resetDecoder } = useScanAnimatedQr({
    onSuccess: (data) => {
        setData(data);
    },
    onFail: (error) => {
        alert(error);
    },
  })

  const reset = () => {
    setData(null);
    resetDecoder();
    return true;
  }

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        reset,
      );
      return () => subscription.remove();
  }, []);
  
  return (
    <View style={styles.container}>
      {!data && <QRCodeScanner
        onBarCodeScanned={({data}) => onBarCodeScan(data)}
        style={{height: '100%', width: '100%'}}
      />}
      <Modal visible={!!data} animationType="slide" presentationStyle='formSheet' onRequestClose={reset}>
        <TextInput 
            multiline
            value={data}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  }
});    