module.exports = {
  theme: {
    extend: {
      colors: {
        "yt-primary": "#0f0f0f",
        "yt-control": "#ffffff",
        "yt-mono": "#d9d9d9",
        "yt-text": "#f1f1f1",
      },
      fontSize: {
        yt: ["14px", "36px"],
      },

      borderRadius: {
        yt: "18px;",
      },
      fontFamily: {
        yt: ["Roboto", "Arial", "sans-serif"],
      },
      keyframes: {
        "yt-feedback": {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "yt-feedback": "yt-feedback 0.4s ease-in-out",
      },
    },
  },
};
