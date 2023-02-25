import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

type ThemeName = 'system' | 'light' | 'dark' | string;

export const useTheme = (): { theme: ThemeName; toggleTheme: () => void } => {
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
