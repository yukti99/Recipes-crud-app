from email import quoprimime
import json
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


recipes = [
    {
            "id": "120481",
            "title": "Pakoras",
            "summary": "Crispy on the outside and tender on the inside, fried vegetable pakoras make the most of just about any vegetables of your choice. Try them with potato, cauliflower, spinach leaves, onion, or paneer. Mix and match what you have with some sweet and spicy chutney for dipping.",
            "image": "https://www.thespruceeats.com/thmb/S2W3C2zBnM1arhNRNXFsv0ygpx8=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bhajias-fried-indian-snack-1958032-hero-04-2da195c65c4a4ab3a569b2a5a8ac5fb7.jpg",
            "courses":["Breakfast", "Snacks"],
            "author": "Raj Johri",
            "ingredients": [
                "1 cup Bengal gram flour",
                "1/2 teaspoon red chili powder",
                "1 pinch asafoetida",
                "1/2 teaspoon turmeric",
                "1 teaspoon thymol seeds",
                "Salt to taste",
                "1 head cauliflower",
                "1 medium red onion",
                "1 medium potato",
                "1 cup spinach",
                "6 to 8 ounces paneer"
            ],
            "instructions": [
                "Gather the ingredients.",
                "Mix the gram flour and all the spices with a little water at a time in a bowl, to make a thick batter, slightly thicker than pancake batter. Add salt to taste.",
                "If using cauliflower, separate the florets into bite-sized pieces. The potatoes and onions should be thinly sliced. Trim the stems off of the spinach leaves. Cube the paneer into 1-inch cubes.",
                "Preheat oil and reduce the flame to medium. This will allow the bhajias to cook well both on the outside and inside.",
                "Drain on paper towels and serve with tamarind chutney or tomato ketchup."
            ],
            "prep_time": "10",
            "cooking_time": "30",
            "total_time": "40",
            "servings": "6",
            "rating": "4.7"
        },
        {
            "id": "458933",
            "title": "Rajma Biryani",
            "summary": "This is a fragrant rice pulao or pilaf made with kidney beans, rice, aromatics, herbs and spices. It makes for a filling and heart lunch or dinner. How many times have we thought rice is a blessing? We use it for holy purposes but we also can pressure up a quick pulao or khichdi when hunger pangs are drumming away! This is one grain that is about 98% percent digestible. In India we are familiar with Basmati, Patna or brown rice but it is also available as Italian Rice and Glutinous Rice which is popular in Chinese and Japanese cuisine",
            "image": "https://imgk.timesnownews.com/story/iStock-1214464511.jpg?tr=w-600,h-450,fo-auto",
            "courses":["Lunch", "Dinner","Popular"],
            "author": "Aryan Mehta",
            "ingredients": [
                "Basmati Rice 1½ cups",
                "Kidney Beans boiled 2 cups",
                "Kidney beans stock 2 cups",
                "Ghee 3½ tablespoons",
                "Garam masala powder 1 teaspoon",
                "Turmeric powder a pinch",
                "Cloves 3-4",
                "Green cardamoms 5-6",
                "Green chilli paste 1 teaspoon",
                "Yogurt 1 cup",
                "Juice of 1 lemon",
                "Coriander leaves finely chopped",
                "Fresh mint leaves ",
                "Salt to taste",
                "Saffron (kesar) a few strands"
            ],
            "instructions": [
                "Heat 2 tbsps ghee in a rice cooker. Add kidney beans, ginger-garlic paste, red chilli powder, garam masala powder, turmeric powder, green cardamom powder, cloves, green cardamoms, green chilli paste, bay leaves, kidney beans stock, ½ cup browned onions, ginger strips, yogurt, lemon juice, coriander leaves and 2 tablespoons chopped mint leaves, salt and mix well.",
                "Put the cooker on cook mode.",
                "Spread the rice over the kidney beans mixture. Sprinkle the remaining mint leaves, remaining browned onion and saffron strands over the rice.",
                "Drizzle some ghee on top.",
                "Cook for 12-15 minutes or till the cooker comes on warm mode.",
                "Transfer into a serving bowl and serve hot."
            ],
            "prep_time": "20",
            "cooking_time": "40",
            "total_time": "60",
            "servings": "4",
            "rating": "4.8"
        },
        {
            "id": "130338",
            "title": "Kheer (Indian Rice Pudding)",
            "summary": "This creamy rice pudding is delicately flavored with cardamom and full of nuts. It's a great dessert for any time of the year. In south and east India versions of it are made for certain festivals. In the South, kheer is called payasam and in the east, it is known as payesh.",
            "image": "https://www.thespruceeats.com/thmb/MQ8KFwHKn-PRxrZmMbuBYAPhM2c=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/kheer-payasam-rice-pudding-1957827-84c4680664254f03815991474d510336.jpg",
            "courses":["Dessert","Sweet","Lunch"],
            "author": "Yukti Khurana",
            "ingredients": [
                "2 liters full-cream milk",
                "1 can/400 grams sweetened condensed milk",
                "1 tsp. cardamom powder",
                "1 cup of sugar",
                "1 cup Basmati rice",
                "50 grams almonds blanched and slivered",
                "50 grams raisins",
                "A few strands of saffron",
                "Optional: rose petals to garnish"
            ],
            "instructions": [
                "Wash the rice well and soak for half an hour in enough water to cover it fully.",
                "Put the milk, condensed milk and sugar in a deep, thick-bottomed pan and boil. When the milk comes to a boil, add the rice and simmer. Cook till the milk thickens and reduces to half its original volume.",
                "Add the almonds, raisins, and cardamom and cook for 5 more minutes.",
                "Turn off the cooktop and add the saffron.",
                "Stir well.",
                "Allow the kheer to cool, then chill.",
                "Serve cold garnished with rose petals."
            ],
            "prep_time": "20",
            "cooking_time": "50",
            "total_time": "70",
            "servings": "6",
            "rating": "4.5"
        },
        {
            "id": "234243",
            "title": "Mutter Paneer",
            "summary": "Mutter (meaning peas) paneer (a semi-solid form of cottage cheese) is probably the most frequently ordered vegetarian dish in Indian restaurants. The mild flavors of the paneer (cottage cheese) and peas in it, marry beautifully with the delicious tomato-based sauce of this curry! Mutter paneer is a great side dish in a non-vegetarian meal but also the perfect main dish in a vegetarian one. Serve it with chapati, paratha, or naan or even on a bed of plain boiled basmati rice.",
            "image": "https://www.thespruceeats.com/thmb/eTcDn4OcPp6qgT8TNx0OJwaJ4sk=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mutter-paneer-peas-cottage-cheese-curry-1957971-hero-01-fe2c40de95ce41358589b3a7f01b2d97.jpg",
            "courses": ["Dinner","Popular","Lunch"],
            "author": "Bretta Amani",
            "ingredients": [
                "2 large onions, quartered",
                "3 medium tomatoes, quartered",
                "6 tablespoons cooking oil, divided",
                "1 pound paneer, cubed",
                "1 tbs ginger-garlic paste",
                "2 teaspoons ground coriander",
                "1/2 teaspoon turmeric",
                "2 teaspoons garam masala",
                "2 green chilies",
                "1 cup shelled peas",
                "Salt, to taste",
                "3 tablespoons heavy cream",
                "1/3 cup fresh cilantro leaves"
            ],
            "instructions": [
                "Gather the ingredients.",
                "Grind the onions into a fine paste in a food processor. Keep aside.",
                "Next grind tomatoes into a fine paste and keep aside.",
                "Heat 2 to 3 tablespoons of the vegetable oil in a deep pan and gently stir-fry the cubes of paneer till golden.",
                "When golden, remove onto a paper towel and keep aside.",
                "In the same vessel, heat the remaining 2 to 3 tablespoons of the vegetable oil and add the onion paste. Fry till it turns light brown. You will need to stir frequently to avoid the paste burning. Also, do not over-fry as it will turn bitter and ruin the curry. Another hassle-free way to do this is to chop the onions fine and then sauté till pale golden, then grind in the food processor.",
                "When the onion paste is fried, add tomato paste, ginger and garlic paste, and sauté for another 2 minutes.",
                "Next, add the coriander, cumin, turmeric, and garam masala powders, and the finely chopped green chilies and sauté, stirring continuously, till the cooking oil begins to separate from the masala (spice mixture).",
                "Now add the peas to the masala and fry for 2 to 3 minutes.",
                "Then add the previously fried paneer, hot water, and salt, to taste, reduce the heat to a simmer and cook till the gravy thickens.",
                "When the gravy is as thick as you would like, turn off the heat and stir in the cream.",
                "Garnish with coriander leaves and serve with chapati, paratha, naan, or jeera rice."
            ],
            "prep_time": "15",
            "cooking_time": "30",
            "total_time": "45",
            "servings": "5",
            "rating": "4.9"
        },
        {
            "id": "343111",
            "title": "South Indian Lemon Rice",
            "summary": "Lemon rice is one of the most common dishes from South India, where it also goes by the name chitranna. There are a few variations to making this dish and this is just one of them. This rice is usually eaten alone or with raita, yogurt, chutney, or kosambari (a type of salad). It's not uncommon for people to pack this rice with them while traveling as it transports well. This dish gains flavor from using whole seeds that you grind yourself in order to release their oils.",
            "image": "https://www.thespruceeats.com/thmb/n3ZdFzxHLwZTa-7NeaVyq829NsM=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/south-indian-lemon-rice-1957723-hero-02-18047e2504ad42fa96817e047c075ac3.jpg",
            "courses": ["Light","Lunch","Veg"],
            "author": "Rohit Kapoor",
            "ingredients": [
                "1 teaspoon coriander seeds",
                "2 tablespoons cooking oil",
                "1 teaspoon mustard seeds",
                "3 to 4 curry leaves",
                "2 green chiles, slit lengthwise",
                "1 (1-inch) piece ginger, grated",
                "1/2 cup roasted unsalted peanuts",
                "1 teaspoon turmeric",
                "Juice of 2 lemons",
                "2 cups cooked basmati rice, or leftover rice",
                "Salt, to taste"
            ],
            "instructions": [
                "Gather the ingredients.",
                "Gently roast and then coarsely grind the coriander seeds into powder. Set aside.",
                "Heat the oil in a pan and add the mustard seeds, curry leaves, and green chiles. Fry the mixture until the splattering stops.",
                "Add the ginger and peanuts. Fry the mixture for another minute.",
                "Add the turmeric powder and turn off the burner.",
                "Add the lemon juice and mix well.",
                "Add the rice, roasted coriander powder, and salt to taste and mix thoroughly. Enjoy."
            ],
            "prep_time": "5",
            "cooking_time": "20",
            "total_time": "25",
            "servings": "2",
            "rating": "4.2"
        },
        {
            "id": "98689",
            "title": "Bhindi Dopiaza (Okra)",
            "summary": "The word Dopiaza literally means 'onions twice.' This North Indian recipe calls for onions to be used in large quantities and in two separate batches at different stages of the preparation. It is easy to cook, but the end results are so delicious, it tastes like you spent hours and hours lovingly preparing it. Okra is well-loved in India and there are numerous dishes made with it, especially in North India. Bhindi Dopiaza tastes delicious with hot chapatis and a pickle.",
            "image": "https://www.thespruceeats.com/thmb/PYCJB__mUHXs14mSF7DF-iRH2dU=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bhindi-dopiaza-okra-dopiaza-1957897-hero-01-25b32e9f4eeb45e9a8d497adc1fa9cef.jpg",
            "courses": ["Lunch","Spicy","Dinner"],
            "author": "Amy Underwood",
            "ingredients": [
                "1/2 kg (approx. 1 lb) Bhindi/Okra",
                "3 tbsp of cooking oil",
                "3 large onions (chopped fine)",
                "3 tsp coriander seeds",
                "2 tsp cumin seeds",
                "2 tsp garam masala powder",
                "1/2 tsp turmeric powder",
                "2 tbsp garlic paste",
                "2 tbsp ginger paste",
                "2 medium-sized tomatoes (chopped fine)",
                "Salt to taste",
                "3 tbsps freshly chopped coriander"
            ],
            "instructions": [
                "Gather the ingredients.",
                "Wash the bhindi and pat dry to remove all surface moisture and ensure that when the bhindi is cut, it does not turn slimy. This is a natural property of the bhindi and while some people like it, others will not eat bhindi because of its 'slime'.",
                "Cut the top (stalk) and tail off each bhindi and then cut it into circular pieces, 1 inch thick. Do this for all the bhindis and keep aside.",
                "Heat a griddle or small, flat pan on a medium flame and gently roast the coriander and cumin seeds until aromatic. Remove from fire and grind into a coarse powder in a clean, dry coffee grinder. Keep aside for later.",
                "Separate the chopped onions into 2 portions, roughly 2/3 and 1/3 of the whole.",
                "Heat the cooking oil in a large pan over a medium flame and add the first lot of onions, the 2/3 portion. Sauté till golden.",
                "Add all the powdered spices, ginger and garlic pastes and sauté for 2 to 3 minutes.",
                "Add the tomatoes and sauté for 2 to 3 minutes. Add the salt to taste.",
                "Add the remaining 1/3 portion of chopped onion and mix well. Fry till these onions turn soft and translucent.",
                "Reduce heat to a simmer and add the cut okra. Cook until the okra turns soft but not mushy. Stir frequently. This is a dry stir fry type dish and cooks in the liquids released from the vegetables, but you may need to sprinkle some water occasionally to prevent the dish from burning while it cooks. Only do this if necessary.",
                "When the okra is done (roughly 7 to 10 minutes from when you add it to the pan), remove from heat, garnish with the freshly chopped coriander and serve with hot chapatis and pickle."
            ],
            "prep_time": "10",
            "cooking_time": "20",
            "total_time": "30",
            "servings": "4",
            "rating": "4.5"
        },
        {
            "id": "15632",
            "title": "Moong Dal: Yellow Lentil",
            "summary": "Enjoy this flavorful vegetarian and vegan Indian food recipe of mung dal. Mung dal, sometimes spelled \" moong dal, \" or Indian-flavored yellow lentils, are a traditional vegetarian Indian recipe. As an added benefit, lentils are ridiculously cheap and are a great source of protein for vegetarians and vegans. This recipe is vegetarian, vegan, and gluten-free (check your ingredients to be 100 percent sure, particularly the vegetable broth and spices). If you do not want to use olive oil, feel free to coat the pan with nonstick spray instead.",
            "image": "https://www.thespruceeats.com/thmb/WEgY1UQRcstMPgQa-_9WPQT8TGg=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/vegetarian-mung-dhal-recipe-3378496-hero-03-f1c34f2638ff46d9880130cda0c61e3e.jpg",
            "courses": ["Dinner","Healthy","Light", "Veg"],
            "author": "Jay Johnson",
            "ingredients": [
                "1 cup mung dal",
                "2 cups water or vegetable broth",
                "1 teaspoon turmeric",
                "Dash cayenne pepper",
                "1/2 teaspoon kosher salt",
                "2 tablespoons olive oil",
                "1 onion, diced",
                "1 teaspoon cumin seeds",
                "2 whole cloves",
                "Freshly ground black pepper"
            ],
            "instructions": [
                "Gather the ingredients.",
                "In a large soup or stock pan, combine mung dal or yellow lentils, vegetable broth, turmeric, cayenne, and salt. Bring to a slow simmer.",
                "Cover partially with a lid and allow to cook for at least 20 minutes, and up to 30 to 40 minutes if you prefer a smoother dal. You can add a bit more liquid if needed.",
                "In a separate skillet, saute onion, cumin seeds, and clove in olive oil for just a few minutes over medium heat, until onions are soft.",
                "Add onions and spices to mung dal or lentils and allow to simmer for a few more minutes, stirring well to combine. Sprinkle with a dash of black pepper and add extra salt to taste, if needed. Serve plain, as soup, or over rice.",
                "Dal tends to thicken up a bit as it cools, so you may want to add a bit more water if you are planning on having leftovers. However, personal preference also plays a role in how thin or how thick you prefer your dal to be. It's always easy to add more liquid."
            ],
            "prep_time": "10",
            "cooking_time": "20",
            "total_time": "30",
            "servings": "4",
            "rating": "3.4"
        },
        {
            "id": "738292",
            "title": "Chicken Tikka Masala",
            "summary": "Fans of Chicken Tikka Masala claim it is the new British national dish. It can rightly claim to be a British favourite. This recipe is quick and easy to make and you can adjust the amount of chili powder to how hot you like it. One tsp of chili powder will give you a mildly spiced curry.",
            "image": "https://www.thespruceeats.com/thmb/94lxITd7T7oPhX7lGpHpolfdjSc=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/seitan-tikka-masala-on-rice-with-soy-yogurt-and-served-with-paratha-breads-and-tea-556451893-58a713563df78c345b722c99.jpg",
            "courses": ["Lunch","Popular","Dinner","Non Veg"],
            "author": "Afreen Aggarwal",
            "ingredients": [
                "4 free-range chicken breasts, cut into 1-cm",
                "2 1/2 centimeters ginger, peeled and grated",
                "1 garlic clove, finely diced",
                "Dash salt",
                "Dash freshly ground black pepper",
                "1/2 cup finely chopped coriander",
                "3 tablespoons vegetable oil",
                "1 teaspoon chilli powder",
                "1 red onion, roughly chopped",
                "1 teaspoon ground turmeric",
                "10 ounces light cream, or plain yogurt",
                "1 tablespoon tomato puree"
            ],
            "instructions": [
                "Gather the ingredients.",
                "In a large stainless steel or glass bowl place the chicken with the ginger, garlic, salt, pepper, chopped coriander, lime juice and zest with 1 tbsp of the oil. Stir then cover with a clean cloth, leave to one side for 30 minutes.",
                "After 30 mins, heat one tbsp of the oil in a large frying pan or wok add the chicken and cook for 8 to 10 minutes until browned all over.",
                "Stir in the cream and gently simmer for 5 minutes. Add the chicken and simmer for another 5 minutes. Add the tomato puree, and stir. Finally, add the lemon juice. Cook for one minute more then serve garnished with fresh coriander. Boiled rice, warm naan bread or chapatis are delicious served alongside."
            ],
            "prep_time": "20",
            "cooking_time": "45",
            "total_time": "65",
            "servings": "4",
            "rating": "4.9"
        },
        {
            "id": "49910",
            "title": "Samosas",
            "summary": "These little fried parcels of flaky-yet-tender pastry, stuffed to the brim with spiced potatoes and other ingredients, are pretty much my idea of the world’s greatest savoury snack. Not only are they insanely delicious, but they’re also incredibly versatile. Samosas can be served as appetisers, entrees, or a lunch on the move. They’re good hot or at room temperature. They keep for days and days, and they reheat well. What is not to love?!?",
            "image": "https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800",
            "courses":["Snacks", "Popular", "Appetizer", "Fried"],
            "author": "Rajeev Grover",
            "ingredients": [
                "2 cup all purpose flour",
                "1 teaspoon cumin seeds",
                "1 teaspoon crushed ginger",
                "1 teaspoon raisins",
                "5 boiled potato",
                "1 teaspoon coriander powder",
                "1 teaspoon red chilli powder",
                "1 teaspoon kasoori methi leaves",
                "1 teaspoon carom seeds",
                "1/4 cup water",
                "2 cup refined oil",
                "1/2 teaspoon coriander seeds",
                "1 teaspoon green chilli",
                "1 teaspoon cashews",
                "1 teaspoon cumin powder",
                "1/2 teaspoon garam masala powder",
                "salt as required",
                "1 teaspoon coriander leaves",
                "2 tablespoon ghee",
                "1 handful raw peanuts"                              
            ],
            "instructions": [
                "To make delicious samosas at home, first, make the filling. Put a pan on medium flame and add 2 tsp oil in it. Once the oil is hot enough, add cumin seeds and allow them to crackle.",
                "Add spices and boiled potatoes and cook for a while",
                "Mix well and saute for 2 minutes. Your stuffing is ready!",
                "Now, to prepare the dough, take a mixing bowl and combine all-purpose flour along with carom seeds and salt. Mix and then add ghee and start kneading by adding a little water at a time. Ensure that you add water gradually and make a firm dough.",
                "Once done, roll out few small-sized balls from the dough. Flatten them further with the help of your palms and then with a rolling pin. ",
                "Fill the semi-circle with potato filling.",
                "Then, heat oil in a pan and deep fry the samosas on low heat until they turn golden brown and crispy. Serve with tomato ketchup and green chutney. Enjoy it as a tea-time snack!"
            ],
            "prep_time": "20",
            "cooking_time": "30",
            "total_time": "50",
            "servings": "2",
            "rating": "4.8"
    
        },
        {
            "id": "918330",
            "title": "Gulab Jamun",
            "summary": "Gulab jamun (or gulaab jamun) is among India's most popular desserts and is often referred to as Indian doughnuts. This delicious treat consists of soft, melt-in-your-mouth, fried dumplings that are traditionally made of thickened or reduced milk and then soaked in a sugar syrup made with rose water (which you can buy or make). This recipe uses powdered milk and heavy cream, but the results are just as delicious.",
            "image": "https://www.funfoodfrolic.com/wp-content/uploads/2020/07/Gulab-Jamun-Thumbnail.jpg",
            "courses":["Dessert", "Sweet","Fried"],
            "author": "Amruta Yadav",
            "ingredients": [
                "6 cups water",
                "3 cups granulated sugar",
                "1 tablespoon cardamom powder",
                "2 tablespoons rose water",
                "3 cups powdered milk",
                "1 1/2 cups all-purpose flour",
                "1 1/2 teaspoons baking powder",
                "1 cup heavy cream, or double cream, thickened",
                "Vegetable, canola, or sunflower oil, for frying"                      
            ],
            "instructions": [
                "Gather the ingredients.",
                "In a deep pan, mix the water and sugar and boil until all the sugar is dissolved.",
                "Turn off the heat and add the ground cardamom and rose water. Mix well and set aside.",
                "In a large bowl, mix well the powdered milk, flour, and baking powder.",
                "A little at a time, add some of the heavy cream while kneading. You want to make a dough that is medium-soft but not sticky. You do not need to use all the cream, just enough to reach the desired consistency; the smoother it is, the better, and the less likely the dough will become hard when it's fried.",
                "Lightly grease the palms of your hands.",
                "Once the dough is ready, divide it into walnut-sized balls, rolling it between your palms until nice and smooth.",
                "While you are making the balls, heat the oil in a wide pan on low to medium heat. Use enough oil so the doughnuts will be submerged.",
                "Carefully add the gulab jamun and fry, stirring often to brown on all sides.",
                "Once cooked, remove the doughnuts with a slotted spoon, allowing the oil to drain.",
                "Transfer immediately into the rose syrup.",
                "Repeat this until all the dumplings are cooked and in the syrup. Allow the gulab jamun to soak in the syrup for at least 2 hours before serving. "

            ],
            "prep_time": "20",
            "cooking_time": "20",
            "total_time": "40",
            "servings": "5",
            "rating": "3.5"
    
        },
        {
            "id": "657333",
            "title": "Kadhi Yogurt Curry",
            "summary": "Kadhi is a popular Indian dish that originated in the Rajasthan in northern India. They are made differently in different parts of India and are almost always vegetarian. Kadhis made in north India are soup-like in their consistency with either vegetables or fritters in them, while south Indian Kadhi does not include Pakodis (gram flour fritters) or turmeric. It is made with yogurt and has a distinctive tangy flavor, unlike its North Indian counterpart. South Indian kadhi is mild and fairly easy to cook, which makes it a great family dish to throw together quickly. It is considered good to eat when you have an upset tummy as it is made with ingredients that have digestive benefits. It does not keep well so plan to eat the kadhi soon after you make it; reheating will cause the yogurt to curdle. Serve with Basmati rice.",
            "image": "https://www.thespruceeats.com/thmb/naIgpFAE1Xl--CbpXMBVwEuzbVs=/940x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/dill-and-peanut-kadhi-is-healthy-version-of-north-indian-kadhi--925612280-5ae393218e1b6e0037e39482.jpg",
            "courses": ["Lunch","Veg","Flavours"],
            "author": "Param Shekhawat",
            "ingredients": [
                "2 tablespoons cumin seeds",
                "2 3/4 cups (250 grams) coconut, freshly grated",
                "2 green chilies, to taste, optional",
                "3 cups plain yogurt, tangy",
                "1 cup water",
                "1 dash salt, or to taste",
                "3 tablespoons vegetable cooking oil, or ghee",
                "2 dry red chilies, broken into small pieces",
                "10 curry leaves",
                "Fresh coriander (cilantro), chopped, for garnish"
            ],
            "instructions": [
                "Gather the ingredients.",
                "Heat a griddle over medium heat. When hot, add the cumin seeds and dry roast until they are slightly fragrant and start to darken in color. Set aside to cool.",
                "Combine the grated coconut, green chilies, and toasted cumin seeds in a food processor and grind to a smooth paste.",
                "In a bowl, whisk the yogurt until smooth; add the water and stir to blend well.",
                "Add the coconut-spice paste and salt to taste and stir well.",
                "Transfer the mixture to a heavy-bottomed pan and heat slowly over medium heat. Stir occasionally to prevent the mixture from sticking to the pan or scorching.",
                "Meanwhile, heat the vegetable oil or ghee in a small pan over medium heat; add the dry red chilies, cumin seeds, and curry leaves. Be very careful to avoid getting burned as the chilies, seeds, and leaves will cause the oil to splutter. Cook until the spluttering stops.",
                "Just before the yogurt mixture comes to a boil, turn off the heat and add the oil, chilies, seeds, and leaves.",
                "Spoon into a large bowl or individual bowls and garnish with freshly chopped coriander. Enjoy!"
            ],
            "prep_time": "10",
            "cooking_time": "30",
            "total_time": "40",
            "servings": "4",
            "rating": "3.4"
        },
        {
            "id": "236536",
            "title": "Baingan Aloo (Eggplant Potatoes)",
            "summary": "Vegetable dishes are quite common in the world of Indian cuisine. Eggplants, which are also known as baingan in Hindi, are featured in a wide range of dishes. This recipe for baingan aaloo ki subji is really easy and turns out a delicious dish that tastes great when served with hot chapatis. Raita is also a nice touch if you'd like to dip the baingan into it. This baingan recipe is best made and eaten fresh. Like lots of other Indian foods, it does, however, taste even better when it is reheated and eaten the next day. A great accompaniment for baingan aaloo ki subji is any type of daal curry.",
            "image": "https://www.thespruceeats.com/thmb/ASfdl9YWacrzy_rddkukysa-x7c=/580x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/baingan-aaloo-ki-subji-1957933-step-13-9a387fc60eb647e28bee010d61ad522a.jpg",
            "courses": ["Lunch","Healthy","Dinner"],
            "author": "Fardeen Khan",
            "ingredients": [
                "1 large eggplant, cut into 2-inch chunks (or 8-10 baby eggplants)",
                "3 tablespoons canola oil",
                "1 teaspoon cumin seeds",
                "1 large onion, finely chopped",
                "2 large potatoes, cut into 1-inch cubes",
                "1 teaspoon cumin powder",
                "1/4 teaspoon turmeric powder",
                "Optional: 1/2 teaspoon red chili powder",
                "2 large tomatoes, cut into 1-inch cubes",
                "Kosher salt to taste",
                "Garnish: fresh coriander chopped"
            ],
            "instructions": [
                "Gather the ingredients.",
                "Prepare the eggplants by washing, patting dry, and cutting into quarters.",
                "Soak the eggplant in warm water.",
                "In a deep pan, heat the cooking oil on a medium flame until it is hot.",
                "Add the cumin seeds and fry them until they no longer splutter.",
                "Add the onions and fry them until they are slightly soft and translucent.",
                "Then, add the diced eggplant and the potato cubes, stir and mix well. Sauté it for about 2 minutes.",
                "Add the coriander powder, cumin powder, turmeric powder, the red chili powder, and the chopped tomato. Stir to mix everything well and then sauté for another 2 to 3 minutes.",
                "Sprinkle water on top of the vegetables and stir everything to mix well.",
                "Cover the dish and cook it until the vegetables are almost done. Check occasionally and stir to prevent burning or sticking to the bottom of the pan.",
                "When Cook until both the potatoes and the eggplant are soft and cooked throughout. This is meant to be a dryish dish so cook off any extra water that may be present in it. nearly cooked, remove the cover from the dish and stir.",
                "When done, turn off the heat and then garnish with chopped, fresh coriander leaves. Serve with hot chapatis and a daal dish if you like. A spicy, tangy pickle also tastes great with this delicious subji. You can even add raita if you wish."
            ],
            "prep_time": "10",
            "cooking_time": "30",
            "total_time": "40",
            "servings": "4",
            "rating": "3.2"
        },
        {
            "id": "13432",
            "title": "Dal Makhani",
            "summary": "Crispy on the outside and tender on the inside, fried vegetable pakoras make the most of just about any vegetables of your choice. Try them with potato, cauliflower, spinach leaves, onion, or paneer. Mix and match what you have with some sweet and spicy chutney for dipping.",
            "image": "https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-3.jpg",
            "cuisine":"Indian",
            "courses":["Dinner", "Popular", "Evening", "Event"],
            "author": "Shruti Singh",
            "ingredients": [
                "1 cup Bengal gram flour",
                "1/2 teaspoon red chili powder",
                "1 pinch asafoetida",
                "1/2 teaspoon turmeric",
                "1 teaspoon thymol seeds",
                "Salt to taste",
                "1 head cauliflower",
                "1 medium red onion",
                "1 medium potato",
                "1 cup spinach",
                "6 to 8 ounces paneer"],
            "instructions": [
                "Gather the ingredients.",
                "Prepare the eggplants by washing, patting dry, and cutting into quarters.",
                "Soak the eggplant in warm water.",
                "In a deep pan, heat the cooking oil on a medium flame until it is hot.",
                "Add the cumin seeds and fry them until they no longer splutter.",
                "Add the onions and fry them until they are slightly soft and translucent.",
                "Then, add the diced eggplant and the potato cubes, stir and mix well. Sauté it for about 2 minutes.",
                "Add the coriander powder, cumin powder, turmeric powder, the red chili powder, and the chopped tomato. Stir to mix everything well and then sauté for another 2 to 3 minutes.",
                "Sprinkle water on top of the vegetables and stir everything to mix well.",
                "Cover the dish and cook it until the vegetables are almost done. Check occasionally and stir to prevent burning or sticking to the bottom of the pan.",
                "When Cook until both the potatoes and the eggplant are soft and cooked throughout. This is meant to be a dryish dish so cook off any extra water that may be present in it. nearly cooked, remove the cover from the dish and stir.",
                "When done, turn off the heat and then garnish with chopped, fresh coriander leaves. Serve with hot chapatis and a daal dish if you like. A spicy, tangy pickle also tastes great with this delicious subji. You can even add raita if you wish."
            ],
            "prep_time": "10",
            "cooking_time": "30",
            "total_time": "40",
            "servings": "4",
            "rating": "4.3"
    
        }
    
    ]
    

# ROUTES
@app.route('/')
def home_page():
   return render_template('home_page.html',recipes=recipes)   


@app.route('/view/<id>')
def view_recipe(id=None):
	recipe = list(filter(lambda r: r['id'] == id, recipes))[0]
	ing_len = len(recipe['ingredients'])
	recipe['ing1'] = recipe['ingredients'][0:int(ing_len/2)+1]
	recipe['ing2'] = recipe['ingredients'][int(ing_len/2)+1:]
	rating = int(round(float(recipe['rating'])))
	recipe['stars'] = [i for i in range(rating)]
	recipe['empty'] = [i for i in range(5-rating)]
	if ('courses' not in recipe.keys()):
		recipe['courses'] = ""
	return render_template('view_recipe.html', recipe=recipe) 



# @app.route('/search/<query>')
# def search(query):
# 	print("query =",query)
# 	results = []    
# 	q = query.lower()
# 	for recipe in recipes:		
# 		if q in recipe["title"].lower():
# 			recipe['match'] = 'title'
# 			results.append(recipe)
# 		if q in recipe['author'].lower():
# 			recipe['match'] = 'author'
# 			results.append(recipe)
# 		if 'courses' in recipe.keys():
# 			c = [i.lower() for i in recipe['courses']]
# 			if q in c:	
# 				recipe['match'] = 'courses'
# 				results.append(recipe)
# 		if 'cuisine' in recipe.keys():
# 			if q in recipe["cuisine"].lower():
# 				recipe['match'] = 'cuisine'
# 				results.append(recipe)

# 	return render_template('search_results.html', results=results, search_text=query)

@app.route('/search/<query>')
def search(query):
    results = []
    q = query.lower()
    for recipe in recipes:
        if q in recipe["title"].lower():
            recipe['match'] = 'title'
            results.append(recipe)
        if q in recipe['author'].lower():
            recipe['match'] = 'author'
            results.append(recipe)
        if 'courses' in recipe.keys():
            c = [i.lower() for i in recipe['courses']]
            for i in c:
                if q in i:
                    recipe['match'] = 'courses'
                    results.append(recipe)

    return render_template('search_results.html', results=results, search_text=query)   



    

@app.route('/add')
def add():
	return render_template('add_recipe.html')


@app.route('/edit/<query>')
def update(query):
	print("query")
	recipe = {}
	for i in recipes:
		if query==i['id']:
			return render_template('edit_recipe.html', recipe=i)
	print("ID does not exist!")
	
@app.route('/save_recipe', methods=['GET', 'POST'])
def save_recipe():
	global recipes
	json_data = request.get_json()
	r = json_data["recipe"]
	recipes.append(r)
	print("\nRECIPES: \n")
	print(recipes)
	print()
	return jsonify(recipes=recipes)

@app.route('/edit_recipe', methods=['GET', 'POST'])
def edit_recipe():
	global recipes
	json_data = request.get_json()
	r = json_data["recipe"]
	for i in range(len(recipes)):
		if recipes[i]['id'] == r['id']:
			recipes[i] = r
			print(recipes[i])
			break

	return jsonify(recipes=recipes)




if __name__ == '__main__':
   app.run(debug = True)




