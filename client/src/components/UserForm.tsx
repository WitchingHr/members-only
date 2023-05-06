import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// form validation schema
const schema = z.object({
  username: z.string().min(1).max(20).trim(),
  password: z.string().min(1).max(20).trim(),
});

export type FormData = z.infer<typeof schema>;

interface UserFormProps {
  action: (data: FormData) => void;
}

// User Form component
const UserForm: FC<UserFormProps> = ({ action }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema)});
  const onSubmit = (data: FormData) => {
    action(data);
  };

  return (
    <form className="flex flex-col w-1/2 mt-16 gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center">
        <label htmlFor="user" className="w-1/4 shrink-0">Username:</label>
        <input
          maxLength={20}
          type="text"
          id="user"
          {...register("username", { required: true })}
          className="border-2 border-gray-300 rounded-md w-3/4 ml-4 py-1 px-2"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="password" className="w-1/4 shrink-0">Password:</label>
        <input
          maxLength={20}
          type="password"
          id="password"
          {...register("password", { required: true })}
          className="border-2 border-gray-300 rounded-md w-3/4 ml-4 py-1 px-2"
        />
      </div>
      <div className="flex justify-center ml-[25%]"><button type="submit" className="w-1/2 py-1.5 rounded-lg ml-4 bg-indigo-600 text-white font-medium">Log in</button></div>
    </form>
  );
};

export default UserForm;
