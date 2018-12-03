// this stores the mock database we will be using
let mockRecipeData = [
	{
		id: 0,
		name: "Simple Japanese Broiled Unagi Eel",
		tags: ['seafood', 'fish', 'japanese', 'sweet', 'savoury', 'pescatarian'],
		ingredients: [
			{
				amount: 1,
				unit: 'package',
				name: 'eel'
			},
			{
				amount: 1,
				unit: 'cup',
				name: 'rice'
			},
			{
				amount: 2,
				unit: 'Tbsp',
				name: 'sesame oil'
			},
			{
				amount: 1,
				unit: 'Tbsp',
				name: 'soy sauce'
			},
			{
				amount: 3,
				unit: 'stalks',
				name: 'green onion'
			},
			{
				amount: 1,
				unit: 'tsp',
				name: 'salt'
			},
			{
				amount: 2,
				unit: 'Tbsp',
				name: 'vinegar'
			},
		],
		url: 'https://www.thespruceeats.com/simple-unagi-eel-1300601',
		image: 'https://www.thespruceeats.com/thmb/yg5sS3neCuGPqZusK4lQmMakXQ4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/unagi-562572477-5ab0659c3037130037478816.jpg'
	},
	{
		id: 1,
		name: "Oysters with Ginger and Scallions",
		tags: ['seafood', 'shellfish', 'chinese', 'salty', 'savoury'],
		ingredients: [
			{
				amount: 8,
				unit: null,
				name: 'oyster'
			},
			{
				amount: 2,
				unit: 'stalks',
				name: 'green onion'
			},
			{
				amount: 5,
				unit: 'pieces',
				name: 'ginger'
			},
			{
				amount: 1.5,
				unit: 'Tbsp',
				name: 'sugar'
			},
			{
				amount: 2,
				unit: 'Tbsp',
				name: 'soy sauce'
			},
			{
				amount: 1,
				unit: 'Tbsp',
				name: 'wine'
			},
			{
				amount: 1,
				unit: 'tsp',
				name: 'sesame oil'
			},
			{
				amount: 1,
				unit: 'dash',
				name: 'white pepper'
			},
		],
		url: 'https://thejanechannel.com/2011/06/26/%E8%96%91%E8%91%B1%E7%94%9F%E8%A0%94-oysters-with-ginger-and-scallions/',
		image: 'https://thejanechannel.files.wordpress.com/2011/06/img_5800_crop-bright.jpg?w=645&h=442'
	},
	{
		id: 2,
		name: "Keto Pancakes",
		tags: ['keto', 'sweet', 'vegetarian'],
		ingredients: [
			{
				amount: 2,
				unit: 'oz',
				name: 'cream cheese'
			},
			{
				amount: 2,
				unit: null,
				name: 'egg'
			},
			{
				amount: 2,
				unit: 'Tbsp',
				name: 'almond flour'
			},
			{
				amount: 1,
				unit: 'tsp',
				name: 'sweetener'
			},
			{
				amount: 1,
				unit: 'pinch',
				name: 'salt'
			},
			{
				amount: 1,
				unit: 'splash', // tf is a splash
				name: 'vanilla'
			},
		],
		url: 'https://jenniferbanz.com/low-carb-pancakes',
		image: 'https://146426-421413-1-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2016/11/low-carb-pancakes-1.jpg'
	},
	{
		id: 3,
		name: "Veggie Ranch Turkey Meatloaf",
		tags: ["paleo", "salty", "savoury"],
		ingredients: [
			{
				amount: 1.5,
				unit: 'lb',
				name: "ground turkey"
			},
			{
				amount: 2,
				unit: "Tbsp",
				name: "ghee"
			},
			{
				amount: 1,
				unit: null,
				name: "onion"
			},
			{
				amount: 2,
				unit: null,
				name: "eggs"
			},
			{
				amount: 2,
				unit: "cloves",
				name: "garlic"
			},
			{
				amount: .25,
				unit: "cup",
				name: "almond flour"
			},
			{
				amount: .5,
				unit: "cup",
				name: "ranch"
			}
			// truncated because holy cow that's a lot of ingredients in meatloaf
		],
		url: 'https://www.paleorunningmomma.com/ranch-turkey-meatloaf-paleo-whole30/',
		image: 'https://www.paleorunningmomma.com/wp-content/uploads/2018/01/turkey-meatloaf-7-600x900.jpg'
	},
	{
		id: 5,
		name: "Butternut Squash Chipotle Chili with Avocado",
		tags: ["vegetarian", "vegan", "spicy", "sweet"],
		ingredients: [
			{
				amount: 2,
				unit: "Tbsp",
				name: "olive oil"
			},
			{
				amount: 2,
				unit: null,
				name: "red bell pepper"
			},
			{
				amount: 1,
				unit: null,
				name: "butternut squash"
			},
			{
				amount: 4,
				unit: "cloves",
				name: "garlic"
			},
			{
				amount: 1,
				unit: null,
				name: "red onion"
			},
			{
				amount: 1,
				unit: "Tbsp",
				name: "chili powder"
			},
			{
				amount: .5,
				unit: "Tbsp",
				name: "chipotle pepper"
			},
			{
				amount: 1,
				unit: "tsp",
				name: "cumin"
			},
			{
				amount: .25,
				unit: "tsp",
				name: "cinnamon"
			},
			{
				amount: 1,
				unit: null,
				name: "bay leaf"
			},
			{
				amount: 2,
				unit: "cups",
				name: "vegetable broth"
			},
			{
				amount: 2,
				unit: "cans",
				name: "black beans"
			},
			{
				amount: 2,
				unit: null,
				name: "avocado"
			},
			{
				amount: 1,
				unit: "can",
				name: "diced tomatoes"
			}
		],
		url: 'https://cookieandkate.com/2012/butternut-squash-chipotle-chili-with-avocado/',
		image: 'https://cookieandkate.com/images/2012/09/butternut-squash-chipotle-chili-recipe-0-1-768x1147.jpg'
	},
	{
		id: 6,
		name: "Low Carb Oyster Recipe Broiled with Spicy Sauce",
		tags: ['keto', 'spicy', 'seafood', 'shellfish'],
		ingredients: [
			{
				amount: 12,
				unit: null,
				name: 'oyster'
			},
			{
				amount: 1,
				unit: 'Tbsp',
				name: 'garlic chili paste'
			},
			{
				amount: .125,
				unit: 'tsp',
				name: 'salt'
			},
			{
				amount: 7,
				unit: 'leaves',
				name: 'basil'
			},
			{
				amount: 1,
				unit: 'Tbsp',
				name: 'olive oil'
			},
		],
		url: 'https://ketogasm.com/low-carb-oysters-recipe-broiled-spicy-sauce-keto-gluten-free/',
		image: 'https://cdn1.ketogasm.com/wp-content/uploads/2017/09/low-carb-oyster-recipe-spicy-sauce-keto-2-770x513.jpg'
	},
];