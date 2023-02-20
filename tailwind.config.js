/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'jump': 'bounce 1s ease-in infinite',
      },
      width: {
        1600: '1600px',
        400: '400px',
        450: '450px',
        210: '210px',
        550: '550px',
        260: '260px',
        650: '650px',
      },
      height: {
        600: '600px',
        280: '280px',
        900: '900px',
        458: '458px',
      },
      top: {
        ' 50%': '50%',
      },
      backgroundColor: {
        primary: '#21dd50',
        blur: '#030303',
        search: 'rgba(22, 24, 35, .06)',
        copyLink: 'rgba(22, 24, 35, 0.06)'
      },
      colors: {
        primary: '#21dd50',
        detail: 'rgba(22, 24, 35, 0.75)',
        border: 'rgba(22, 24, 35, 0.2)',
        length: 'rgba(22, 24, 35, .75)'
      },
      height: {
        '88vh': '88vh',
      },
      backgroundImage: {
        'blurred-img':
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
        'auth-img': 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80)',
        'bg-detail': 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLhACtB_rKzXjNwkpdLELL4wZ9urLWEuxsHg&usqp=CAU)'
      },
      flexGrow: {
        '2': 2,
        '1': 1,
        '3': 3,
        '10': 10,
      }
    },
  },
  plugins: [],
};