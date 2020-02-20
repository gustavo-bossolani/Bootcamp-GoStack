import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Main from './pages/Main';
import User from './pages/User';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        headerStyle: {
                            backgroundColor: '#7159c1',
                        },
                        headerTintColor: '#eee',
                    }}
                />
                <Stack.Screen
                    name="Usuários"
                    component={User}
                    options={{
                        headerStyle: {
                            backgroundColor: '#7159c1',
                        },
                        headerTintColor: '#eee',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Routes;
