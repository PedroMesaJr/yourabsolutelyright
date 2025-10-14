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
    name: "White Glossy Mug",
    description: "Take your absolutely right attitude on the go. Premium white glossy ceramic mug - perfect for coffee, tea, or any beverage.",
    price: 24.99,
    image: "/images/products/mug/1-front-view.png",
    images: [
      "/images/products/mug/1-front-view.png",
      "/images/products/mug/2-handle-right.png",
      "/images/products/mug/3-handle-right-2.png",
      "/images/products/mug/4-lifestyle-donuts.png",
      "/images/products/mug/5-20oz-front.png",
    ],
    // Printful White Glossy Mug - Multiple size variants
    printfulVariants: [
      { size: "11 oz", variantId: "68edc70a1d5c38", retailPrice: 24.99 },
      { size: "15 oz", variantId: "68edc70a1d5c83", retailPrice: 29.99 },
      { size: "20 oz", variantId: "68edc70a1d5cd4", retailPrice: 34.99 },
    ],
    printfulId: "68edc70a1d5c38", // Default to 11 oz
  },
  {
    id: 6,
    name: "Oversized Heavyweight Hoodie",
    description: "Full-zip hoodie for maximum comfort and absolutely right vibes. Perfect for any occasion.",
    price: 49.99,
    image: "/images/products/hoodie-gray.png",
    printfulId: "68edc70e7c5cf5", // Oversized heavyweight hoodie from Printful (12 variants)
  },
  {
    id: 7,
    name: "Crop Hoodie",
    description: "Trendy crop hoodie for those absolutely right fashion moments. Comfort meets style.",
    price: 42.99,
    image: "/images/products/hoodie-gray.png",
    printfulId: "68edc70a5b9fe5", // Crop Hoodie from Printful (5 variants)
  },
  {
    id: 8,
    name: "Visor",
    description: "Stay cool and absolutely right with this stylish visor. Perfect for sunny days.",
    price: 24.99,
    image: "/images/products/mug-classic.png", // Placeholder - add visor image
    printfulId: "68edc7090fb5a1", // Visor from Printful (1 variant)
  },
];

export default products;
