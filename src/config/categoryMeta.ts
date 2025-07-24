export interface CategoryMetaData {
  title: string;
  description: string;
}

export const categoryMetaData: Record<string, CategoryMetaData> = {
  "vehicles": {
    title: "Buy & Sell Vehicles in Kenya | JazaMarket",
    description: "Discover great deals on used cars, motorcycles, vans, and more. JazaMarket is your trusted marketplace for vehicles in Kenya."
  },
  "property-rentals": {
    title: "Property for Sale & Rent in Kenya | JazaMarket",
    description: "Find affordable houses, land, and rentals across Kenya. Browse listings for residential and commercial property on JazaMarket."
  },
  "electronics": {
    title: "Electronics for Sale in Kenya | JazaMarket",
    description: "Buy TVs, sound systems, cameras, and more at the best prices. JazaMarket offers top electronics from trusted sellers in Kenya."
  },
  "jobs": {
    title: "Latest Jobs & Vacancies in Kenya | JazaMarket",
    description: "Looking for a job in Kenya? Find verified job listings in all sectors — full-time, part-time, and remote jobs on JazaMarket."
  },
  "fashion": {
    title: "Shop Fashion in Kenya | Clothes, Shoes & More | JazaMarket",
    description: "Explore stylish clothes, shoes, bags, and accessories for men, women, and kids. Affordable fashion is just a click away on JazaMarket."
  },
  "babies-kids": {
    title: "Baby & Kids Products for Sale in Kenya | JazaMarket",
    description: "Browse baby clothes, toys, gear, and kids' essentials. Get great deals on everything for your little ones on JazaMarket."
  },
  "furniture-appliances": {
    title: "Buy Furniture & Home Appliances in Kenya | JazaMarket",
    description: "Shop sofas, beds, fridges, cookers, and more. Affordable home essentials available from verified sellers across Kenya."
  },
  "computers": {
    title: "Computers & Laptops for Sale in Kenya | JazaMarket",
    description: "Find top deals on laptops, desktops, monitors, and accessories. Whether new or used, shop trusted computer listings on JazaMarket."
  },
  "seeking-work-cvs": {
    title: "Job Seekers & CV Listings in Kenya | JazaMarket",
    description: "Are you hiring? Browse CVs from job seekers across all industries. Find qualified candidates ready to work in Kenya."
  },
  "car-parts-accessories": {
    title: "Car Parts & Accessories in Kenya | JazaMarket",
    description: "Buy genuine car parts, rims, tyres, batteries, and accessories at competitive prices. JazaMarket connects buyers and sellers across Kenya."
  },
  "services": {
    title: "Find Services in Kenya | JazaMarket",
    description: "Search and hire skilled professionals for repairs, cleaning, moving, and more. Discover reliable service providers on JazaMarket."
  },
  "animals-pets": {
    title: "Pets & Animals for Sale in Kenya | JazaMarket",
    description: "Find dogs, cats, birds, livestock, and more. Buy and sell animals from trusted breeders and farmers on JazaMarket."
  },
  "phones-accessories": {
    title: "Phones & Accessories for Sale in Kenya | JazaMarket",
    description: "Shop smartphones, chargers, earphones, and cases. Discover new and used phones at great prices on JazaMarket."
  },
  "health-beauty": {
    title: "Health & Beauty Products in Kenya | JazaMarket",
    description: "Buy skincare, cosmetics, supplements, and more. Find beauty deals and wellness essentials across Kenya."
  },
  "repair-construction": {
    title: "Repair & Construction Services in Kenya | JazaMarket",
    description: "Hire masons, electricians, plumbers, and contractors. Get your project done with skilled professionals via JazaMarket."
  },
  "agriculture-food": {
    title: "Agriculture & Food Supplies in Kenya | JazaMarket",
    description: "Buy seeds, farm tools, fresh produce, and animal feeds. Connect with agribusiness sellers and farmers on JazaMarket."
  },
  "entertainment-sports": {
    title: "Sports & Entertainment Gear in Kenya | JazaMarket",
    description: "Shop gym equipment, musical instruments, gaming consoles, and more. Explore entertainment deals on JazaMarket."
  },
  "commercial-equipment-tools": {
    title: "Commercial Equipment & Tools in Kenya | JazaMarket",
    description: "Find industrial tools, machinery, and equipment for businesses. JazaMarket offers commercial gear at unbeatable prices."
  }
};

// Default meta data for pages without specific category
export const defaultMetaData: CategoryMetaData = {
  title: "JazaMarket - Buy & Sell in Kenya",
  description: "Kenya's trusted marketplace for buying and selling everything you need. Find great deals on vehicles, electronics, property, and more."
};
