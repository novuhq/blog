import { useState } from "react";
import { Handle, Position } from "reactflow";
import { useSelector, useDispatch } from "react-redux";
import { setNodes, updateNodeValue } from "../redux/nodes";

export default function Task({ id }) {
	const initialNodes = useSelector((state) => state.nodes.nodes);
	const [value, setValue] = useState("");
	const dispatch = useDispatch();

	return (
		<>
			<Handle type='target' position={Position.Top} />
			<div
				style={{
					padding: "10px",
					backgroundColor: "#F5F5F5",
					borderRadius: "5px",
				}}
			>
				<input
					className='textInput'
					type='text'
					required
					onChange={(e) => {
						setValue(e.target.value);
						dispatch(updateNodeValue({ id, value: e.target.value }));
					}}
					value={value}
				/>
				{Number(id) === initialNodes.length && (
					<button onClick={() => dispatch(setNodes())} className='addBtn'>
						ADD NODE
					</button>
				)}
			</div>

			<Handle type='source' position={Position.Bottom} id='a' />
		</>
	);
}
