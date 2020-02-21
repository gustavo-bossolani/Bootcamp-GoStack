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
                        title: 'Usuários',
                        headerStyle: {
                            backgroundColor: '#7159c1',
                        },
                        headerTintColor: '#eee',
                        headerTitleAlign: 'center',
                    }}
                />
                <Stack.Screen
                    name="User"
                    component={User}
                    options={{
                        title: 'Usuário',
                        headerStyle: {
                            backgroundColor: '#7159c1',
                        },
                        headerTintColor: '#eee',
                        headerTitleAlign: 'center',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Routes;
