import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// form validation schema
const schema = z.object({
	username: z.string().min(1, 'Username: Required').regex(new RegExp(/^[a-zA-Z0-9]+$/), 'Username: Invalid characters').max(20).trim(),
	password: z.string().min(1, 'Password: Required').regex(new RegExp(/^[a-zA-Z0-9]+$/), 'Password: Invalid characters').max(20).trim(),
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
			className="flex flex-col w-1/2 mt-16 gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>

			{/* Username */}
			<div className="flex items-center">
				<label htmlFor="user" className="w-1/4 shrink-0">
					Username:
				</label>
				<input
					maxLength={20}
					type="text"
					id="user"
					{...register("username", { required: true })}
					className="border-2 border-gray-300 rounded-md w-3/4 ml-4 py-1 px-2"
				/>
			</div>

			{/* Password */}
			<div className="flex items-center">
				<label htmlFor="password" className="w-1/4 shrink-0">
					Password:
				</label>
				<input
					maxLength={20}
					type="password"
					id="password"
					{...register("password", { required: true })}
					className="border-2 border-gray-300 rounded-md w-3/4 ml-4 py-1 px-2 relative"
				/>
			</div>
			
			{/* Submit button */}
			<div className="flex justify-center ml-[25%]">
				<button
					type="submit"
					className="w-1/2 ml-4 button"
				>
					{button}
				</button>
			</div>
			
			{/* Error messages */}
			<div className="min-h-[48px] text-red-600 font-medium">
				<p className="">{errors.username?.message}</p>
				<p className="">{errors.password?.message}</p>
			</div>
		</form>
	);
};

export default UserForm;
