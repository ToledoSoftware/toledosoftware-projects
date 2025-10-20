// constants/Colors.ts

// Cor de destaque principal (Roxo do Dark Mode)
const tintColorLight = '#AA8E43'; // Dourado/Ocre para Light Mode
const tintColorDark = '#A78BFA';  // Roxo para Dark Mode

export default {
  light: {
    text: '#162447',             // --text-color (light)
    background: '#ffffff',       // --bg-color (light)
    tint: tintColorLight,        // --primary-color (light)
    tabIconDefault: '#ccc',      // --toggle-border (light)
    tabIconSelected: tintColorLight,
    // Cores personalizadas do seu CSS
    cardBackground: '#F8F8F8',   // --card-bg (light)
    borderColor: '#ccc',         // --toggle-border (light)
  },
  dark: {
    text: '#e0e0e0',             // --text-color (dark)
    background: '#0A0A0A',       // --bg-color (dark)
    tint: tintColorDark,         // --primary-color (dark)
    tabIconDefault: '#777777',   // --toggle-border (dark)
    tabIconSelected: tintColorDark,
    // Cores personalizadas do seu CSS
    cardBackground: '#1A1A1A',   // --card-bg (dark)
    borderColor: '#777777',      // --toggle-border (dark)
  },
};