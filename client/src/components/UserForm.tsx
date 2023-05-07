import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// form validation schema
const schema = z.object({
	username: z
		.string()
		.min(1, "Required")
		.regex(new RegExp(/^[a-zA-Z0-9]+$/), "Invalid characters")
		.max(20)
		.trim(),
	password: z
		.string()
		.min(1, "Required")
		.regex(new RegExp(/^[a-zA-Z0-9]+$/), "Invalid characters")
		.max(20)
		.trim(),
});

export type FormData = z.infer<typeof schema>;

// Props
interface UserFormProps {
	action: (data: FormData) => void;
	button: string;
}

// User Form component
const UserForm: FC<UserFormProps> = ({ action, button }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });
	const onSubmit = (data: FormData) => {
		action(data);
	};

	return (
		<form
			className="flex flex-col user-form mt-12 gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{/* Username */}
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<label htmlFor="user">Username:</label>
					<p className="text-red-600">{errors.username?.message}</p>
				</div>
				<input
					maxLength={20}
					type="text"
					id="user"
					{...register("username", { required: true })}
					className="border-2 border-gray-300 rounded-md py-1 px-2"
				/>
			</div>

			{/* Password */}
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<label htmlFor="password">Password:</label>
					<p className="text-red-600">{errors.password?.message}</p>
				</div>
				<input
					maxLength={20}
					type="password"
					id="password"
					{...register("password", { required: true })}
					className="border-2 border-gray-300 rounded-md py-1 px-2 relative"
				/>
			</div>

			{/* Submit button */}
			<button type="submit" className="button">
				{button}
			</button>
		</form>
	);
};

export default UserForm;
