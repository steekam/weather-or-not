import {createContext, ReactNode, useEffect, useState} from "react";
import {changeLanguage} from "i18next";

export const AppLangCodes = ["en", "sw"] as const;
export type AppLangCode = (typeof AppLangCodes)[number]

export interface AppContextState {
    locale: AppLangCode;
    updateLocale: (newLocale: string) => void;
}

export const AppContext = createContext<AppContextState>({
    locale: "en",
    updateLocale: () => {
        throw new Error("Function requires implementation");
    }
});

export function AppContextProvider({children}: { children: ReactNode }) {
    const [locale, setLocale] = useState<AppLangCode>("en");

    function updateLocale(newLocale: string) {
        //@ts-expect-error String validation happening
        if (!AppLangCodes.includes(newLocale)) {
            throw new Error(`Unsupported language "${newLocale}"`);
        }
        setLocale(newLocale as AppLangCode);
    }

    useEffect(() => {
        void changeLanguage(locale);
    }, [locale])

    return <AppContext.Provider value={{
        locale,
        updateLocale,
    }}>{children}</AppContext.Provider>
}
