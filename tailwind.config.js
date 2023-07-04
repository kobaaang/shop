/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{jsx,js}"],
   theme: {
      extend: {
         fontFamily: {
            'logoFont': ['Playfair Display', ''],
         },
         colors: {
            //
            brand: '#eee'
         }
      },
   },
   plugins: [],
}

