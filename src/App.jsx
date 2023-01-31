import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [file, setFile] = useState(null);

	const handleFileUpload = async (event) => {
		setFile(event.target.files[0]);
	};

	const handleUpload = async () => {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axios.post(
				"https://graph.microsoft.com/v1.0/me/drive/root/children",
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<input type="file" onChange={handleFileUpload} />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
}

export default App;
