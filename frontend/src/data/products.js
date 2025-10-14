// Product catalog for yourabsolutelyright.com
// Each product will be fulfilled via Printful

export const products = [
  {
    id: 1,
    name: "Premium Mousepad",
    description: "You're absolutely right to upgrade your desk setup. Smooth surface, non-slip base, perfect for work or gaming.",
    price: 49.99,
    image: "/images/products/mousepad.png",
    printfulId: "68edc70784ea14", // Mouse pad from Printful
  },
  {
    id: 2,
    name: "Premium Flip-Flops",
    description: "Walk confidently knowing you're absolutely right. Comfortable sublimation flip-flops for beach, pool, or casual wear.",
    price: 54.99,
    image: "/images/products/flip-flops/1-front.png",
    images: [
      "/images/products/flip-flops/1-front.png",
      "/images/products/flip-flops/2-back.png",
      "/images/products/flip-flops/3-front-left.png",
      "/images/products/flip-flops/4-front-right.png",
      "/images/products/flip-flops/5-left.png",
      "/images/products/flip-flops/6-right.png",
      "/images/products/flip-flops/7-top.png",
      "/images/products/flip-flops/8-lifestyle.png",
      "/images/products/flip-flops/9-lifestyle-2.png",
    ],
    // Printful Sublimation Flip-Flops - Multiple variants (sizes)
    printfulVariants: [
      { size: "S", variantId: "68edc70ad35415", retailPrice: 18.38 },
      { size: "M", variantId: "68edc70ad35473", retailPrice: 18.38 },
      { size: "L", variantId: "68edc70ad354c8", retailPrice: 18.38 },
    ],
    printfulId: "68edc70ad35415", // Default to S size
  },
  {
    id: 3,
    name: "Minimalist Backpack",
    description: "Carry everything you need with absolute confidence. All-over print minimalist backpack for the modern explorer.",
    price: 109.99,
    image: "/images/products/backpack/1-front.png",
    images: [
      "/images/products/backpack/1-front.png",
      "/images/products/backpack/2-back.png",
      "/images/products/backpack/3-left.png",
      "/images/products/backpack/4-right.png",
      "/images/products/backpack/5-left-front.png",
      "/images/products/backpack/6-bottom.png",
      "/images/products/backpack/7-detail.png",
    ],
    printfulId: "68edc709c3b424", // All-Over Print Minimalist Backpack
  },
  {
    id: 4,
    name: "Cozy Hoodie",
    description: "Premium hoodie for those absolutely right moments. Warm, comfortable, and undeniably correct.",
    price: 44.99,
    image: "/images/products/hoodie-gray.png",
    printfulId: "68edc845abc373", // Unisex Hoodie from Printful (24 variants)
  },
  {
    id: 5,
    name: "Travel Mug",
    description: "Take your absolutely right attitude on the go with this insulated stainless steel travel mug.",
    price: 27.99,
    image: "/images/products/mug-classic.png",
    printfulId: "68edc70a1d5ba2", // White glossy mug from Printful (3 variants)
  },
  {
    id: 6,
    name: "Premium Tee",
    description: "Upgrade your wardrobe with this premium blend tee. Soft, stylish, and absolutely right.",
    price: 29.99,
    image: "/images/products/tee-black.png",
    printfulId: "placeholder",
  },
  {
    id: 7,
    name: "Canvas Tote",
    description: "Carry your essentials and your confidence with this durable canvas tote bag.",
    price: 22.99,
    image: "/images/products/mug-classic.png",
    printfulId: "placeholder",
  },
  {
    id: 8,
    name: "Zip Hoodie",
    description: "Full-zip hoodie for maximum comfort and absolutely right vibes. Perfect for any occasion.",
    price: 49.99,
    image: "/images/products/hoodie-gray.png",
    printfulId: "68edc70e7c5cf5", // Oversized heavyweight hoodie from Printful (12 variants)
  },
  {
    id: 9,
    name: "Crop Hoodie",
    description: "Trendy crop hoodie for those absolutely right fashion moments. Comfort meets style.",
    price: 42.99,
    image: "/images/products/hoodie-gray.png",
    printfulId: "68edc70a5b9fe5", // Crop Hoodie from Printful (5 variants)
  },
  {
    id: 10,
    name: "Visor",
    description: "Stay cool and absolutely right with this stylish visor. Perfect for sunny days.",
    price: 24.99,
    image: "/images/products/mug-classic.png", // Placeholder - add visor image
    printfulId: "68edc7090fb5a1", // Visor from Printful (1 variant)
  },
];

export default products;
