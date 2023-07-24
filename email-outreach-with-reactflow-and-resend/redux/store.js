import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./nodes";

export const store = configureStore({
	reducer: {
		nodes: nodeReducer,
	},
});
