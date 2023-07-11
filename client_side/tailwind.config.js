module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          0: '#000000',
          1: '#00659D',
          2: '#85151C',
          3: '#9DB700',
          4: '#0C2085',
          5: '#C60018',
        },
        background: '#FAEEEE',
        foreground: '#EEDFDF',
        Card: '#FFFFFF',
        "Navbar_bg": '#85151C',
        "Table_bg":'#D9D9D9',
        "Items_bg":'#EEDFDF',
        "row_hover_bg":"#f7f3f3"
      },
      fontSize: {
        xxs: '9.5px',
      },
    },
  },
  plugins: [],
};