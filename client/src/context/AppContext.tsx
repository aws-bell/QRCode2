import { createContext, ReactNode, useContext, useState } from "react"

const defaultContextData = {
    editTitle: "",
    setEditTitle: () => {},
    editImage: null,
    setEditImage: () => {},
}

type AppProviderProps = {
    children: ReactNode
}

type AppConTextType = {
    editTitle: string ,
    setEditTitle: React.Dispatch<React.SetStateAction<string>>;
    editImage: File | null,
    setEditImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const AppContext = createContext<AppConTextType>(defaultContextData);

export function AppProvider({children}: AppProviderProps) { 
    const [editTitle, setEditTitle] = useState<string>("");
    const [editImage, setEditImage] = useState<File|null>(null);

    return(
        <AppContext.Provider
        value={{editTitle, setEditTitle, editImage, setEditImage}}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}