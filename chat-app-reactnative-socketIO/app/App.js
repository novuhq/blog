import React from "react";
import Login from "./screens/Login";
import Messaging from "./screens/Messaging";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./screens/Chat";
import ExitButton from "./component/ExitButton";
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Chat'
					component={Chat}
					options={{
						title: "Chats",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name='Messaging'
					component={Messaging}
					options={{
						title: "Messaging",
						headerRight: ExitButton,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
