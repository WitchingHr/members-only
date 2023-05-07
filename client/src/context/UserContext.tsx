import React, {
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from "react";

// types
interface UserContext {
	auth: Auth;
	setAuth: Dispatch<SetStateAction<Auth>>;
}

interface Auth {
	isAuth: boolean;
	username: string | null;
}

// create context
const UserContext = createContext<UserContext>({} as UserContext);

// props
interface Props {
	children: React.ReactNode;
}

// provider
const UserProvider = ({ children }: Props) => {
	// auth state
	const [auth, setAuth] = useState<Auth>({
		isAuth: false,
		username: null,
	});

	return (
		<UserContext.Provider value={{ auth, setAuth }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
