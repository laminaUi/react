import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = {
    backgroundColor: string;
    foregroundColor: string;
};

type ThemeName = 'system' | 'light' | 'dark' | string;

type ThemeMap = {
    [key in ThemeName]: Theme;
};

type ThemeContextValue = {
    theme: ThemeName;
    setTheme: (theme: ThemeName) => void;
    themes: ThemeMap;
};

type ThemeProviderProps = {
    themes: ThemeMap;
    defaultTheme?: ThemeName;
    children?: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    setTheme: () => { },
    themes: {},
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({
    themes,
    defaultTheme = 'system',
    children,
}) => {
    const [theme, setTheme] = useState<ThemeName>(defaultTheme);

    useEffect(() => {
        // Sync theme across tabs and windows
        window.localStorage.setItem('theme', theme);
        window.localStorage.removeItem('theme');
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        // Themed browser UI with color-scheme
        const colorScheme = theme === 'dark' ? 'dark' : 'light';
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute('content', themes[theme].backgroundColor);
        document.documentElement.setAttribute('color-scheme', colorScheme);
    }, [theme, themes]);

    const value: ThemeContextValue = {
        theme,
        setTheme,
        themes,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const { theme, setTheme, themes } = useContext(ThemeContext);

    const toggleTheme = () => {
        const themeName = (prevTheme: ThemeName) => {
            const themeNames = Object.keys(themes) as ThemeName[];
            const currentIndex = themeNames.indexOf(prevTheme);
            const nextIndex = (currentIndex + 1) % themeNames.length;
            return themeNames[nextIndex];
        }
        const nextTheme = themeName(theme);
        setTheme(nextTheme);
    };


    return { theme, toggleTheme };
};



export default ThemeProvider;
