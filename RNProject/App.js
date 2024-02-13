import React from 'react';
import { StyleSheet } from 'react-native';

import Routing from './Routing/Routing';

const App = () => {
  // if (__DEV__) {
  //   import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
  // }

  return <Routing />;
}

const styles = StyleSheet.create({

});

export default App;