if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;

import React from 'react';
import HomeScreen from './src/screens/Home';

export default function App() {
  return (
    <>
    <HomeScreen />
    </>
  );
}