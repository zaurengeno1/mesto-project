const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: "^3.34.0",
      // какой пресет использовать
      targets: {
        // какие версии браузеров поддерживать
        edge: "17",
        ie: "11",
        firefox: "50",
        chrome: "64",
        safari: "11.1",
      },

      // использовать полифилы для браузеров из свойства target
      // по умолчанию babel использует полифилы библиотеки core-js
      useBuiltIns: "entry",
    },
  ],
];

module.exports = { presets };
