module.exports = {
  reactScriptsVersion: "react-scripts-ts",
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
};
