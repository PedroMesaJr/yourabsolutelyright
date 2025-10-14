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
    price: 42.85,
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
    // Printful Sublimation Flip-Flops - 3 size variants
    printfulVariants: [
      { size: "S", variantId: "68edc70ad35415", retailPrice: 42.85 },
      { size: "M", variantId: "68edc70ad35473", retailPrice: 42.85 },
      { size: "L", variantId: "68edc70ad354c8", retailPrice: 42.85 },
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
      "/images/products/backpack/8-back-white.png",
    ],
    printfulId: "68edc709c3b424", // All-Over Print Minimalist Backpack
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
    price: 116.67,
    image: "/images/products/oversized-hoodie/1-black-front.png",
    images: [
      "/images/products/oversized-hoodie/1-black-front.png",
      "/images/products/oversized-hoodie/2-black-left.png",
      "/images/products/oversized-hoodie/3-black-right.png",
      "/images/products/oversized-hoodie/4-black-left-front.png",
      "/images/products/oversized-hoodie/5-black-right-front.png",
      "/images/products/oversized-hoodie/6-white-front.png",
      "/images/products/oversized-hoodie/7-white-front-2.png",
      "/images/products/oversized-hoodie/8-white-left.png",
      "/images/products/oversized-hoodie/9-white-right.png",
      "/images/products/oversized-hoodie/10-white-right-front.png",
    ],
    // Printful Bella + Canvas 4719 Oversized Heavyweight Hoodie - 12 variants (2 colors × 6 sizes)
    printfulVariants: [
      { size: "S", color: "Black", variantId: "68edc70e7c5d89", retailPrice: 116.67 },
      { size: "M", color: "Black", variantId: "68edc70e7c5df8", retailPrice: 116.67 },
      { size: "L", color: "Black", variantId: "68edc70e7c5e47", retailPrice: 116.67 },
      { size: "XL", color: "Black", variantId: "68edc70e7c5e96", retailPrice: 116.67 },
      { size: "2XL", color: "Black", variantId: "68edc70e7c5ee1", retailPrice: 122.73 },
      { size: "3XL", color: "Black", variantId: "68edc70e7c5f27", retailPrice: 128.79 },
      { size: "S", color: "White", variantId: "68edc70e7c5f79", retailPrice: 116.67 },
      { size: "M", color: "White", variantId: "68edc70e7c5fc3", retailPrice: 116.67 },
      { size: "L", color: "White", variantId: "68edc70e7c6012", retailPrice: 116.67 },
      { size: "XL", color: "White", variantId: "68edc70e7c6054", retailPrice: 116.67 },
      { size: "2XL", color: "White", variantId: "68edc70e7c60a6", retailPrice: 122.73 },
      { size: "3XL", color: "White", variantId: "68edc70e7c60f3", retailPrice: 128.79 },
    ],
    printfulId: "68edc70e7c5d89", // Default to Black S
  },
  {
    id: 7,
    name: "Crop Hoodie",
    description: "Trendy crop hoodie for those absolutely right fashion moments. Comfort meets style.",
    price: 100.45,
    image: "/images/products/crop-hoodie/1-front.png",
    images: [
      "/images/products/crop-hoodie/1-front.png",
      "/images/products/crop-hoodie/2-back.png",
      "/images/products/crop-hoodie/3-front-2.png",
      "/images/products/crop-hoodie/4-back-2.png",
      "/images/products/crop-hoodie/5-front-3.png",
      "/images/products/crop-hoodie/6-back-3.png",
      "/images/products/crop-hoodie/7-lifestyle.png",
      "/images/products/crop-hoodie/8-lifestyle-2.png",
      "/images/products/crop-hoodie/9-lifestyle-3.png",
      "/images/products/crop-hoodie/10-lifestyle-4.png",
    ],
    // Printful Bella + Canvas 7502 Women's Fleece Crop Hoodie - 5 size variants
    printfulVariants: [
      { size: "S", variantId: "68edc70a5ba064", retailPrice: 100.45 },
      { size: "M", variantId: "68edc70a5ba0b6", retailPrice: 100.45 },
      { size: "L", variantId: "68edc70a5ba0f7", retailPrice: 100.45 },
      { size: "XL", variantId: "68edc70a5ba144", retailPrice: 100.45 },
      { size: "2XL", variantId: "68edc70a5ba184", retailPrice: 106.52 },
    ],
    printfulId: "68edc70a5ba064", // Default to S size
  },
];

export default products;
