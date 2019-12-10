import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const HooksComponent= props =>{
  const [count, setCount] = useState(props.count);
  return (
    <View style={styles.container}>
      <Text>You clicked {count} times</Text>
      <Button onPress={() => setCount(count + 1)} title="Click Me" />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  });

  export default HooksComponent;