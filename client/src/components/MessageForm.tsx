import React, { FC, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../axios";
import { z } from "zod";
import { set } from "mongoose";

// Form validation schema
const schema = z.object({
	title: z.string().min(1).max(50),
	text: z.string().min(1).max(500),
});

export type FormData = z.infer<typeof schema>;

// Props
interface MessageFormProps {
	user: string;
	fetchMessages: () => void;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Message Form component
const MessageForm: FC<MessageFormProps> = ({
	user,
	fetchMessages,
	setModalOpen,
}) => {
	// input values
	const [title, setTitle] = useState<string>("");
	const [text, setText] = useState<string>("");

	// modal ref
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const closeModal = (e: any) => {
			if (e.key === "Escape") {
				modalRef.current?.close();
			}
			if (e.target !== modalRef.current) {
				modalRef.current?.close();
			}
		};
		window.addEventListener("click", closeModal);
		return () => {
			window.removeEventListener("click", closeModal);
		};
	}, []);

	// form
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	// submit form
	const onSubmit = async (data: FormData) => {
		// create message object
		const message = {
			title: data.title,
			text: data.text,
			user: user,
		};

		try {
			// post message
			const res = await axios.post(
				"http://localhost:3001/api/messages",
				message
			);

			// reset form
			setTitle("");
			setText("");

			// close modal
			setModalOpen(false);

			// fetch messages
			fetchMessages();
		} catch (err) {
			console.error(err);
		}
	};

	const handleModalClose = (e: React.MouseEvent) => {
		setModalOpen(false);
	};

	return (
		<div
			className="w-screen h-screen bg-black bg-opacity-20 dark:bg-opacity-40 fixed top-0 left-0"
			onClick={handleModalClose}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col p-4 bg-gray-100 dark:bg-slate-800 rounded-lg shadow-md w-3/4 md:w-1/2 mx-auto mt-[20%]"
			>
				<h2 className="text-xl font-bold">Post a message</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 mt-4"
				>
					<input
						type="text"
						maxLength={50}
						placeholder="Title"
						className="p-2 border border-gray-300 rounded-md"
						{...register("title", { required: true })}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						placeholder="Body"
						maxLength={500}
						className="p-2 border border-gray-300 rounded-md"
						{...register("text", { required: true })}
						value={text}
						onChange={(e) => setText(e.target.value)}
					></textarea>
					<button
						type="submit"
						className="p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-800"
					>
						Post
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessageForm;
