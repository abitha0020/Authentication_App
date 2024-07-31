// theme.js
import { createTheme } from '@shopify/restyle';

const palette = {
  black: '#0B0B0B',
  white: '#F0F2F3',
  blue: '#0A84FF',
  green: '#30D158',
  red: '#FF3B30',
  yellow: '#FFD60A',
  orange: '#f57c00'
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.black,
    primaryText: palette.black,
    primary: palette.blue,
    success: palette.green,
    danger: palette.red,
    warning: palette.yellow,
    buttonbackground:palette.orange,
    buttonText : '#ffffff',
    gray : '##808080'
  },
  spacing: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    defaults: {
      fontSize: 16,
      color: 'primaryText',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'primaryText',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'primaryText',
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'primaryText',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: 'buttonText',
    },

  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export default theme;
