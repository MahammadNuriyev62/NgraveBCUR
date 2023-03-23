import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  BackHandler,
  Platform,
  Text,
} from "react-native";
import QRCodeScanner from "@components/QRCodeScanner";
import KeyboardAvoidingView from "@components/KeyboardAvoidingView";
import { useScanAnimatedQr } from "../hooks/bcur.hook";
import { RootStackScreenProps } from "../navigators/types";

type Props = RootStackScreenProps<"ScanQR">;

const ScanQRScreen: FC<Props> = () => {
  const [data, setData] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const { onBarCodeScan, resetDecoder } = useScanAnimatedQr({
    onSuccess: (data) => {
      setData(data);
    },
    onFail: (error) => {
      setData("ERROR: " + error);
    },
    onProgress: (progress) => {
      setProgress(progress);
    },
  });

  useEffect(() => {
    setShowProgress(true);
    const timeout = setTimeout(() => setShowProgress(false), 1000);
    return () => clearTimeout(timeout);
  }, [progress]);

  const reset = () => {
    setData("");
    return true;
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      reset
    );
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!data) {
      resetDecoder();
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 600);
      return () => clearTimeout(timeout);
    } else setVisible(true);
  }, [data]);

  return (
    <View style={styles.container}>
      {!visible && (
        <QRCodeScanner
          onBarCodeScanned={({ data }) => onBarCodeScan(data)}
          style={styles.scanner}
        />
      )}
      {showProgress && <Text style={styles.progress}>Scanning...</Text>}
      <Modal
        visible={!!data}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={reset}
      >
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <KeyboardAvoidingView>
            <TextInput
              multiline
              value={data}
              onChangeText={setData}
              style={styles.input}
            />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  scanner: {
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  progress: {
    position: "absolute",
    alignSelf: "center",
    bottom: 40,
    fontSize: 30,
    color: "white",
  },
});

export default ScanQRScreen;
