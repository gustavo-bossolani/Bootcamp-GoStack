import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

export default function App() {
    return (
        <View style={style.container}>
            <Text style={style.welcome}>Welcome to React Native!</Text>
            <Text style={style.welcome}>Abaixo</Text>
        </View>
    );
}
