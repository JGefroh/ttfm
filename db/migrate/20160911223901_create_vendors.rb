class CreateVendors < ActiveRecord::Migration
  def change
    create_table :vendors do |t|
      t.string :name, null: false
      t.text :description
      t.timestamps null: false
    end

    create_table :market_vendors do |t|
      t.references :vendor, null: false
      t.references :market, null: false
      t.timestamps null: false
    end

    Vendor.create(name: "Koko Crater Coffee Roasters", description: "fresh brewed Hawaii coffee")
    Vendor.create(name: "Aloun Farms", description: "a variety of local grown fruits and vegetables")
    Vendor.create(name: "Nalo LIFE", description: "Nalo Farm located in Waimanalo features Nalo Greens, Dandelion Greens, Braising Greens, Baby Kale (less cooking time for you), Baby Swiss Chard, Tat Soi, (their sub for spinach), Purslane, Okra, Baby Eggplant, fresh cut herbs, Nalo’s Morimoto Tomato (smaller), Nalo Tomato. In addition to their own farm offerings, they also sell produce from other farms – Sumida Watercress, Kamiya Papaya, Fat Law Baby Cucumber, Nozawa Corn, Ho Farm tomato, just to name a few.")
    Vendor.create(name: "Akamai Food’s Chef Sharon brings her famous oatcakes", description: " Date & Flax Seed, Cranberry & Walnut, Mango & Pumpkin with Pecan.  Also premium rum cakes, Pumpkin and Dark Chocolate, Taro Coconut, and original.  She also brings gourmet tofu steak musubi made with brown rice.  She features a rare seasonal tropical juice weekly!")
    Vendor.create(name: "Marine Agrifuture Sea Asparagus", description: "Dr. Sun’s famous Kahuku grown sea asparagus. Fresh or powdered form. Prepared Sea Asparagus in sushi, and tomato lomi style. Aquacultured ogo also available.")
    Vendor.create(name: "Green Valley", description: "Honey harvested from local hives")
    Vendor.create(name: "Hawaiian Chip Company", description: "One of KCC’s Original Vendors.  Hawaiian Chip Company features there Taro and Sweet Potato Chips all locally sourced from Mokuau Farm, L&R Farm, and Hawaii Xing Long Farm.")
    Vendor.create(name: "Music By", description: "Harold Uchino")
    Vendor.create(name: "Kahuku/Kahuku Na’ono", description: "Fresh island papaya, apple banana, eggplant, corn, as well as bath and body products featuring farm grown ingredients.  Kahuku Na’ono roasts fresh harvested local corn and adds your choice of creative and ono gourmet touch – Garlic Butter, Lilikoi Butter, Furikake, Herb Sprinkle and more.")
    Vendor.create(name: "Honolulu Gourmet", description: "sauces, dips, and dressings")
    Vendor.create(name: "Alii Seafood", description: " Will be featuring there locally caught Ama Ebi.  Fresh Local salt water shrimp frozen or grilled yakitori style.  A must try item.")
    Vendor.create(name: "North Shore Farms LLC dba BWT", description: "Jeanne’s famous Grilled Pesto Pizza is a must try. Now available in Birthday Heirloom Seed Collections.   Catch the Big Wave of Flavors with colorful Big Wave Tomatoes.")
    Vendor.create(name: "PacifiKool", description: "Coolers made with their signature Hawaiian Ginger Syrup, fruit, herbs.  Also, bottle of syrup to go.")
    Vendor.create(name: "Honolulu Burger Company", description: "Ken will be serving up SLIDERS and FRENCH FRIES yum! Honolulu Burger Company uses all locally soured ingredients from Parker Ranch, Kahua Ranch, Puuwaawaa Ranch, Mari’s Garden, Aloun Farms, Sugarland Farms, Alii and Shiimeji Mushroom Farm, Sumida Farm.")
    Vendor.create(name: "Hawaii’s Best Ever Nuts and Candy", description: "Mary the Nut Lady brings her line of gourmet seasoned baked nuts, candied fruit and nougats.  Macadamia, almonds, walnuts, pecans – she baked them up and toffees each batch fresh, her nougats too, with locally-sourced seasonings like honey, Maui Cane sugar, Naked Cow Dairy, Kona coffee, Hawaiian sea salts.")
    Vendor.create(name: "Thoune HongPhao Farm", description: "bringing cucumbers, eggplant, long bean, bitter melon, bananas, Okra and much much more.")
    Vendor.create(name: "Hawaii Beekeepers Association", description: "local honey products")
    Vendor.create(name: "Sea Salts of Hawaii", description: "A variety of Hawaiian Sea Salts. Maui Onion, Hawaiian Chili Pepper, Kiawe Smoked, Hawaiian Ginger, Spicy Hawaiian Seaweed and much more.")
    Vendor.create(name: "Made in Hawaii Foods", description: "Delectable mochi treats, an array of fruit preserves and fruit butters, sea salt, taro chips. Featured Special Persimmons from Hashimoto Farm in Kula and Kula Strawberries")
    Vendor.create(name: "Ono Pops", description: "Chef Josh mixes the perfect flavors together in making his locally-sourced gourmet paletas, the popsicle of Mexican cuisine.  Over 24 flavors – Mexican Chocolate, Li Hing Pineapple, Lychee, Okinawan Sweet Potato Pie, Lilikoi 50-50,  and my favorite Mountain Apple Rose and much more.")
    Vendor.create(name: "Hibachi", description: "serving fresh island poke made with local ahi, locally grown grape tomato kabobs, steak plates made with kulana beef and homemade cucumber kimchee from Pit Farm, you also have to try his barbecue kulana beef sticks.")
    Vendor.create(name: "Madre Chocolate", description: "Chocolates made in Kailua from locally-sourced cacao and featuring locally sourced ingredients. They also incorporate cacao grown on sustainable operations in Central America as well.")
    Vendor.create(name: "Happy Cakes", description: "Fruit cake with a Hawaii twist – macnuts and pineapple.")
    Vendor.create(name: "Kukui Sausage", description: "Original and specialty sausages Portuguese, Italian, Chicken, Pineapple, Chorizo & more! Grilled on a stick or a bun, frozen packs too")
    Vendor.create(name: "Two Hot Tomatoes", description: "fried green tomatoes, deep fried zucchini, sweet Maui onion rings; Two Hot Tomatoes Batter Mix, tomato chutney, green tomato jam")
    Vendor.create(name: "Hanalei Taro Co.", description: "Taro, poi and kulolo, taro muffins, taro mochi from Kauai.")
    Vendor.create(name: "Akaka Falls Farm", description: "Tropical fruit jams, jellies, fruit butters, honey.")
    Vendor.create(name: "Mauna Kea Tea", description: "Green Tea and Oolong Tea locally grown on their Farm")
    Vendor.create(name: "Bueno Salsa", description: "Salsa’s made from all locally sourced ingredients.")
    Vendor.create(name: "Otsuji Farm", description: "brings a huge variety of veggies and herb grown on their Hawaii Kai farm – Dino Kale, Red Kale, mizuna, daikon, purslane, green onion, radish, mustard cabbage, bok choy, beets, and more!  Don’t forget to try Chef Jonas Otsuji’s Sushi Surfer Sliders made with kale or eggplant grown on their farm, tempura’d and topped with spicy ahi, drizzles, and their green onion.")
    Vendor.create(name: "Nita’s", description: "Big Island anthuriums, dendrobiums, chrysanthemums")
    Vendor.create(name: "Dina’s Garden", description: "Specializing in rare and exotic plants and plant arrangements. We also serve refreshing lemonades, and other special and unique drinks made with Hawaii Grown ingredients")
    Vendor.create(name: "Daizu Tei", description: "Organic acai bowls with milk from locally grown soy beans.  And introducing Local Kim Chi.")
    Vendor.create(name: "Vilath Farm", description: "Asian greens and herbs, squash, Manoa lettuce, tomatoes, bittermelon, apple bananas, melons, papayas and other fruits and vegetables")
    Vendor.create(name: "Olay Thai", description: "Vegetarian Pad Thai Noodles, Papaya Salad, Banana Tapioca, and much more with all locally sourced ingredients.")
    Vendor.create(name: "Grace Foods", description: "Takoyaki")
    Vendor.create(name: "Waimanalo Country Farms", description: "fresh day-of-the-market harvested Super Sweet Dakota corn and homemade cornbread and there famous lemonade, strawberry lemonade and li hing lemonade al served in a special jar.")
    Vendor.create(name: "Aikane Plantation Coffee", description: "serves fresh Ka’u coffee and sells their roasted beans by the bag.  Coffee grown in the Ka’u region of the Big Island has been garnering major awards in the coffee world, come by and taste for yourself why.")
    Vendor.create(name: "Penny’s Orchids", description: "orchid plants")
    Vendor.create(name: "SKA Tropicals", description: "torch ginger, olena, heliconia and other tropical flowers, floral arrangements")
    Vendor.create(name: "SKA Tropicals", description: "Apple Banana and Frozen apple bananas on a stick or sliced up dipped in chocolate and choose between rainbow sprinkles or mac nuts.")
    Vendor.create(name: "PIT Farm", description: "a large variety of Asian veg & herbs, green onions, cucumber, Manoa lettuce, tomatoes, bittermelon, apple bananas, papayas, and local grown carrots and much more.")
    Vendor.create(name: "Ho Farms", description: "offers a wild array of cherry tomatoes Black Cherry, Kahuku Golden, Grape Toms, and more!  Eggplant, long beans and squash too.")
    Vendor.create(name: "Milner’s", description: "Just harvested lettuces, Tokyo Negi, $3 bags of Kale, Avocados etc. Milner Farm located in Pupukea")
    Vendor.create(name: "La Tour Bakehouse", description: "(formerly known as Ba-Le Bakery) has a wide variety of artisan breads, whole grain hamburger and hot dog buns, croissants, danish, granola, corn puffs, rice cakes and much more.")
    Vendor.create(name: "Kihene", description: "Hawaiian Herbal Teas all ingredients grown on the Big Island.  Teas are dried crushed or loose leaves.")
    Vendor.create(name: "Ahualoa Farm", description: "Features Macadamia Nuts with 15 different flavors from Lilikoi to Sea Salt")
    Vendor.create(name: "Big Island Abalone", description: "fresh, cooked, and hibachi Big Island abalone.  A must try Item.")
    Vendor.create(name: "Theng’s Farm", description: "a large variety of Asian vegetables, papaya, bananas")
    Vendor.create(name: "Pig and The Lady", description: " Chef Andrew, Mama Le and family changes their menu at each Market please visit pigandthelady.com for today’s menu.")
    Vendor.create(name: "Nosh", description: "Serves Pao de queijo (Brazilian Cheese Bread). There Pao De queijo is offered stuffed with dulce de leche, in a caprese sandwich, or with a fruit salad. locally sourced ingredients from Mao Farms, Fields of Aloha, Hoamoa Farm.")
    Vendor.create(name: "Once Again", description: "A nursery in Waimanalo creates small gardens of succulents or other easy care plants in “re-pur-posed” vessels such as spam cans, eggshells, teacups and much more.")
    Vendor.create(name: "NEW BRUG Bakery", description: "A large variety of high quality artisan baked breads and pastries made with local eggs, local dairy, local maui sugar, and local sea salts.")
    Vendor.create(name: "Licious Dishes", description: "brings raw, vegan, gluten-free eats Pad Thai Salad, Lasagna, Three Layer Dip, Chocolate Ganache, Kombucha Love Potion, Grainless Granola, Nori Kale, Date Manna Bars and More!")
    Vendor.create(name: "Growing Creations", description: "brings a diverse range of potted plants to market including orchids, herb and veg starters, flowers, citrus dwarf trees, and cacti.  They also sell the famous sustainable Bokashi, beneficial microorganismused to amend soil, provide plant nutrition and well-being, and compost your compost!")
    Vendor.create(name: "Ono Kettle Pop", description: "Delicious Kettle Popcorn combined with a variety of Hawaiian grown ingredients. Some of the flavors include island pop, cinnamon toast pop, Mexican pop, Hawaii red pop and much more.")
    Vendor.create(name: "KCC Culinary Students", description: "variety of fresh baked scones, cookies, bisquits, plus Shintaku suckling pig Kalua sliders on Taro Buns, Plantation Iced Tea")
    Vendor.create(name: "Cold Fyyre", description: "handmade ice cream created with locally sourced ingredients with cream from the Big Island and flavored with local fruit, coffee, chocolate, strawberries and much more. By the scoop or in their famous cookie sandwich confections. A must try item.")
    Vendor.create(name: "Som Good Things", description: "Authentic, all natural, State of Hawaii FDA approved Hawaiian Sea Salt from Kona, Hawaiian Sea Salt Seasonings, Hawaiian Alae Sea Salt, Hawaiian Salt Furikake, salad dressings, gourmet flour mixes.")
    Vendor.create(name: "Grandma G’s", description: "famous fried rice regular or kimchee.   Served with Peterson’s Upland Farm eggs with Redondo portugese sausage, bacon, or smoked sausage you can also try Granda G’s Sweet Bread French Toast.  Special Feature Grandma G’s Shaved Ice")
    Vendor.create(name: "Small Kine Farm", description: "is located in Waimanalo.  They grow Crimini and Portobello mushrooms.  They also make a mushroom fritter which is so fresh and juicy with a special sauce. Yum!")
    Vendor.create(name: "Hawaiian Style Chili Company", description: "serves assorted breakfast plates using local eggs, Ahi steak plate, and shrimp scampi.")
    Vendor.create(name: "North Shore Cattle Co.", description: "naturally raised hormone free beef from Haleiwa; all beef Portuguese and andouille sausages; grilled burgers, breakfast specials")
    Vendor.create(name: "Thai Farmers Association", description: "has a 10 acre farm located in Kunia where they grow cucumbers, tomatoes, string beans, daikon, eggplant, kale, chou sum, pak choi, parsley, green onion, squash, pumpkin, hot chili, sweet chili, bananas, sweet potato, broccoli, radish, papaya, snap peas, swiss chard and much more.  They also will feature free range organic fresh chicken eggs and Taro, Banana, and Ulu Chips.")
    Vendor.create(name: "Nalo Juice Stand", description: "Straight from Nalo Farms.  A healthy and refreshing juice.")
    Vendor.create(name: "Honey Girl Organic", description: "Featuring an Organic Honey Skincare Line")
    Vendor.create(name: "Big Island Bees", description: "Single Floral Honey from Big Island – pure raw organic honey , honey caramel sauce, honey mustard and handmade honey soap and balms.")
    Vendor.create(name: "Bale Sandwich 24", description: "Summer rolls, shrimp spring rolls, chicken sticks, and assorted vietnamese drinks")
    Vendor.create(name: "Loho Street Farm", description: "Chef John Memering brings his specialty seasonings and preserves made with locally sourced ingredients.")
    Vendor.create(name: "Olomana Tropicals", description: "Nurseyman Ken of  Olomana Tropical specializes in bromeliads.  He brings a great variety of bromeliads and other potted plants.")
    Vendor.create(name: "Small Kine Farm", description: "Small Kine Farm is located in Waimanalo.  They grow Crimini and Portobello mushrooms.")
    Vendor.create(name: "Haleahi Floral Nursery", description: "A nursery from Waianae featuring assorted plants.")
    Vendor.create(name: "Greenpoint Nursery", description: "cut flowers and anthurium plants")
    Vendor.create(name: "Hawaiian Crown Pineapple", description: "Local pineapple fresh, whole, or cut.  Pineapple smoothies, Juice, and much more.")

    market = Market.where(address: '4303 Diamond Head Road Honolulu, HI 96816').first;
    if market.present?
      Vendor.all.each do |vendor|
        MarketVendor.create(vendor: vendor, market: market)
      end
    end
  end
end
