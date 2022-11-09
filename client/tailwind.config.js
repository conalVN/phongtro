module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
      backgroundColor: {
        primary: "#F5F5F5",
        secondary1: "#1266dd",
        secondary2: "#f73859",
        "overlay-30": "rgba(0, 0, 0 , 0.3)",
        "overlay-70": "rgba(0, 0, 0 , 0.7)",
      },
      maxWidth: {
        150: "150px",
        500: "500px",
        600: "600px",
        1100: "1100px",
      },
      minWidth: {
        200: "200px",
      },
      cursor: {
        ponter: "ponter",
      },
      flex: {
        3: "3 3 0%",
      },
    },
  },
  plugins: [],
};
