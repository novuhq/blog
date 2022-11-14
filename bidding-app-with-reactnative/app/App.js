import React, { useState } from "react";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BidPage from "./screens/BidPage";
import AddProduct from "./screens/AddProduct";

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
					name='BidPage'
					component={BidPage}
					options={{
						headerShown: false,
					}}
				/>

				<Stack.Screen
					name='AddProduct'
					component={AddProduct}
					options={{
						title: "Add Product",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
