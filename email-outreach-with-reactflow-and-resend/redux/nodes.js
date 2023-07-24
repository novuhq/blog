import { createSlice } from "@reduxjs/toolkit";

const addNode = (object) => {
	const newNode = {
		id: `${Number(object.id) + 1}`,
		type: "task",
		position: { x: 0, y: object.position.y + 120 },
		data: { value: "" },
	};
	return newNode;
};
const addEdge = (object) => {
	const newEdge = {
		id: `${object.id}->${Number(object.id) + 1}`,
		source: `${object.id}`,
		target: `${Number(object.id) + 1}`,
	};
	return newEdge;
};

export const nodeSlice = createSlice({
	name: "nodes",
	initialState: {
		nodes: [
			{
				id: "1",
				type: "task",
				position: { x: 0, y: 0 },
				data: { value: "" },
			},
		],
		edges: [],
	},
	reducers: {
		setNodes: (state, action) => {
			let nodes = state.nodes;
			state.nodes = [...state.nodes, addNode(nodes[nodes.length - 1])];
			state.edges = [...state.edges, addEdge(nodes[nodes.length - 1])];
		},
		updateNodeValue: (state, action) => {
			let nodes = [...state.nodes];
			let objectIndex = nodes.findIndex((obj) => obj.id === action.payload.id);
			if (objectIndex !== -1) {
				state.nodes[objectIndex] = {
					...nodes[objectIndex],
					data: { value: action.payload.value },
				};
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { setNodes, updateNodeValue } = nodeSlice.actions;

export default nodeSlice.reducer;
