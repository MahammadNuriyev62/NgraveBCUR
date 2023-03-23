import React, { FC, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
import { RootStackScreenProps } from "@navigators/types";
import QrCodeGenerator from "@components/QrCodeGenerator";
import { SCREEN_WIDTH } from "../constants";
import KeyboardAvoidingView from "@components/KeyboardAvoidingView";

type Props = RootStackScreenProps<"GenerateQR">;

const DEFAULT_PAYLOAD = "NGRAVE";

const GenerateQRScreen: FC<Props> = () => {
  const [payloadModalVisible, setPayloadModalVisible] = useState(false);
  const [payload, setPayload] = useState<string>(DEFAULT_PAYLOAD);
  const refs = useRef({ pendingPayload: "" }).current;
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.qrContainer}>
            <QrCodeGenerator value={payload} size={SCREEN_WIDTH - 40} />
          </View>
          <Button
            title="Enter Payload"
            onPress={() => setPayloadModalVisible(true)}
          />
        </ScrollView>
      </View>
      <Modal
        visible={payloadModalVisible}
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setPayloadModalVisible(false)}
      >
        <KeyboardAvoidingView>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 20, flex: 1 }}>
              <TextInput
                multiline
                style={styles.input}
                onChangeText={(text) => {
                  refs.pendingPayload = text;
                }}
              />
            </View>
            <Button
              title="Enter"
              onPress={() => {
                setPayload(refs.pendingPayload);
                setPayloadModalVisible(false);
              }}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  qrContainer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
});

export default GenerateQRScreen;
