"use client";
import { useState, ChangeEvent } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Markdown() {
	const [markdownInput, setMarkdownInput] = useState("");

	const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setMarkdownInput(event.target.value);
	};

	return (
		<>
			<div className="h-screen">
				<div className="flex flex-col md:flex-row h-full">
					<textarea
						className="flex-1 h-full p-4 bg-gray-100 border-r border-gray-300 resize-none focus:outline-none"
						placeholder="Enter your markdown here..."
						value={markdownInput}
						onChange={handleInput}
					></textarea>
					<div className="flex-1 p-4 prose">
						<ReactMarkdown className="!prose">{markdownInput}</ReactMarkdown>
					</div>
				</div>
			</div>
		</>
	);
}
