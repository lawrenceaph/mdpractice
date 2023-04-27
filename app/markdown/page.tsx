"use client";
import { useState, ChangeEvent, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const Home: React.FC = () => {
	const [markdownInput, setMarkdownInput] = useState<string>("");
	const [markdownName, setMarkdownName] = useState<string>("");
	const [savedStatus, setSavedStatus] = useState<string>("");
	const [savedFiles, setSavedFiles] = useState<string[]>([]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showCloseModal, setShowCloseModal] = useState<boolean>(false);
	const [showNewModal, setShowNewModal] = useState<boolean>(false);
	const [autosaveEnabled, setAutosaveEnabled] = useState<boolean>(false);
	useEffect(() => {
		const loadMarkdown = localStorage.getItem("markdown-" + markdownName);
		if (loadMarkdown) {
			setMarkdownInput(loadMarkdown);
		}
	}, [markdownName]);
	useEffect(() => {
		if (autosaveEnabled && markdownName) {
			const autosaveInterval = setInterval(() => {
				saveMarkdown();
			}, 60000); // Autosave every minute (60000 ms)

			return () => {
				clearInterval(autosaveInterval);
			};
		}
	}, [autosaveEnabled, markdownName, markdownInput]);

	const handleAutosaveToggle = (event: ChangeEvent<HTMLInputElement>): void => {
		setAutosaveEnabled(event.target.checked);
	};
	const resetAppState = (): void => {
		setMarkdownName("");
		setMarkdownInput("");
	};
	const openCloseModal = (): void => {
		setShowCloseModal(true);
	};

	const closeCloseModal = (): void => {
		setShowCloseModal(false);
	};

	const openNewModal = (): void => {
		setShowNewModal(true);
	};

	const closeNewModal = (): void => {
		setShowNewModal(false);
	};
	useEffect(() => {
		const keys = Object.keys(localStorage).filter((key) =>
			key.startsWith("markdown-")
		);
		const fileNames = keys.map((key) => key.replace("markdown-", ""));
		setSavedFiles(fileNames);
	}, []);

	const handleInput = (event: ChangeEvent<HTMLTextAreaElement>): void => {
		setMarkdownInput(event.target.value);
	};

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setMarkdownName(event.target.value);
	};

	const saveMarkdown = (): void => {
		localStorage.setItem("markdown-" + markdownName, markdownInput);
		setSavedStatus("Saved successfully!");
		setTimeout(() => setSavedStatus(""), 3000);
		setSavedFiles([...savedFiles, markdownName]);
	};

	const openModal = (): void => {
		setShowModal(true);
	};

	const closeModal = (): void => {
		setShowModal(false);
	};

	const loadFile = (fileName: string): void => {
		setMarkdownName(fileName);
		closeModal();
	};

	const hasSavedFiles = savedFiles.length > 0;

	return (
		<div className="flex flex-col h-screen">
			<div className="bg-gray-800 text-white p-4 hidden md:block">
				<input
					type="text"
					className="bg-gray-700 text-white p-2 rounded mr-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
					placeholder="Enter markdown name..."
					value={markdownName}
					onChange={handleNameChange}
				/>
				<button
					className="rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
					onClick={saveMarkdown}
				>
					Save
				</button>
				<button
					className={`px-4 py-2 rounded focus:outline-none focus:ring-2 ${
						hasSavedFiles
							? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300"
							: "bg-gray-300 cursor-not-allowed"
					}`}
					onClick={hasSavedFiles ? openModal : undefined}
					title={hasSavedFiles ? "" : "No saved files"}
				>
					Load
				</button>
				<span className="text-green-400">{savedStatus}</span>
				<button
					className="bg-gray-500  rounded ml-2 hover:bg-gray-600 px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
					onClick={openCloseModal}
				>
					Close File
				</button>
				<button
					className="bg-green-500 rounded  hover:bg-green-600 px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-green-300"
					onClick={openNewModal}
				>
					New File
				</button>
				<label className="flex items-center text-sm mt-2">
					<input
						type="checkbox"
						className="mr-2 focus:ring-blue-300"
						checked={autosaveEnabled}
						onChange={handleAutosaveToggle}
					/>
					Autosave every minute
				</label>
			</div>

			{/* mobile nav */}
			<div className=" justify-between items-center flex md:hidden bg-blue-500 p-4">
				<div className="hidden md:flex">
					{/* Place the existing navbar buttons here */}
				</div>
				<div className="md:hidden flex space-x-2">
					<button
						className="bg-red-500 hover:bg-red-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
						onClick={openCloseModal}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<button
						className="bg-green-500 hover:bg-green-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
						onClick={openNewModal}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
							/>
						</svg>
					</button>
					<button
						className={
							hasSavedFiles
								? "bg-blue-500 hover:bg-blue-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
								: "bg-gray-500 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-not-allowed"
						}
						onClick={hasSavedFiles ? openModal : undefined}
						title={hasSavedFiles ? "" : "No saved files"}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
							/>
						</svg>
					</button>
					<button
						className="bg-gray-500 hover:bg-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
						onClick={saveMarkdown}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="w-5 h-5"
						>
							<path
								fillRule="evenodd"
								d="M4.25 2A2.25 2.25 0 002 4.25v11.5A2.25 2.25 0 004.25 18h11.5A2.25 2.25 0 0018 15.75V4.25A2.25 2.25 0 0015.75 2H4.25zM6 13.25V3.5h8v9.75a.75.75 0 01-1.064.681L10 12.576l-2.936 1.355A.75.75 0 016 13.25z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="flex flex-1 h-full">
				<textarea
					className="flex-1 h-full p-4 bg-gray-100 border-r border-gray-300 resize-none focus:outline-none"
					placeholder="Enter your markdown here..."
					value={markdownInput}
					onChange={handleInput}
				></textarea>
				<div className="flex-1 p-4">
					<ReactMarkdown className="prose">{markdownInput}</ReactMarkdown>
				</div>
			</div>
			{showModal && (
				<div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-md max-w-[100vw]">
						<h2 className="text-xl mb-4">Select a file to load</h2>
						<ul>
							{savedFiles.map((file, index) => (
								<li key={index} className="mb-2">
									<button
										className="text-blue-500 hover:text-blue-600"
										onClick={() => loadFile(file)}
									>
										{file}
									</button>
								</li>
							))}
						</ul>
						<button
							className="bg-red-500 hover:bg-red-600 px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-red-300"
							onClick={closeModal}
						>
							Close
						</button>
					</div>
				</div>
			)}
			{showCloseModal && (
				<div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-md">
						<h2 className="text-xl mb-4">
							Are you sure you want to close the file?
						</h2>
						<button
							className="bg-red-500 hover:bg-red-600 px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-red-300"
							onClick={() => {
								closeCloseModal();
								resetAppState();
							}}
						>
							Yes
						</button>
						<button
							className="bg-blue-500 hover:bg-blue-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
							onClick={closeCloseModal}
						>
							No
						</button>
					</div>
				</div>
			)}
			{showNewModal && (
				<div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-md">
						<h2 className="text-xl mb-4">
							Do you want to save the current file before creating a new file?
						</h2>
						<button
							className="bg-green-500 hover:bg-green-600 px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-green-300"
							onClick={() => {
								saveMarkdown();
								closeNewModal();
								resetAppState();
							}}
						>
							Yes
						</button>
						<button
							className="bg-red-500 hover:bg-red-600 px-4 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-red-300"
							onClick={() => {
								closeNewModal();
								resetAppState();
							}}
						>
							No
						</button>
						<button
							className="bg-blue-500 hover:bg-blue-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
							onClick={closeNewModal}
						>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
