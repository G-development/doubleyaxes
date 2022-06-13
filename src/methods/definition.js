import {cpAbout,cpString,cpDropDownNumber,cpText} from './util'

export default {
	type: "items",
	component: "accordion",
	items: {
		settings: {
			uses: "settings",
		
		},
		config: {
			type: "items",
			label: "Configuration",
			items:{
				// Insert component 
			}
		
		},
		
		about: cpAbout("extension", "1.0.0"),
	},
}
