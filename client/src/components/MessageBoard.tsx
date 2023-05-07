import React, {
	FC,
	useEffect,
	useState,
	useContext,
	Dispatch,
	SetStateAction,
} from "react";
import axios from "../axios";
import { DateTime } from "luxon";
import { UserContext } from "../context/UserContext";
import MessageForm from "./MessageForm";

// types
interface Message {
	_id: string;
	title: string;
	text: string;
	user: {
		username: string;
	};
	createdAt: string;
}

interface MessageBoardProps {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MessageBoard: FC<MessageBoardProps> = ({ modalOpen, setModalOpen }) => {
	// state
	const [messages, setMessages] = useState<Message[]>([]);
	// auth
	const { auth } = useContext(UserContext);

	const fetchMessages = async () => {
		const res = await axios.get("http://localhost:3001/api/messages");
		setMessages(res.data);
	};

	// fetch messages
	useEffect(() => {
		fetchMessages();
	}, []);

	return (
		<div className="mt-16 gap-4 message-grid">
			{messages.length === 0 && (
				<p className="text-xl text-center">No messages to display</p>
			)}
			{messages.map((message) => {
				const dt = DateTime.fromISO(message.createdAt);
				const date = dt.toLocaleString(DateTime.DATETIME_MED);
				return (
					<div
						key={message._id}
						className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md"
					>
						<div className="flex justify-between">
							<h2 className="text-xl font-bold overflow-auto break-words dark:text-black">
								{message.title}
							</h2>
						</div>
						<p className="mt-2 dark:text-black">{message.text}</p>
						<div className="flex flex-col md:flex-row justify-between mt-auto pt-2">
							<p className="text-sm text-gray-500 break-words overflow-auto">
								Posted by {auth.isAuth ? message.user.username : "Anonymous"}
							</p>
							<p className="text-sm text-gray-500">{date}</p>
						</div>
					</div>
				);
			})}

			{/* New Message Form */}
			{auth.username && modalOpen && (
				<MessageForm
					user={auth.username}
					fetchMessages={fetchMessages}
					setModalOpen={setModalOpen}
				/>
			)}
		</div>
	);
};

export default MessageBoard;
