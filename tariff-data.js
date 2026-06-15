/* ═══════════════════════════════════════════════════════════
   TARIFF DATA — SINGLE SOURCE OF TRUTH
   All tariff rates, product examples, timeline, and metadata.
   Update THIS FILE ONLY when tariff rates change.
   ═══════════════════════════════════════════════════════════ */

const CURRENT_YEAR = new Date().getFullYear();
const DATA_LAST_UPDATED = '2026-06-15';
const DATA_VERSION = '2.1.0';

// ── Country Tariff Rates ──
const COUNTRIES = {
    china: {
        name: 'China', flag: '🇨🇳', code: 'CN', slug: 'china',
        baseRate: 30, section301: true, deminimis: false,
        reciprocalRate: 34, ieepRate: 20,
        tradeRelationship: 'Strategic Competitor',
        topExports: ['Electronics', 'Clothing', 'Toys', 'Furniture', 'Machinery'],
        note: `China faces the highest US tariff rates. The May 2025 US-China deal reduced rates from 145% to ~30% base, but Section 301 duties still apply on top for many categories.`,
        detailedNote: `China's tariff situation is the most complex of any US trading partner. The current effective rates are a combination of: (1) Pre-existing Section 301 tariffs from 2018-2019 trade war (7.5-25%), (2) IEEPA tariffs of 20% added Feb-Mar 2025 citing fentanyl emergency, (3) Reciprocal tariffs of 34% added April 2025, and (4) The May 14, 2025 Geneva deal that reduced the combined IEEPA+reciprocal portion to 30% for 90 days, subsequently extended. Section 301 duties remain on top for specific product categories. The de minimis exemption ($800 duty-free threshold) has been suspended for all Chinese shipments since May 2, 2025.`,
        keyFacts: [
            'Largest US trading partner by import volume',
            'De minimis ($800 duty-free) exemption suspended',
            'Section 301 duties apply on TOP of base rates',
            'Some electronics had temporary exemptions (now expired)',
            'Over $400 billion in annual imports affected'
        ]
    },
    vietnam: {
        name: 'Vietnam', flag: '🇻🇳', code: 'VN', slug: 'vietnam',
        baseRate: 46, section301: false, deminimis: true,
        reciprocalRate: 46, ieepRate: 0,
        tradeRelationship: 'Growing Partner',
        topExports: ['Clothing', 'Footwear', 'Electronics', 'Furniture', 'Seafood'],
        note: 'Vietnam faces a 46% reciprocal tariff rate. Many manufacturers relocated from China to Vietnam, but new tariffs followed.',
        detailedNote: 'Vietnam became a major beneficiary of the 2018-2019 US-China trade war as manufacturers relocated production. However, the April 2025 reciprocal tariffs imposed a steep 46% rate on Vietnamese goods, partially offsetting the China-avoidance advantage. During the 90-day pause, the rate was reduced to the 10% baseline, but has since been partially reimposed.',
        keyFacts: [
            'Major Nike and Samsung manufacturing hub',
            'Benefited heavily from China trade war relocation',
            '46% reciprocal tariff partially offsets China advantage',
            'Key supplier of footwear to US market',
            'Trade deal negotiations ongoing'
        ]
    },
    india: {
        name: 'India', flag: '🇮🇳', code: 'IN', slug: 'india',
        baseRate: 26, section301: false, deminimis: true,
        reciprocalRate: 26, ieepRate: 0,
        tradeRelationship: 'Strategic Partner',
        topExports: ['Pharmaceuticals', 'Textiles', 'Jewelry', 'IT Services', 'Chemicals'],
        note: 'India faces a 26% reciprocal tariff. Negotiations ongoing for a bilateral trade deal.',
        detailedNote: 'India was assigned a 26% reciprocal tariff rate based on US calculations of Indian trade barriers. India is positioning itself as an alternative to China for manufacturing, particularly in electronics (Apple iPhone assembly). A US-India trade deal could significantly reduce these rates.',
        keyFacts: [
            'Apple expanding iPhone production in India',
            'Major pharmaceutical exporter to US',
            'Generic drug exports may have partial exemptions',
            'Bilateral trade deal under negotiation',
            'Growing electronics manufacturing hub'
        ]
    },
    mexico: {
        name: 'Mexico', flag: '🇲🇽', code: 'MX', slug: 'mexico',
        baseRate: 25, section301: false, deminimis: true,
        reciprocalRate: 0, ieepRate: 25,
        tradeRelationship: 'USMCA Partner',
        topExports: ['Vehicles', 'Auto Parts', 'Electronics', 'Fresh Produce', 'Beer'],
        note: 'Mexico faces 25% tariffs under IEEPA (fentanyl-related). USMCA-compliant goods may qualify for reduced rates.',
        detailedNote: 'Mexico\'s tariffs are primarily imposed under IEEPA authority citing fentanyl trafficking concerns, not reciprocal trade policy. USMCA (formerly NAFTA) compliant goods may qualify for reduced or zero duty rates, but the IEEPA tariffs override in many cases. Mexico is the largest US trading partner by total trade volume and a critical supplier of vehicles, auto parts, and fresh produce.',
        keyFacts: [
            'Largest US trading partner by total trade volume',
            'USMCA compliance may reduce rates for some goods',
            'Critical avocado and fresh produce supplier',
            'Major auto manufacturing hub (GM, Ford, Toyota)',
            'Beer and tequila exports heavily impacted'
        ]
    },
    canada: {
        name: 'Canada', flag: '🇨🇦', code: 'CA', slug: 'canada',
        baseRate: 25, section301: false, deminimis: true,
        reciprocalRate: 0, ieepRate: 25,
        tradeRelationship: 'USMCA Partner',
        topExports: ['Oil & Gas', 'Vehicles', 'Lumber', 'Aluminum', 'Dairy'],
        note: 'Canada faces 25% tariffs under IEEPA (fentanyl-related). USMCA-compliant goods may qualify for reduced rates.',
        detailedNote: 'Like Mexico, Canada\'s tariffs are imposed under IEEPA authority. Canada is particularly impacted in lumber (affecting US housing costs), aluminum, oil/gas, and dairy sectors. Cross-border auto manufacturing is deeply integrated, with parts crossing the US-Canada border multiple times during assembly.',
        keyFacts: [
            'Second-largest US trading partner',
            'Energy (oil/gas) is largest export category',
            'Lumber tariffs directly impact US housing costs',
            'Deeply integrated auto supply chain with US',
            'Retaliatory tariffs imposed on US goods'
        ]
    },
    eu: {
        name: 'European Union', flag: '🇪🇺', code: 'EU', slug: 'eu',
        baseRate: 20, section301: false, deminimis: true,
        reciprocalRate: 20, ieepRate: 0,
        tradeRelationship: 'Major Ally',
        topExports: ['Vehicles', 'Machinery', 'Pharmaceuticals', 'Wine & Spirits', 'Cheese'],
        note: 'EU faces a 20% reciprocal tariff. Auto tariffs at 25% are particularly impactful for European automakers.',
        detailedNote: 'The EU was assigned a 20% reciprocal tariff rate. European automakers (BMW, Mercedes, Audi, VW, Porsche) are heavily impacted by the 25% auto tariff. European luxury goods, wine, cheese, and olive oil have all seen significant price increases. The EU has imposed retaliatory tariffs on American goods including bourbon, Harley-Davidson motorcycles, and agricultural products.',
        keyFacts: [
            'Major luxury vehicle exporter (BMW, Mercedes, Porsche)',
            'Wine, cheese, and olive oil prices up 20%+',
            'Retaliatory tariffs on US bourbon and Harleys',
            'Pharmaceutical trade partially exempt',
            'Trade deal negotiations stalled'
        ]
    },
    japan: {
        name: 'Japan', flag: '🇯🇵', code: 'JP', slug: 'japan',
        baseRate: 24, section301: false, deminimis: true,
        reciprocalRate: 24, ieepRate: 0,
        tradeRelationship: 'Close Ally',
        topExports: ['Vehicles', 'Auto Parts', 'Electronics', 'Machinery', 'Medical Devices'],
        note: 'Japan faces a 24% reciprocal tariff. Auto tariffs at 25% are particularly impactful for Toyota, Honda, Nissan.',
        detailedNote: 'Japan is one of the most significantly impacted US allies. The auto sector is critical — Toyota, Honda, Nissan, Subaru, and Mazda all face the 25% auto tariff on vehicles assembled in Japan. Japanese electronics (Sony, Panasonic, Canon) and gaming (Nintendo, Sony PlayStation) also face increased rates.',
        keyFacts: [
            'Auto tariffs hit Toyota, Honda, Nissan, Subaru hard',
            'Sony PlayStation and Nintendo Switch affected',
            'Japanese whisky and sake face higher duties',
            'Electronics (cameras, audio) tariffs increased',
            'Close security ally complicates trade tensions'
        ]
    },
    south_korea: {
        name: 'South Korea', flag: '🇰🇷', code: 'KR', slug: 'south-korea',
        baseRate: 25, section301: false, deminimis: true,
        reciprocalRate: 25, ieepRate: 0,
        tradeRelationship: 'Ally',
        topExports: ['Semiconductors', 'Vehicles', 'Electronics', 'Steel', 'Petrochemicals'],
        note: 'South Korea faces a 25% reciprocal tariff. Electronics (Samsung, LG) and auto (Hyundai, Kia) sectors heavily affected.',
        detailedNote: 'South Korea is impacted across electronics and auto sectors. Samsung and LG consumer electronics face increased tariffs, while Hyundai and Kia vehicles face the 25% auto tariff. However, some US-assembled Korean-brand vehicles avoid the tariff.',
        keyFacts: [
            'Samsung and LG electronics affected',
            'Hyundai/Kia vehicles face 25% auto tariff',
            'K-beauty products face increased duties',
            'Semiconductor exports may have partial exemptions',
            'KORUS free trade agreement partially offset'
        ]
    },
    taiwan: {
        name: 'Taiwan', flag: '🇹🇼', code: 'TW', slug: 'taiwan',
        baseRate: 32, section301: false, deminimis: true,
        reciprocalRate: 32, ieepRate: 0,
        tradeRelationship: 'Strategic Partner',
        topExports: ['Semiconductors', 'Electronics', 'Machinery', 'Plastics', 'Chemicals'],
        note: 'Taiwan faces a 32% reciprocal tariff. Semiconductor-related products may have exemptions.',
        detailedNote: 'Taiwan\'s tariff situation is heavily influenced by the semiconductor industry. TSMC, the world\'s largest chip manufacturer, produces chips critical to the US tech industry. Some semiconductor products have carve-outs or exemptions, but consumer electronics assembled in Taiwan face full rates.',
        keyFacts: [
            'TSMC semiconductor exports may be partially exempt',
            'Consumer electronics face full 32% rate',
            'ASUS and Acer computers affected',
            'Critical to global chip supply chain',
            'Bicycle exports face significant tariffs'
        ]
    },
    thailand: {
        name: 'Thailand', flag: '🇹🇭', code: 'TH', slug: 'thailand',
        baseRate: 36, section301: false, deminimis: true,
        reciprocalRate: 36, ieepRate: 0,
        tradeRelationship: 'Partner',
        topExports: ['Electronics', 'Vehicles', 'Seafood', 'Rubber', 'Jewelry'],
        note: 'Thailand faces a 36% reciprocal tariff rate.',
        detailedNote: 'Thailand is a significant electronics and automotive manufacturing hub in Southeast Asia. Thai-made hard drives (Western Digital, Seagate) and auto parts are particularly affected.',
        keyFacts: ['Major hard drive manufacturing center', 'Auto parts production hub', 'Seafood and rice exports affected', 'Jewelry and gems face higher duties', 'Tourism not directly affected by tariffs']
    },
    bangladesh: {
        name: 'Bangladesh', flag: '🇧🇩', code: 'BD', slug: 'bangladesh',
        baseRate: 37, section301: false, deminimis: true,
        reciprocalRate: 37, ieepRate: 0,
        tradeRelationship: 'Developing Partner',
        topExports: ['Clothing', 'Textiles', 'Footwear', 'Leather Goods', 'Jute'],
        note: 'Bangladesh faces a 37% reciprocal tariff. Major impact on clothing/textiles exports to US.',
        detailedNote: 'Bangladesh is the second-largest garment exporter in the world after China. Major US brands like H&M, Zara, Gap, and Walmart source heavily from Bangladesh. The 37% tariff significantly increases costs for budget and mid-range clothing.',
        keyFacts: ['Second-largest garment exporter globally', 'Major H&M, Gap, Walmart supplier', 'Clothing prices up 25-40% for Bangladeshi goods', 'Leather goods also heavily affected', 'One of the least developed countries impacted']
    },
    indonesia: {
        name: 'Indonesia', flag: '🇮🇩', code: 'ID', slug: 'indonesia',
        baseRate: 32, section301: false, deminimis: true,
        reciprocalRate: 32, ieepRate: 0,
        tradeRelationship: 'Partner',
        topExports: ['Palm Oil', 'Rubber', 'Textiles', 'Footwear', 'Electronics'],
        note: 'Indonesia faces a 32% reciprocal tariff rate.',
        detailedNote: 'Indonesia is a major footwear manufacturer (Nike, Adidas) and palm oil exporter. The 32% tariff affects athletic shoes, casual footwear, and food products containing palm oil.',
        keyFacts: ['Major Nike and Adidas shoe manufacturing', 'Palm oil exports widely used in food products', 'Textile and garment sector affected', 'Coffee exports face higher duties', 'Natural rubber products impacted']
    },
    uk: {
        name: 'United Kingdom', flag: '🇬🇧', code: 'GB', slug: 'uk',
        baseRate: 10, section301: false, deminimis: true,
        reciprocalRate: 10, ieepRate: 0,
        tradeRelationship: 'Special Relationship',
        topExports: ['Machinery', 'Vehicles', 'Pharmaceuticals', 'Scotch Whisky', 'Aerospace'],
        note: 'UK faces the 10% global baseline tariff. A US-UK trade deal may reduce this.',
        detailedNote: 'The UK faces the minimum 10% global baseline tariff (Section 122). Post-Brexit, the UK has been negotiating a bilateral trade deal with the US that could reduce or eliminate these tariffs. Scotch whisky, Rolls-Royce/Bentley vehicles, and British fashion brands are most affected.',
        keyFacts: ['Lowest tariff rate among major US partners', 'Scotch whisky tariffs impact premium spirits', 'Rolls-Royce, Bentley, Jaguar Land Rover affected', 'US-UK trade deal under negotiation', 'Aerospace components (Rolls-Royce engines) affected']
    },
    brazil: {
        name: 'Brazil', flag: '🇧🇷', code: 'BR', slug: 'brazil',
        baseRate: 10, section301: false, deminimis: true,
        reciprocalRate: 10, ieepRate: 0,
        tradeRelationship: 'Partner',
        topExports: ['Soybeans', 'Crude Oil', 'Iron Ore', 'Coffee', 'Beef'],
        note: 'Brazil faces the 10% global baseline tariff rate.',
        detailedNote: 'Brazil primarily exports commodities to the US. Coffee, beef, orange juice, and ethanol are key consumer-facing exports affected by the 10% baseline tariff.',
        keyFacts: ['Coffee prices affected by 10% tariff', 'Brazilian beef imports face duties', 'Orange juice concentrate tariffs', 'Steel and aluminum have separate tariffs', 'Ethanol exports impacted']
    },
    other: {
        name: 'Other Country', flag: '🌐', code: 'XX', slug: 'other',
        baseRate: 10, section301: false, deminimis: true,
        reciprocalRate: 10, ieepRate: 0,
        tradeRelationship: 'Varies',
        topExports: ['Varies'],
        note: 'Most countries face at minimum the 10% global baseline tariff (Section 122).',
        detailedNote: 'All countries not listed individually face at minimum the 10% global baseline tariff imposed under Section 122 on April 2, 2025. Some countries may have higher reciprocal rates that are not listed here.',
        keyFacts: ['10% minimum baseline applies globally', 'Some countries may have higher reciprocal rates', 'Check specific country trade agreements', 'Duty-free programs (GSP) suspended for some nations']
    }
};

// ── Product Category Tariff Rates ──
const CATEGORIES = {
    electronics: {
        name: 'Electronics & Tech', emoji: '📱', slug: 'electronics',
        chinaAdditional: 24, otherAdjust: 0, preTariffRate: 0,
        importPercent: 85,
        description: 'Smartphones, laptops, tablets, TVs, gaming consoles, cameras, wearables',
        contextFact: 'Over 85% of consumer electronics sold in the US are imported, with China being the dominant supplier. Pre-2025, most electronics entered duty-free.',
        subCategories: {
            smartphones: { name: 'Smartphones', avgPrice: 999, chinaExtra: 24 },
            laptops: { name: 'Laptops & Computers', avgPrice: 1200, chinaExtra: 24 },
            tablets: { name: 'Tablets', avgPrice: 500, chinaExtra: 24 },
            tvs: { name: 'TVs & Monitors', avgPrice: 800, chinaExtra: 20 },
            gaming: { name: 'Gaming Consoles', avgPrice: 499, chinaExtra: 24 },
            cameras: { name: 'Cameras', avgPrice: 1500, chinaExtra: 15 },
            wearables: { name: 'Smartwatches & Wearables', avgPrice: 350, chinaExtra: 24 },
            headphones: { name: 'Headphones & Audio', avgPrice: 250, chinaExtra: 20 },
            accessories: { name: 'Phone Cases & Accessories', avgPrice: 30, chinaExtra: 24 }
        },
        seoKeywords: ['electronics tariff calculator', 'tariff on electronics from China', 'tech tariff rates', 'how much tariff on electronics'],
        affectedBrands: ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Lenovo', 'Nintendo', 'Microsoft', 'Google']
    },
    clothing: {
        name: 'Clothing & Apparel', emoji: '👕', slug: 'clothing',
        chinaAdditional: 15, otherAdjust: 5, preTariffRate: 12,
        importPercent: 97,
        description: 'Shirts, pants, dresses, outerwear, uniforms, activewear',
        contextFact: 'The US imports 97% of its clothing. Even before 2025, clothing had some of the highest existing tariff rates (12-32% average). New tariffs compound on top.',
        subCategories: {
            tshirts: { name: 'T-Shirts & Basics', avgPrice: 25, chinaExtra: 15 },
            jeans: { name: 'Jeans & Denim', avgPrice: 60, chinaExtra: 15 },
            dresses: { name: 'Dresses', avgPrice: 80, chinaExtra: 15 },
            outerwear: { name: 'Jackets & Outerwear', avgPrice: 150, chinaExtra: 18 },
            activewear: { name: 'Activewear & Athleisure', avgPrice: 70, chinaExtra: 15 },
            suits: { name: 'Suits & Formal', avgPrice: 300, chinaExtra: 12 },
            underwear: { name: 'Underwear & Basics', avgPrice: 15, chinaExtra: 15 }
        },
        seoKeywords: ['clothing tariff calculator', 'tariff on clothes', 'fashion import duty', 'fast fashion tariff rate'],
        affectedBrands: ['Nike', 'H&M', 'Zara', 'Gap', 'Lululemon', 'Shein', 'Temu', 'Uniqlo']
    },
    automotive: {
        name: 'Auto Parts & Vehicles', emoji: '🚗', slug: 'automotive',
        chinaAdditional: 0, otherAdjust: 15, preTariffRate: 2.5,
        importPercent: 50,
        description: 'Vehicles, engines, tires, replacement parts, EV batteries',
        contextFact: 'The 25% auto tariff affects ALL imported vehicles regardless of origin. The average new car price has increased $4,000-$12,000 due to tariffs and supply chain effects.',
        subCategories: {
            sedan: { name: 'Sedan / Compact', avgPrice: 28000, chinaExtra: 0 },
            suv: { name: 'SUV / Crossover', avgPrice: 42000, chinaExtra: 0 },
            truck: { name: 'Pickup Truck', avgPrice: 48000, chinaExtra: 0 },
            luxury: { name: 'Luxury Vehicle', avgPrice: 65000, chinaExtra: 0 },
            ev: { name: 'Electric Vehicle', avgPrice: 45000, chinaExtra: 25 },
            parts: { name: 'Replacement Parts', avgPrice: 200, chinaExtra: 10 },
            tires: { name: 'Tires', avgPrice: 150, chinaExtra: 10 }
        },
        seoKeywords: ['car tariff calculator', 'auto import tariff', 'car tariff rate', 'vehicle import duty'],
        affectedBrands: ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Hyundai', 'Kia', 'VW', 'Subaru']
    },
    food: {
        name: 'Food & Groceries', emoji: '🍎', slug: 'food',
        chinaAdditional: 5, otherAdjust: -5, preTariffRate: 5,
        importPercent: 15,
        description: 'Fresh produce, packaged food, beverages, seafood, dairy, coffee',
        contextFact: 'About 15% of the US food supply is imported. Fresh produce from Mexico, seafood, and specialty items like olive oil and cheese from Europe are most affected.',
        subCategories: {
            produce: { name: 'Fresh Produce', avgPrice: 5, chinaExtra: 0 },
            seafood: { name: 'Seafood & Fish', avgPrice: 15, chinaExtra: 10 },
            dairy: { name: 'Cheese & Dairy', avgPrice: 8, chinaExtra: 0 },
            coffee: { name: 'Coffee & Tea', avgPrice: 12, chinaExtra: 5 },
            wine: { name: 'Wine & Spirits', avgPrice: 25, chinaExtra: 0 },
            olive_oil: { name: 'Olive Oil & Cooking Oils', avgPrice: 12, chinaExtra: 0 },
            snacks: { name: 'Imported Snacks & Candy', avgPrice: 5, chinaExtra: 5 },
            spices: { name: 'Spices & Seasonings', avgPrice: 8, chinaExtra: 5 }
        },
        seoKeywords: ['grocery tariff calculator', 'tariff on food', 'food import duty', 'how tariffs affect grocery prices'],
        affectedBrands: ['Imported produce brands', 'European cheese makers', 'Chilean/Argentine wineries', 'Brazilian coffee']
    },
    furniture: {
        name: 'Furniture & Home', emoji: '🪑', slug: 'furniture',
        chinaAdditional: 20, otherAdjust: 0, preTariffRate: 0,
        importPercent: 60,
        description: 'Sofas, beds, tables, home decor, rugs, lighting',
        contextFact: 'About 60% of furniture sold in the US is imported, with China and Vietnam being the largest suppliers. Many items have seen 25-50% price increases.',
        subCategories: {
            sofa: { name: 'Sofa / Couch', avgPrice: 1200, chinaExtra: 20 },
            bed: { name: 'Bed Frame & Mattress', avgPrice: 800, chinaExtra: 20 },
            table: { name: 'Dining Table', avgPrice: 600, chinaExtra: 20 },
            desk: { name: 'Office Desk', avgPrice: 400, chinaExtra: 20 },
            decor: { name: 'Home Decor', avgPrice: 50, chinaExtra: 20 },
            lighting: { name: 'Lighting & Lamps', avgPrice: 100, chinaExtra: 18 }
        },
        seoKeywords: ['furniture tariff calculator', 'tariff on furniture from China', 'home goods import duty'],
        affectedBrands: ['IKEA', 'Wayfair', 'Ashley', 'West Elm', 'Pottery Barn']
    },
    toys: {
        name: 'Toys & Games', emoji: '🧸', slug: 'toys',
        chinaAdditional: 24, otherAdjust: 0, preTariffRate: 0,
        importPercent: 80,
        description: 'Action figures, board games, dolls, educational toys, puzzles',
        contextFact: 'Over 80% of toys sold in the US are manufactured in China. The toy industry has been one of the hardest hit, with some products seeing 50%+ price increases.',
        subCategories: {
            action_figures: { name: 'Action Figures', avgPrice: 25, chinaExtra: 24 },
            board_games: { name: 'Board Games', avgPrice: 35, chinaExtra: 24 },
            lego: { name: 'Building Sets (LEGO)', avgPrice: 60, chinaExtra: 24 },
            dolls: { name: 'Dolls & Accessories', avgPrice: 30, chinaExtra: 24 },
            educational: { name: 'Educational Toys', avgPrice: 40, chinaExtra: 24 },
            outdoor: { name: 'Outdoor Play Equipment', avgPrice: 150, chinaExtra: 20 }
        },
        seoKeywords: ['toys tariff calculator', 'tariff on toys from China', 'LEGO tariff', 'holiday toy prices tariff'],
        affectedBrands: ['LEGO', 'Mattel', 'Hasbro', 'Fisher-Price', 'Melissa & Doug']
    },
    appliances: {
        name: 'Home Appliances', emoji: '🏠', slug: 'appliances',
        chinaAdditional: 15, otherAdjust: 5, preTariffRate: 2,
        importPercent: 70,
        description: 'Washing machines, refrigerators, microwaves, air conditioners, vacuums',
        contextFact: 'Appliance tariffs have been building since 2018 (washing machine tariffs under Section 201). New tariffs compound on existing duties, significantly raising prices.',
        subCategories: {
            washer: { name: 'Washing Machine', avgPrice: 800, chinaExtra: 15 },
            refrigerator: { name: 'Refrigerator', avgPrice: 1200, chinaExtra: 15 },
            dishwasher: { name: 'Dishwasher', avgPrice: 600, chinaExtra: 15 },
            microwave: { name: 'Microwave', avgPrice: 150, chinaExtra: 15 },
            ac: { name: 'Air Conditioner', avgPrice: 400, chinaExtra: 15 },
            vacuum: { name: 'Vacuum / Robot Vacuum', avgPrice: 350, chinaExtra: 18 }
        },
        seoKeywords: ['appliance tariff calculator', 'tariff on appliances', 'washing machine tariff', 'home appliance import duty'],
        affectedBrands: ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'Dyson', 'iRobot']
    },
    sports: {
        name: 'Sports & Outdoor', emoji: '⚽', slug: 'sports',
        chinaAdditional: 15, otherAdjust: 0, preTariffRate: 3,
        importPercent: 75,
        description: 'Equipment, bikes, camping gear, fitness equipment, golf clubs',
        contextFact: 'Most sports equipment and bicycles are manufactured in Asia. E-bikes from China face some of the highest combined tariff rates.',
        subCategories: {
            bikes: { name: 'Bicycles & E-Bikes', avgPrice: 800, chinaExtra: 20 },
            fitness: { name: 'Fitness Equipment', avgPrice: 500, chinaExtra: 15 },
            golf: { name: 'Golf Equipment', avgPrice: 400, chinaExtra: 12 },
            camping: { name: 'Camping & Hiking Gear', avgPrice: 200, chinaExtra: 15 },
            balls: { name: 'Balls & Team Sports', avgPrice: 30, chinaExtra: 15 }
        },
        seoKeywords: ['sports equipment tariff', 'bicycle tariff rate', 'fitness equipment import duty'],
        affectedBrands: ['Trek', 'Peloton', 'Titleist', 'The North Face', 'Yeti']
    },
    beauty: {
        name: 'Beauty & Personal Care', emoji: '💄', slug: 'beauty',
        chinaAdditional: 10, otherAdjust: -3, preTariffRate: 2,
        importPercent: 40,
        description: 'Skincare, cosmetics, haircare, fragrances, personal care',
        contextFact: 'Korean and Japanese beauty products ("K-beauty", "J-beauty") face reciprocal tariffs. Chinese-manufactured cosmetics hit by full China tariff rates.',
        subCategories: {
            skincare: { name: 'Skincare', avgPrice: 40, chinaExtra: 10 },
            cosmetics: { name: 'Cosmetics & Makeup', avgPrice: 30, chinaExtra: 10 },
            haircare: { name: 'Haircare', avgPrice: 25, chinaExtra: 10 },
            fragrance: { name: 'Fragrances & Perfume', avgPrice: 80, chinaExtra: 8 },
            tools: { name: 'Beauty Tools & Devices', avgPrice: 60, chinaExtra: 12 }
        },
        seoKeywords: ['beauty products tariff', 'K-beauty tariff', 'cosmetics import duty', 'skincare tariff rate'],
        affectedBrands: ['Korean beauty brands', 'Japanese skincare', 'Chinese cosmetics', 'European perfumes']
    },
    tools: {
        name: 'Tools & Hardware', emoji: '🔧', slug: 'tools',
        chinaAdditional: 20, otherAdjust: 0, preTariffRate: 3,
        importPercent: 65,
        description: 'Power tools, hand tools, hardware, fasteners, workbenches',
        contextFact: 'A large portion of hand and power tools are manufactured in China. Professional-grade tool prices have increased 15-30% since tariff escalation.',
        subCategories: {
            power_tools: { name: 'Power Tools', avgPrice: 200, chinaExtra: 20 },
            hand_tools: { name: 'Hand Tools', avgPrice: 30, chinaExtra: 20 },
            fasteners: { name: 'Fasteners & Hardware', avgPrice: 10, chinaExtra: 20 },
            workbench: { name: 'Workbench & Storage', avgPrice: 300, chinaExtra: 20 }
        },
        seoKeywords: ['tools tariff rate', 'power tools tariff', 'hardware import duty'],
        affectedBrands: ['DeWalt', 'Milwaukee', 'Makita', 'Bosch', 'Harbor Freight']
    },
    medical: {
        name: 'Medical & Health', emoji: '💊', slug: 'medical',
        chinaAdditional: 5, otherAdjust: -5, preTariffRate: 0,
        importPercent: 30,
        description: 'OTC medicines, medical devices, supplements, PPE',
        contextFact: 'Some pharmaceuticals and critical medical supplies have partial tariff exemptions, but many OTC products and medical devices still face increased costs.',
        subCategories: {
            otc: { name: 'OTC Medications', avgPrice: 15, chinaExtra: 5 },
            supplements: { name: 'Vitamins & Supplements', avgPrice: 25, chinaExtra: 8 },
            devices: { name: 'Medical Devices', avgPrice: 100, chinaExtra: 5 },
            ppe: { name: 'PPE & Safety', avgPrice: 20, chinaExtra: 10 }
        },
        seoKeywords: ['medical supplies tariff', 'pharmaceutical tariff rate', 'health products import duty'],
        affectedBrands: ['Various generic drug makers', 'Chinese PPE manufacturers']
    },
    shoes: {
        name: 'Footwear', emoji: '👟', slug: 'shoes',
        chinaAdditional: 15, otherAdjust: 5, preTariffRate: 11,
        importPercent: 99,
        description: 'Athletic shoes, boots, sandals, casual footwear, dress shoes',
        contextFact: 'The US imports 99% of its footwear. Shoes already had high pre-existing tariffs (up to 48% on some categories). New tariffs compound on top of these.',
        subCategories: {
            athletic: { name: 'Athletic / Running', avgPrice: 130, chinaExtra: 15 },
            casual: { name: 'Casual / Sneakers', avgPrice: 80, chinaExtra: 15 },
            boots: { name: 'Boots', avgPrice: 150, chinaExtra: 15 },
            sandals: { name: 'Sandals & Flip-Flops', avgPrice: 40, chinaExtra: 15 },
            dress: { name: 'Dress Shoes', avgPrice: 120, chinaExtra: 12 }
        },
        seoKeywords: ['shoe tariff calculator', 'footwear tariff rate', 'Nike tariff', 'shoe import duty'],
        affectedBrands: ['Nike', 'Adidas', 'New Balance', 'Converse', 'Skechers', 'Crocs']
    }
};

// ── Real-World Product Examples Database ──
const PRODUCT_EXAMPLES = [
    // Electronics
    { name: 'iPhone 16 Pro', category: 'electronics', country: 'china', price: 999, frequency: 'yearly', emoji: '📱', popularity: 100 },
    { name: 'iPhone 16', category: 'electronics', country: 'china', price: 799, frequency: 'yearly', emoji: '📱', popularity: 95 },
    { name: 'Samsung Galaxy S25', category: 'electronics', country: 'south_korea', price: 899, frequency: 'yearly', emoji: '📱', popularity: 85 },
    { name: 'MacBook Air M4', category: 'electronics', country: 'china', price: 1299, frequency: 'yearly', emoji: '💻', popularity: 90 },
    { name: 'Dell XPS Laptop', category: 'electronics', country: 'china', price: 1499, frequency: 'yearly', emoji: '💻', popularity: 70 },
    { name: 'iPad Pro', category: 'electronics', country: 'china', price: 999, frequency: 'yearly', emoji: '📱', popularity: 80 },
    { name: 'PlayStation 5 Pro', category: 'electronics', country: 'japan', price: 699, frequency: 'once', emoji: '🎮', popularity: 85 },
    { name: 'Nintendo Switch 2', category: 'electronics', country: 'china', price: 449, frequency: 'once', emoji: '🎮', popularity: 88 },
    { name: 'Xbox Series X', category: 'electronics', country: 'china', price: 499, frequency: 'once', emoji: '🎮', popularity: 75 },
    { name: 'Sony 65" OLED TV', category: 'electronics', country: 'japan', price: 1799, frequency: 'once', emoji: '📺', popularity: 65 },
    { name: 'Samsung 55" TV', category: 'electronics', country: 'south_korea', price: 599, frequency: 'once', emoji: '📺', popularity: 70 },
    { name: 'AirPods Pro', category: 'electronics', country: 'china', price: 249, frequency: 'yearly', emoji: '🎧', popularity: 90 },
    { name: 'Apple Watch Ultra', category: 'electronics', country: 'china', price: 799, frequency: 'yearly', emoji: '⌚', popularity: 60 },
    { name: 'DJI Drone', category: 'electronics', country: 'china', price: 799, frequency: 'once', emoji: '🚁', popularity: 55 },
    // Clothing & Shoes
    { name: 'Nike Running Shoes', category: 'shoes', country: 'vietnam', price: 130, frequency: 'yearly', emoji: '👟', popularity: 90 },
    { name: 'Adidas Sneakers', category: 'shoes', country: 'indonesia', price: 100, frequency: 'yearly', emoji: '👟', popularity: 80 },
    { name: 'Lululemon Leggings', category: 'clothing', country: 'vietnam', price: 98, frequency: 'quarterly', emoji: '👖', popularity: 75 },
    { name: 'H&M T-Shirt', category: 'clothing', country: 'bangladesh', price: 15, frequency: 'monthly', emoji: '👕', popularity: 70 },
    { name: 'Zara Dress', category: 'clothing', country: 'china', price: 60, frequency: 'quarterly', emoji: '👗', popularity: 65 },
    { name: 'Canada Goose Jacket', category: 'clothing', country: 'canada', price: 1050, frequency: 'once', emoji: '🧥', popularity: 55 },
    { name: 'Uniqlo Basics Pack', category: 'clothing', country: 'china', price: 50, frequency: 'quarterly', emoji: '👕', popularity: 72 },
    { name: 'Shein Haul (10 items)', category: 'clothing', country: 'china', price: 100, frequency: 'monthly', emoji: '🛍️', popularity: 88 },
    // Automotive
    { name: 'Toyota Camry', category: 'automotive', country: 'japan', price: 28000, frequency: 'once', emoji: '🚗', popularity: 85 },
    { name: 'Honda CR-V', category: 'automotive', country: 'japan', price: 32000, frequency: 'once', emoji: '🚗', popularity: 80 },
    { name: 'BMW 3 Series', category: 'automotive', country: 'eu', price: 45000, frequency: 'once', emoji: '🚗', popularity: 65 },
    { name: 'Hyundai Tucson', category: 'automotive', country: 'south_korea', price: 30000, frequency: 'once', emoji: '🚗', popularity: 70 },
    { name: 'Tesla Model 3 (import)', category: 'automotive', country: 'china', price: 35000, frequency: 'once', emoji: '⚡', popularity: 75 },
    { name: 'Set of 4 Tires', category: 'automotive', country: 'china', price: 600, frequency: 'yearly', emoji: '🛞', popularity: 60 },
    // Food & Grocery
    { name: 'Weekly Groceries', category: 'food', country: 'mexico', price: 150, frequency: 'weekly', emoji: '🥑', popularity: 95 },
    { name: 'Olive Oil (1L)', category: 'food', country: 'eu', price: 15, frequency: 'monthly', emoji: '🫒', popularity: 65 },
    { name: 'Imported Wine (bottle)', category: 'food', country: 'eu', price: 20, frequency: 'monthly', emoji: '🍷', popularity: 60 },
    { name: 'Coffee Beans (1lb)', category: 'food', country: 'brazil', price: 14, frequency: 'monthly', emoji: '☕', popularity: 80 },
    { name: 'Imported Cheese Block', category: 'food', country: 'eu', price: 12, frequency: 'monthly', emoji: '🧀', popularity: 55 },
    { name: 'Bananas (weekly)', category: 'food', country: 'other', price: 4, frequency: 'weekly', emoji: '🍌', popularity: 70 },
    // Home & Furniture
    { name: 'IKEA Sofa', category: 'furniture', country: 'china', price: 800, frequency: 'once', emoji: '🛋️', popularity: 70 },
    { name: 'Office Desk', category: 'furniture', country: 'china', price: 350, frequency: 'once', emoji: '🖥️', popularity: 60 },
    { name: 'Area Rug 8x10', category: 'furniture', country: 'india', price: 400, frequency: 'once', emoji: '🟫', popularity: 45 },
    // Toys
    { name: 'LEGO Star Wars Set', category: 'toys', country: 'china', price: 80, frequency: 'quarterly', emoji: '🧱', popularity: 80 },
    { name: 'Barbie Dreamhouse', category: 'toys', country: 'china', price: 200, frequency: 'once', emoji: '🏠', popularity: 65 },
    // Appliances
    { name: 'Samsung Washing Machine', category: 'appliances', country: 'south_korea', price: 900, frequency: 'once', emoji: '🫧', popularity: 60 },
    { name: 'Dyson Vacuum', category: 'appliances', country: 'china', price: 500, frequency: 'once', emoji: '🧹', popularity: 70 },
    { name: 'Robot Vacuum', category: 'appliances', country: 'china', price: 350, frequency: 'once', emoji: '🤖', popularity: 65 },
    // Sports
    { name: 'E-Bike', category: 'sports', country: 'china', price: 1500, frequency: 'once', emoji: '🚲', popularity: 55 },
    { name: 'Peloton Bike', category: 'sports', country: 'taiwan', price: 1445, frequency: 'once', emoji: '🚴', popularity: 50 },
    // Beauty
    { name: 'K-Beauty Skincare Set', category: 'beauty', country: 'south_korea', price: 80, frequency: 'quarterly', emoji: '✨', popularity: 60 },
    { name: 'French Perfume', category: 'beauty', country: 'eu', price: 120, frequency: 'yearly', emoji: '🌸', popularity: 50 }
];

// ── Tariff Timeline Data ──
const TARIFF_TIMELINE = [
    {
        date: 'Feb 4, 2025',
        isoDate: '2025-02-04',
        title: 'China Tariff Increase Begins',
        description: '10% additional tariff imposed on all Chinese imports under IEEPA authority, on top of existing Section 301 tariffs.',
        impact: 'high',
        category: 'china'
    },
    {
        date: 'Mar 4, 2025',
        isoDate: '2025-03-04',
        title: 'China Tariffs Doubled to 20%',
        description: 'Additional IEEPA tariff on China raised from 10% to 20%, citing fentanyl-related emergency.',
        impact: 'high',
        category: 'china'
    },
    {
        date: 'Mar 12, 2025',
        isoDate: '2025-03-12',
        title: 'Steel & Aluminum Tariffs to 25%',
        description: 'Global steel and aluminum tariffs raised to 25% for all countries, eliminating previous exemptions.',
        impact: 'medium',
        category: 'global'
    },
    {
        date: 'Apr 2, 2025',
        isoDate: '2025-04-02',
        title: 'Section 122 Global Tariff — "Liberation Day"',
        description: '10% baseline tariff on ALL imports from ALL countries. Higher "reciprocal" tariffs announced for 57 specific nations based on trade deficit calculations.',
        impact: 'critical',
        category: 'global'
    },
    {
        date: 'Apr 3, 2025',
        isoDate: '2025-04-03',
        title: '25% Auto Tariff Takes Effect',
        description: '25% tariff on all imported passenger vehicles and light trucks, regardless of country of origin.',
        impact: 'high',
        category: 'auto'
    },
    {
        date: 'Apr 9, 2025',
        isoDate: '2025-04-09',
        title: 'China Tariffs Escalate to 145%',
        description: 'Combined tariff rate on Chinese goods reaches 145% after retaliatory escalation. 90-day pause on other reciprocal tariffs (reduced to 10% baseline).',
        impact: 'critical',
        category: 'china'
    },
    {
        date: 'May 2, 2025',
        isoDate: '2025-05-02',
        title: 'De Minimis Exemption Suspended',
        description: '$800 duty-free threshold for small packages eliminated for China. All Shein, Temu, and AliExpress orders now subject to full tariffs or flat postal fees of $75-$150.',
        impact: 'high',
        category: 'deminimis'
    },
    {
        date: 'May 3, 2025',
        isoDate: '2025-05-03',
        title: 'Auto Parts Tariff at 25%',
        description: '25% tariff extended to auto parts imports from all countries.',
        impact: 'high',
        category: 'auto'
    },
    {
        date: 'May 14, 2025',
        isoDate: '2025-05-14',
        title: 'US-China Geneva Deal — 90-Day Pause',
        description: 'Tariffs temporarily reduced: US lowers China tariffs to 30% (from 145%), China lowers US tariffs to 10% (from 125%). 90-day negotiation window.',
        impact: 'high',
        category: 'china'
    },
    {
        date: 'Jul 2025',
        isoDate: '2025-07-01',
        title: 'Reciprocal Tariff Pause Ends',
        description: '90-day pause on higher reciprocal tariffs for non-China countries begins to expire. Some countries negotiate bilateral deals.',
        impact: 'medium',
        category: 'global'
    },
    {
        date: 'Aug 2025',
        isoDate: '2025-08-01',
        title: 'China Deal Extended',
        description: 'US-China 90-day deal extended as negotiations continue. 30% base rate on Chinese goods maintained.',
        impact: 'medium',
        category: 'china'
    },
    {
        date: 'Jan 2026',
        isoDate: '2026-01-01',
        title: 'New Year Tariff Status',
        description: 'All major tariffs remain in effect entering the new year. 10% global baseline, 30%+ China rates, 25% auto tariffs, de minimis suspension all continue.',
        impact: 'medium',
        category: 'global'
    },
    {
        date: `Jun ${CURRENT_YEAR}`,
        isoDate: `${CURRENT_YEAR}-06-01`,
        title: 'Current Status',
        description: `10% global baseline remains. China effective rates vary 30-54%+ depending on product category. Auto tariffs at 25%. De minimis suspension continues. Reciprocal tariffs partially reimposed for several countries.`,
        impact: 'current',
        category: 'global'
    }
];

// ── De Minimis Data ──
const DE_MINIMIS_DATA = {
    oldThreshold: 800,
    newThreshold: 0,
    effectiveDate: '2025-05-02',
    affectedCountries: ['china'],
    flatFees: { postal: 75, express: 150 },
    explanation: 'Previously, packages worth under $800 could enter the US duty-free under the "de minimis" exemption (19 USC §1321). Starting May 2, 2025, this exemption was suspended for goods from China. Small online orders from Shein, Temu, AliExpress, and other Chinese retailers now face either full tariff rates or flat postal fees.',
    affectedPlatforms: [
        { name: 'Shein', type: 'Fast Fashion', avgOrder: 50, impact: 'Very High' },
        { name: 'Temu', type: 'General Merchandise', avgOrder: 30, impact: 'Very High' },
        { name: 'AliExpress', type: 'General Marketplace', avgOrder: 25, impact: 'Very High' },
        { name: 'Wish', type: 'Budget Marketplace', avgOrder: 15, impact: 'Very High' },
        { name: 'DHgate', type: 'Wholesale', avgOrder: 100, impact: 'High' },
        { name: 'Banggood', type: 'Electronics', avgOrder: 40, impact: 'High' }
    ]
};

// ── UK Tariff Data (for UK-specific page) ──
const UK_TARIFF_DATA = {
    vatRate: 20,
    personalAllowance: 390,
    giftAllowance: 39,
    dutyThreshold: 135,
    currency: 'GBP',
    currencySymbol: '£',
    customsAuthority: 'HMRC',
    note: 'UK import duties are based on the UK Global Tariff (UKGT) post-Brexit. VAT at 20% applies on top of the goods value + shipping + duty.',
    categories: {
        electronics: { dutyRate: 0, vatRate: 20 },
        clothing: { dutyRate: 12, vatRate: 20 },
        shoes: { dutyRate: 8, vatRate: 20 },
        food: { dutyRate: 8, vatRate: 0 },
        automotive: { dutyRate: 6.5, vatRate: 20 },
        toys: { dutyRate: 0, vatRate: 20 },
        furniture: { dutyRate: 0, vatRate: 20 },
        beauty: { dutyRate: 0, vatRate: 20 },
        tools: { dutyRate: 2.7, vatRate: 20 },
        appliances: { dutyRate: 2.2, vatRate: 20 }
    }
};

// ── Canada Tariff Context ──
const CANADA_TARIFF_DATA = {
    taxType: 'GST/HST',
    gstRate: 5,
    personalExemption: { under24h: 0, '24to48h': 200, over48h: 800 },
    currency: 'CAD',
    currencySymbol: 'C$',
    customsAuthority: 'CBSA',
    note: 'Canada has imposed retaliatory tariffs of 25% on many US goods in response to US tariffs on Canadian products.',
    usCanadaTariff: 25,
    usCanadaTariffBasis: 'IEEPA (fentanyl-related)',
    usmcaNote: 'USMCA-compliant goods may qualify for reduced or zero duty rates, but IEEPA tariffs override in many cases.'
};

// ── Household Calculator Multipliers ──
const HOUSEHOLD_MULTIPLIERS = {
    styles: {
        frugal: { importSpend: 0.08, label: 'Frugal — mostly domestic', description: 'minimal imports' },
        average: { importSpend: 0.15, label: 'Average consumer', description: 'average import exposure' },
        heavy: { importSpend: 0.22, label: 'Heavy online shopper', description: 'high import exposure' },
        luxury: { importSpend: 0.18, label: 'Luxury / premium buyer', description: 'premium import goods' }
    },
    incomeRanges: [
        { value: 30000, label: 'Under $30,000' },
        { value: 50000, label: '$30,000 – $50,000' },
        { value: 75000, label: '$50,000 – $100,000' },
        { value: 125000, label: '$100,000 – $150,000' },
        { value: 200000, label: '$150,000 – $250,000' },
        { value: 300000, label: '$250,000+' }
    ],
    categoryBreakdown: {
        'Electronics': { pct: 0.22, avgTariff: 35 },
        'Clothing & Shoes': { pct: 0.18, avgTariff: 28 },
        'Food & Groceries': { pct: 0.15, avgTariff: 12 },
        'Auto & Transport': { pct: 0.12, avgTariff: 22 },
        'Home & Furniture': { pct: 0.10, avgTariff: 25 },
        'Appliances': { pct: 0.08, avgTariff: 30 },
        'Toys & Games': { pct: 0.05, avgTariff: 40 },
        'Other Goods': { pct: 0.10, avgTariff: 15 }
    }
};

// ── Tariff Savings Tips ──
const SAVINGS_TIPS = [
    { title: 'Buy American-Made Alternatives', description: 'Products manufactured domestically don\'t carry import tariffs. Look for "Made in USA" labels.', impact: 'High', icon: '🇺🇸' },
    { title: 'Check Country of Origin Labels', description: 'The same product may be manufactured in different countries. Choose versions from lower-tariff nations.', impact: 'High', icon: '🏷️' },
    { title: 'Buy Before Price Increases', description: 'Retailers often hold inventory bought before tariff increases. Current stock may still be at older prices.', impact: 'Medium', icon: '⏰' },
    { title: 'Consider Refurbished/Used', description: 'Refurbished electronics and used goods purchased domestically avoid additional tariffs entirely.', impact: 'High', icon: '♻️' },
    { title: 'Wait for Sales & Clearance', description: 'Retailers may absorb tariff costs during sales events to maintain market share.', impact: 'Medium', icon: '🏷️' },
    { title: 'Buy in Bulk for Non-Perishables', description: 'If you buy imported goods regularly, buying in bulk now locks in current prices.', impact: 'Medium', icon: '📦' },
    { title: 'Use Cashback & Rewards', description: 'Credit card cashback and shopping rewards can offset 2-5% of tariff-inflated prices.', impact: 'Low', icon: '💳' },
    { title: 'Compare Prices Across Retailers', description: 'Different retailers absorb tariffs differently. Price comparison tools can save 10-20%.', impact: 'Medium', icon: '🔍' },
    { title: 'Consider Store Brands', description: 'Store/private-label brands often have better margins to absorb tariff costs vs name brands.', impact: 'Medium', icon: '🏪' },
    { title: 'Shop Duty-Free When Traveling', description: 'US residents returning from abroad can bring back up to $800 in goods duty-free.', impact: 'Low', icon: '✈️' },
    { title: 'Support USMCA-Compliant Products', description: 'Products qualifying under USMCA from Canada/Mexico may have reduced or zero tariff rates.', impact: 'Medium', icon: '📋' },
    { title: 'Watch for Tariff Exemptions', description: 'Some product categories receive temporary exemptions. Follow trade news for updates.', impact: 'Medium', icon: '📰' },
    { title: 'Buy Locally-Grown Food', description: 'Domestic produce avoids food tariffs entirely. Visit farmers markets and buy seasonal.', impact: 'High', icon: '🌽' },
    { title: 'Delay Big-Ticket Purchases', description: 'If a trade deal is imminent, waiting could save thousands on vehicles and major appliances.', impact: 'Variable', icon: '⏳' },
    { title: 'Repair Instead of Replace', description: 'Repairing existing products avoids the tariff on a new imported replacement.', impact: 'High', icon: '🔧' }
];

// ── All Pages for Navigation & Sitemap ──
const ALL_PAGES = [
    { url: 'index.html', title: 'US Tariff Calculator', shortTitle: 'Calculator', icon: '🧮', description: 'Free tariff impact calculator for American consumers', priority: 1.0 },
    { url: 'china-tariff-calculator.html', title: 'China Tariff Calculator', shortTitle: 'China Tariffs', icon: '🇨🇳', description: 'Calculate tariffs on Chinese imports', priority: 0.9 },
    { url: 'how-much-tariffs-cost-me.html', title: 'How Much Tariffs Cost Me', shortTitle: 'My Tariff Cost', icon: '💸', description: 'Find out your personal tariff burden', priority: 0.9 },
    { url: 'iphone-tariff-calculator.html', title: 'iPhone Tariff Calculator', shortTitle: 'iPhone Tariffs', icon: '📱', description: 'Tariff impact on iPhone prices', priority: 0.8 },
    { url: 'online-shopping-tariff-calculator.html', title: 'Online Shopping Tariff Calculator', shortTitle: 'Online Shopping', icon: '🛒', description: 'Tariffs on online purchases', priority: 0.8 },
    { url: 'shein-temu-tariff-calculator.html', title: 'Shein & Temu Tariff Calculator', shortTitle: 'Shein/Temu', icon: '🛍️', description: 'Tariffs on Shein and Temu orders', priority: 0.8 },
    { url: 'grocery-tariff-calculator.html', title: 'Grocery Tariff Calculator', shortTitle: 'Grocery Tariffs', icon: '🥑', description: 'How tariffs affect grocery prices', priority: 0.8 },
    { url: 'car-tariff-calculator.html', title: 'Car Tariff Calculator', shortTitle: 'Car Tariffs', icon: '🚗', description: 'Vehicle import tariff calculator', priority: 0.8 },
    { url: 'clothing-tariff-calculator.html', title: 'Clothing Tariff Calculator', shortTitle: 'Clothing Tariffs', icon: '👕', description: 'Tariffs on imported clothing', priority: 0.7 },
    { url: 'tariff-by-country.html', title: 'Tariff Rates by Country', shortTitle: 'By Country', icon: '🌍', description: 'Compare tariff rates across countries', priority: 0.8 },
    { url: 'de-minimis-calculator.html', title: 'De Minimis Rule Calculator', shortTitle: 'De Minimis', icon: '📦', description: 'De minimis threshold changes explained', priority: 0.7 },
    { url: 'import-duty-calculator.html', title: 'Import Duty Calculator', shortTitle: 'Import Duty', icon: '🛃', description: 'Personal import duty calculator', priority: 0.8 },
    { url: 'tariff-savings-tips.html', title: 'Tariff Savings Tips', shortTitle: 'Save Money', icon: '💡', description: 'How to save money despite tariffs', priority: 0.7 },
    { url: 'electronics-tariff-calculator.html', title: 'Electronics Tariff Calculator', shortTitle: 'Electronics', icon: '💻', description: 'Tariffs on electronics and tech', priority: 0.7 },
    { url: 'laptop-tariff-calculator.html', title: 'Laptop Tariff Calculator', shortTitle: 'Laptop Tariffs', icon: '💻', description: 'Tariff impact on laptop prices', priority: 0.7 },
    { url: 'tariff-comparison-tool.html', title: 'Tariff Comparison Tool', shortTitle: 'Compare', icon: '📊', description: 'Compare tariffs across countries and products', priority: 0.7 },
    { url: 'tariff-timeline.html', title: 'US Tariff Timeline', shortTitle: 'Timeline', icon: '📅', description: 'Complete history of US tariff changes', priority: 0.7 },
    { url: 'canada-tariff-calculator.html', title: 'Canada Tariff Calculator', shortTitle: 'Canada', icon: '🇨🇦', description: 'US-Canada tariff calculator', priority: 0.6 },
    { url: 'uk-import-duty-calculator.html', title: 'UK Import Duty Calculator', shortTitle: 'UK Import Duty', icon: '🇬🇧', description: 'UK customs duty and VAT calculator', priority: 0.6 },
    { url: 'furniture-tariff-calculator.html', title: 'Furniture Tariff Calculator', shortTitle: 'Furniture', icon: '🪑', description: 'Tariffs on imported furniture', priority: 0.6 },
    { url: 'toys-tariff-calculator.html', title: 'Toys Tariff Calculator', shortTitle: 'Toys', icon: '🧸', description: 'Tariff impact on toy prices', priority: 0.6 },
    { url: 'mexico-tariff-calculator.html', title: 'Mexico Tariff Calculator', shortTitle: 'Mexico', icon: '🇲🇽', description: 'US-Mexico tariff calculator with USMCA info', priority: 0.8 },
    { url: 'japan-tariff-calculator.html', title: 'Japan Tariff Calculator', shortTitle: 'Japan', icon: '🇯🇵', description: 'Tariffs on Japanese cars, electronics & gaming', priority: 0.7 },
    { url: 'ev-tariff-calculator.html', title: 'EV Tariff Calculator', shortTitle: 'EV Tariffs', icon: '⚡', description: 'Electric vehicle import duty calculator', priority: 0.8 },
    { url: 'how-tariffs-work.html', title: 'How Do Tariffs Work?', shortTitle: 'How Tariffs Work', icon: '📖', description: 'Simple guide explaining tariffs for consumers', priority: 0.8 },
    { url: 'who-pays-tariffs.html', title: 'Who Pays Tariffs?', shortTitle: 'Who Pays', icon: '🤔', description: 'The truth about who really pays import tariffs', priority: 0.7 },
    { url: 'india-tariff-calculator.html', title: 'India Tariff Calculator', shortTitle: 'India', icon: '🇮🇳', description: 'Tariffs on Indian pharmaceuticals and textiles', priority: 0.8 },
    { url: 'eu-tariff-calculator.html', title: 'EU Tariff Calculator', shortTitle: 'European Union', icon: '🇪🇺', description: 'Tariffs on European cars, wine, and luxury goods', priority: 0.8 },
    { url: 'amazon-tariff-calculator.html', title: 'Amazon Tariff Calculator', shortTitle: 'Amazon', icon: '📦', description: 'Hidden tariff costs in your Amazon purchases', priority: 0.8 },
    { url: 'nike-tariff-calculator.html', title: 'Nike Tariff Calculator', shortTitle: 'Nike & Sneakers', icon: '👟', description: 'Tariffs on imported shoes and apparel', priority: 0.8 },
    { url: 'ps5-tariff-calculator.html', title: 'PS5 Tariff Calculator', shortTitle: 'Gaming Consoles', icon: '🎮', description: 'Tariff impact on PS5, Xbox, and Nintendo', priority: 0.8 },
    { url: '404.html', title: '404 Page Not Found', shortTitle: '404', icon: '🔍', description: 'Page not found', priority: 0 }
];

// ── Frequency Multipliers ──
const FREQUENCY_MULTIPLIERS = {
    once: { label: 'One-time purchase', annual: 1, isRecurring: false },
    weekly: { label: 'Weekly', annual: 52, isRecurring: true },
    monthly: { label: 'Monthly', annual: 12, isRecurring: true },
    quarterly: { label: 'Every 3 months', annual: 4, isRecurring: true },
    yearly: { label: 'Once a year', annual: 1, isRecurring: true }
};

// ── Utility: Calculate tariff for any product ──
function calcTariff(category, country, price) {
    const countryData = COUNTRIES[country] || COUNTRIES.other;
    const categoryData = CATEGORIES[category];
    if (!categoryData) return null;

    let effectiveRate = countryData.baseRate;
    if (country === 'china') {
        effectiveRate += categoryData.chinaAdditional;
    } else {
        effectiveRate += categoryData.otherAdjust;
    }
    if (category === 'automotive') {
        effectiveRate = Math.max(effectiveRate, 25);
    }
    effectiveRate = Math.max(effectiveRate, 10);

    const preTariffRate = categoryData.preTariffRate;
    const preTariffPrice = price / (1 + effectiveRate / 100) * (1 + preTariffRate / 100);
    const tariffCost = price - preTariffPrice;

    return {
        effectiveRate,
        preTariffRate,
        preTariffPrice,
        tariffCost,
        newTariffBurden: effectiveRate - preTariffRate,
        countryData,
        categoryData
    };
}

// ── Utility: Format currency ──
function formatUSD(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatUSDRound(amount) {
    if (amount >= 1000) {
        return '$' + Math.round(amount).toLocaleString();
    }
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
