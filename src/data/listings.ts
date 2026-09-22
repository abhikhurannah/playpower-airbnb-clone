import { assignmentId, propertyDescription } from "./property";
import img1 from "@/assets/listing-1.jpg";
import img2 from "@/assets/listing-2.jpg";
import img3 from "@/assets/listing-3.jpg";
import img4 from "@/assets/listing-4.jpg";

export type Listing = {
  id: string;
  currency?: "INR" | "USD";
  title: string;
  location: string;
  country: string;
  distance: string;
  dates: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  categories: string[];
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  host: string;
  hostYears: number;
  description: string;
  amenities: string[];
};

const base = [
  {
    title: "Sunlit loft with vaulted ceilings",
    location: "Copenhagen",
    country: "Denmark",
    image: img1,
    categories: ["Design", "Trending", "Rooms"],
    price: 182,
    rating: 4.93,
    reviews: 214,
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    host: "Freja",
    hostYears: 6,
    description:
      "A calm, plant-filled loft in the heart of the city. Huge windows, oak floors and a quiet courtyard — perfect for slow mornings and long dinners.",
    amenities: ["Fast wifi", "Workspace", "Kitchen", "Washer", "Self check-in", "Heating"],
  },
  {
    title: "Pine Ridge A-frame cabin",
    location: "Whistler",
    country: "Canada",
    image: img2,
    categories: ["Cabins", "Countryside", "Trending"],
    price: 245,
    rating: 4.88,
    reviews: 389,
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 2,
    host: "Marcus",
    hostYears: 9,
    description:
      "Wake up to pines and golden light. Wood stove, outdoor hot tub and trailheads right from the deck.",
    amenities: ["Hot tub", "Fireplace", "Free parking", "Kitchen", "BBQ grill", "Pets allowed"],
  },
  {
    title: "Beachfront villa with infinity pool",
    location: "Canggu",
    country: "Indonesia",
    image: img3,
    categories: ["Beachfront", "Amazing pools", "Luxe"],
    price: 520,
    rating: 4.97,
    reviews: 122,
    guests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    host: "Ayu",
    hostYears: 4,
    description:
      "Steps from the sand, with an infinity pool that melts into the ocean. Daily housekeeping and a private chef on request.",
    amenities: ["Pool", "Ocean view", "Air conditioning", "Kitchen", "Gym", "Breakfast"],
  },
  {
    title: "Whitewashed house above the bay",
    location: "Naxos",
    country: "Greece",
    image: img4,
    categories: ["Islands", "Design", "Beachfront"],
    price: 168,
    rating: 4.91,
    reviews: 276,
    guests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    host: "Nikos",
    hostYears: 11,
    description:
      "A stone house with a bougainvillea terrace and an endless sea view. Village tavernas are a five minute walk downhill.",
    amenities: ["Sea view", "Terrace", "Kitchen", "Air conditioning", "Free parking", "Wifi"],
  },
];

const cities = [
  ["Lisbon", "Portugal"],
  ["Kyoto", "Japan"],
  ["Tulum", "Mexico"],
  ["Cape Town", "South Africa"],
  ["Reykjavik", "Iceland"],
  ["Positano", "Italy"],
  ["Queenstown", "New Zealand"],
  ["Marrakech", "Morocco"],
];

export const CATEGORIES = [
  "All",
  "Trending",
  "Beachfront",
  "Cabins",
  "Design",
  "Amazing pools",
  "Islands",
  "Countryside",
  "Luxe",
  "Rooms",
];

export const listings: Listing[] = Array.from({ length: 16 }, (_, i) => {
  const b = base[i % base.length]!;
  const city = i < 4 ? [b.location, b.country] : cities[(i - 4) % cities.length]!;
  const bump = Math.floor(i / base.length);
  return {
    ...b,
    id: `stay-${i + 1}`,
    location: city[0]!,
    country: city[1]!,
    title: i < 4 ? b.title : `${b.title} in ${city[0]}`,
    price: b.price + bump * 37,
    rating: Math.round((b.rating - bump * 0.04) * 100) / 100,
    reviews: b.reviews - bump * 31,
    distance: `${120 + i * 37} km away`,
    dates: ["Nov 4 – 9", "Dec 1 – 6", "Jan 12 – 18", "Feb 3 – 8"][i % 4]!,
  };
});

listings.unshift({
  id: assignmentId,
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim",
  country: "India",
  distance: "North Goa",
  dates: "Oct 18 – 23",
  price: 5699.8,
  currency: "INR",
  rating: 4.95,
  reviews: 19,
  image: "/assets/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg",
  categories: ["Trending", "Amazing pools", "Rooms"],
  guests: 3,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  host: "Mirashya Homes",
  hostYears: 2,
  description: propertyDescription,
  amenities: [
    "Kitchen",
    "Wifi",
    "Dedicated workspace",
    "Free parking on premises",
    "Pool",
    "Hot tub",
    "Pets allowed",
    "Exterior security cameras on property",
    "Carbon monoxide alarm not reported",
    "Smoke alarm not reported",
  ],
});

export const formatPrice = (amount: number, currency = "USD") =>
  new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

export const getListing = (id: string) => listings.find((l) => l.id === id);
