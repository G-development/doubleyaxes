import { cpAbout, cpString, cpDropDownNumber, cpText } from "./util";

export default {
  type: "items",
  component: "accordion",
  items: {
    dimensions: {
      uses: "dimensions",
      min: 1,
      max: 1,
    },
    measures: {
      uses: "measures",
      min: 1,
      max: 2,
      items: {},
    },
    settings: {
      uses: "settings",
    },
    config: {
      type: "items",
      label: "Configuration",
      items: {
        // Insert component
      },
    },

    about: cpAbout("extension", "1.0.0"),
  },
};
