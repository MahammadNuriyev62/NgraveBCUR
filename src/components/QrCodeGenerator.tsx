import React, { memo, useEffect, useReducer } from "react";
import { UR, UREncoder } from "@ngraveio/bc-ur";
import QRCode, { QRCodeProps } from "react-native-qrcode-svg";

interface IState {
  encoder: UREncoder | null;
  frame: string | null;
}

const defaultState: IState = {
  encoder: null,
  frame: null,
};

interface Props extends QRCodeProps {}

const FPS = 8;
const FRAGMENT_SIZE = 90;

const QrCodeGenerator: React.FC<Props> = ({ value, ...props }) => {
  const [state, dispatch] = useReducer(
    (state: IState, newState: Partial<IState>) => ({ ...state, ...newState }),
    defaultState
  );

  useEffect(() => {
    try {
      if (value) {
        const ur = UR.fromBuffer(Buffer.from(value));
        const encoder = new UREncoder(ur, FRAGMENT_SIZE);

        dispatch({ encoder, frame: encoder.nextPart().toUpperCase() });
      }
    } catch (error) {
      console.warn("🚀 ~ useEffect ~ error", error);
    }
  }, [value]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (state.encoder)
      timeout = setTimeout(
        () => dispatch({ frame: state.encoder.nextPart().toUpperCase() }),
        1000 / FPS
      );
    return () => clearTimeout(timeout);
  }, [state.frame]);

  return <QRCode value={state.frame} {...props} />;
};

export default memo(QrCodeGenerator);
