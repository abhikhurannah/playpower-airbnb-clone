import photoList from "./photos.json";
export const title = "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10";
export const photos = photoList;
export const roomDetails: Record<string, string> = {
  "Living room 1": "Sofa · Air conditioning · Ceiling fan · TV",
  "Living room 2": "Ceiling fan · Hot tub",
  "Full kitchen":
    "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
  Bedroom:
    "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
  "Full bathroom": "Hairdryer · Hot water · Shampoo · Shower gel",
  Gym: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
  Exterior: "",
  Pool: "Pool",
  "Additional photos": "",
};
export const rooms = Object.keys(roomDetails).map((name) => ({
  name,
  description: roomDetails[name],
  photos: photos.map((p, index) => ({ ...p, index })).filter((p) => p.room === name),
}));
export const hero = [6, 3, 4, 12, 28].map((i) => photos[i]);
export const description =
  "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴";
export const reviews = [
  {
    name: "Amit",
    tenure: "2 months on Airbnb",
    date: "1 week ago",
    text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
  },
  {
    name: "Aheesh",
    tenure: "3 years on Airbnb",
    date: "2 weeks ago",
    image: "rev1.jpeg",
    text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
  },
  {
    name: "Samiksha",
    tenure: "8 months on Airbnb",
    date: "May 2026",
    image: "rev2.jpeg",
    text: "the host nitish was really great help",
  },
  {
    name: "Vedant",
    tenure: "4 years on Airbnb",
    date: "May 2026",
    text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.\nThe highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable.\nThe property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!",
  },
  {
    name: "Vaibhav S",
    tenure: "3 years on Airbnb",
    date: "May 2026",
    image: "rev3.jpeg",
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
  },
  {
    name: "Mohd",
    tenure: "5 years on Airbnb",
    date: "May 2026",
    image: "rev4.jpeg",
    text: "Great place. Exactly as described in the listing.",
  },
];
export const nearby = [
  ["Beautiful Studio with a view to die for", "23,600", "4.91", "s1.jpeg"],
  ["NAQAB - 1bhk with private pool", "42,218", "4.95", "s2.jpeg"],
  ["Greentique Luxury Flat with plunge pool, Calangute", "44,506", "4.94", "s3.jpeg"],
  ["The Tropical Studio | 5 mins to Beach", "22,824", "4.96", "s4.jpeg"],
  ["Luxury Casa Bella 1BHK with plunge pool, Calangute", "39,942", "4.95", "s5.jpeg"],
  ["Kanso by Earthen Window | Jacuzzi | Terrace | Pool", "45,648", "5.0", "s6.jpeg"],
  ["Luxury Apt | Private Pool | 6 Mins from Beach", "48,786", "4.93", "s2.jpeg"],
  ["Serendipity Cottage - Calm Stay in Calangute-Baga.", "22,824", "4.92", "s4.jpeg"],
];

export const assignmentId = "mirashya-ug10";
export type PropertyPhoto = { room: string; src: string };
export const assignmentPhotos: PropertyPhoto[] = photos;
export const roomDescriptions = roomDetails;
export const propertyDescription = description;
export const amenityGroups: Record<string, string[]> = {
  Bathroom: ["Hairdryer", "Cleaning products", "Shampoo", "Hot water", "Shower gel"],
  "Bedroom and laundry": [
    "Washing machine",
    "Hangers",
    "Bed linen",
    "Room-darkening blinds",
    "Iron",
    "Clothes storage",
    "Cot",
  ],
  Entertainment: ["TV"],
  Family: ["Cot"],
  "Heating and cooling": ["Air conditioning", "Ceiling fan"],
  "Home safety": ["Exterior security cameras on property", "Carbon monoxide alarm", "Smoke alarm"],
  "Internet and office": ["Wifi", "Dedicated workspace"],
  "Kitchen and dining": [
    "Kitchen",
    "Fridge",
    "Freezer",
    "Microwave",
    "Cooking basics",
    "Crockery and cutlery",
    "Kettle",
    "Coffee",
    "Wine glasses",
    "Toaster",
    "Blender",
    "Cooker",
  ],
  "Location features": ["Private entrance"],
  Outdoor: ["Patio or balcony", "Outdoor dining area"],
  "Parking and facilities": ["Free parking on premises", "Pool", "Hot tub", "Gym"],
  Services: [
    "Pets allowed",
    "Cleaning available during stay",
    "Long-term stays allowed",
    "Self check-in",
  ],
};
