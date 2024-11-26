import { DefaultTheme } from 'react-native-paper';

const CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#e86a10', // Cambia este color a tu preferencia
        background: '#f5f5f5',
        surface: '#ffffff',
        accent: '#03dac4',
        text: '#000000',
    },
};

export default CustomTheme;


export const COLORS = {
	desertSand: "#E4BE9E",
	honeyDew: "#D0E1D4",
	pearl: "#D9D2B6",
	cream: "#F2F6D0",
	dimGray: "#71697A",
};

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

