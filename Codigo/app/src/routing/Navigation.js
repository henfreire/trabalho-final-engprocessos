import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { useSelector } from 'react-redux'

import { Button } from 'react-native'

import SceneDriverHome from '../scenes/SceneDriverHome'

import SceneLogin from '../scenes/SceneLogin'
import SceneRegister from '../scenes/SceneRegister'
import SceneRegisterDriver from '../scenes/SceneRegisterDriver'
import SceneDriverTrip from '../scenes/SceneDriverTrip'
import SceneCreateTrip from '../scenes/trips/SceneCreateTrip'
import SceneEditTrip from '../scenes/trips/SceneEditTrip'
import SceneUserPage from '../scenes/SceneUserPage'
import IngressarTrip from '../scenes/aluno/SceneIngressarTrip'

// Alunos
import SceneAlunoHome from '../scenes/aluno/SceneAlunoHome'
import AlunoTrips from '../scenes/aluno/SceneAlunoTrips'

const Stack = createStackNavigator()

const Routes = () => {
    const { token = null, user } = useSelector(({ auth }) => auth)
    const isDriver = user && user.tipo === 'motorista'
    console.log('token route', token)
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {
                token
                    ? (
                        <>
                            <Stack.Screen name="Home" component={isDriver ? SceneDriverHome : SceneAlunoHome} />
                            <Stack.Screen name="DriverHome" component={SceneDriverHome} />
                            <Stack.Screen name="Login" component={SceneLogin} />
                            <Stack.Screen name="Register" component={SceneRegister} />
                            <Stack.Screen name="RegisterDriver" component={SceneRegisterDriver} />
                            <Stack.Screen name="DriverTrip" component={SceneDriverTrip} />
                            <Stack.Screen name="UserPage" component={SceneUserPage} />
                            <Stack.Screen name="CreateTrip" component={SceneCreateTrip} />
                            <Stack.Screen
                                name="EditTrip"
                                component={SceneEditTrip}
                                options={{
                                    header: true,
                                    headerRight: () => (
                                        <Button
                                            onPress={() => alert('This is a button!')}
                                            title="Info"
                                            color="#fff"
                                        />
                                    ),
                                }}
                            />
                            <Stack.Screen name="IngressarTrip" component={IngressarTrip} />
                            <Stack.Screen name="AlunoTrips" component={AlunoTrips} />
                        </>
                    )
                    : (
                        <>
                            <Stack.Screen name="Home" component={SceneLogin} />
                            <Stack.Screen name="Register" component={SceneRegister} />
                            <Stack.Screen name="Login" component={SceneLogin} />
                            <Stack.Screen name="RegisterDriver" component={SceneRegisterDriver} />
                        </>
                    )
            }
        </Stack.Navigator>
    )
}

const AppNavigator = () => (
    <NavigationContainer>
        <Routes />
    </NavigationContainer>
)

export default AppNavigator
