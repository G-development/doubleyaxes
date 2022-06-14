import { cpAbout, cpString, cpSwitch} from "./util";

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
      items: {
		 color: cpString("qAttributeExpressions.0.qExpression", "Color", "", "optional", "string", "expression"),
	    },
    },
    settings: {
      uses: "settings",
    },
    config: {
      type: "items",
      label: "Configuration",
      items: {
        paddingGroup: cpString("DYA.paddingGroup", "Padding between groups (0 to 1)", "", "optional", "number", "expression"),
        paddingBars: cpString("DYA.paddingBars", "Padding between bars (0 to 1)", "", "optional", "number", "expression"),
        gridSwitch: cpSwitch("DYA.gridSwitch", "Show grid", "Yes", "No", false),

        allSettings: {
          uses: "addons",
          items: {
            // Legend
            legendSettings: {
              type: "items",
              label: "Legend settings",
              items: {
                legendSwitch: cpSwitch("DYA.legendSwitch", "Show legend", "Yes", "No", false),
              }
            },
          }
        }
      },
    },

    about: cpAbout("extension", "1.0.0"),
  },
};
