// Product catalog for yourabsolutelyright.com
// Each product will be fulfilled via Printful

export const products = [
  {
    id: 1,
    name: "Premium Mousepad",
    shortDescription: "You're absolutely right to upgrade your desk setup. Smooth surface, non-slip base, perfect for work or gaming.",
    description: "You're absolutely right to upgrade your desk setup.\n\nIf you've ever worked with Claude AI, you know the experience: precise, thoughtful, and always guiding you in the right direction. This premium mousepad brings that same philosophy to your workspace.\n\nPerfect for:\n- AI developers coding with Claude\n- Tech workers who appreciate AI humor\n- Anyone building projects with Claude Code\n- Gamers who need precision and style\n\nFeatures a smooth surface for accurate mouse tracking and a non-slip rubber base that stays in place during intense coding sessions. The \"You're Absolutely Right\" design serves as a daily reminder that even when Claude corrects you, it does so with respect.\n\nHigh-quality sublimation printing ensures the design won't fade, even after months of use. Desk-sized dimensions provide ample space for both work and play.\n\nBuilt for developers, designers, and AI enthusiasts who spend hours at their desk and want their workspace to reflect their passion for artificial intelligence and human-AI collaboration.",
    price: 49.99,
    image: "/images/products/mousepad.png",
    printfulId: "68edc70784ea14", // Mouse pad from Printful
  },
  {
    id: 2,
    name: "Premium Flip-Flops",
    shortDescription: "Walk confidently knowing you're absolutely right. Comfortable sublimation flip-flops for beach, pool, or casual wear.",
    description: "Walk confidently knowing you're absolutely right.\n\nTake the Claude AI spirit beyond the screen. These premium sublimation flip-flops let you show your AI enthusiasm wherever life takes you - beach, pool, campus, or just around the house.\n\nWhy AI enthusiasts love them:\n- Conversation starter at tech meetups and conferences\n- Comfortable for long walks (just like Claude's thoughtful responses)\n- Perfect for casual Fridays at tech companies\n- Shows you're part of the AI revolution\n\nFeatures durable sublimation printing that won't peel or fade, even after beach trips and pool days. The cushioned footbed provides all-day comfort, while the sturdy rubber sole offers reliable traction.\n\nAvailable in S, M, and L sizes to fit most feet. Each pair celebrates the iconic \"You're Absolutely Right\" phrase that has become a beloved part of Claude AI culture.\n\nIdeal for developers who want to show their AI pride in casual settings, students studying machine learning, or anyone who's ever appreciated Claude's gentle corrections during a coding session.",
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
    shortDescription: "Carry everything you need with absolute confidence. All-over print minimalist backpack for the modern explorer.",
    description: "Carry everything you need with absolute confidence.\n\nDesigned for the modern AI enthusiast who's always on the move. This all-over print minimalist backpack combines functionality with a bold statement about your passion for artificial intelligence and Claude AI culture.\n\nPerfect for:\n- Commuting to tech jobs with your laptop and gear\n- College students studying computer science or AI\n- Weekend hackathons and coding bootcamps\n- Traveling to tech conferences\n- Daily carry for AI researchers and developers\n\nFeatures spacious main compartment with laptop sleeve, adjustable padded shoulder straps for comfort during long commutes, and durable water-resistant material to protect your tech gear. The all-over \"You're Absolutely Right\" design makes a statement wherever you go.\n\nBuilt with high-quality materials and reinforced stitching, this backpack is designed to withstand daily use while keeping your devices and belongings secure. The minimalist aesthetic ensures it pairs well with any outfit, from casual to business casual.\n\nWhether you're heading to work, class, or a coding session at your favorite coffee shop, this backpack carries both your gear and your enthusiasm for the AI revolution. It's a conversation piece that identifies you as someone who understands the future of human-AI collaboration.",
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
    shortDescription: "Take your absolutely right attitude on the go. Premium white glossy ceramic mug - perfect for coffee, tea, or any beverage.",
    description: "Take your absolutely right attitude on the go.\n\nStart every morning with a reminder of Claude AI's signature phrase. This premium white glossy ceramic mug is perfect for coffee, tea, or any beverage while you code, debug, or collaborate with AI assistants.\n\nThe perfect companion for:\n- Morning coding sessions with Claude\n- Late-night debugging marathons\n- Coffee breaks at tech companies\n- Gift for AI developers and enthusiasts\n- Anyone who's been politely corrected by Claude\n\nAvailable in three sizes:\n- 11 oz: Perfect for a standard cup of coffee ($24.99)\n- 15 oz: Extra fuel for longer coding sessions ($29.99)\n- 20 oz: Maximum capacity for all-day projects ($34.99)\n\nFeatures vibrant, high-quality printing that's both dishwasher and microwave safe. The glossy finish gives it a premium look that belongs in any developer's workspace.\n\nEvery sip reminds you of those moments when Claude says \"You're absolutely right\" before offering an even better solution. It's validation in ceramic form - perfect for the developer who appreciates both AI assistance and good coffee.\n\nThis mug isn't just drinkware; it's a conversation piece that signals you're part of the AI community and you understand the humor in Claude's gentle corrections.",
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
    shortDescription: "Full-zip hoodie for maximum comfort and absolutely right vibes. Perfect for any occasion.",
    description: "Full-zip heavyweight hoodie featuring the iconic 'You're Absolutely Right' phrase from Claude AI.\n\nIf you've ever chatted with Claude, you know the feeling: you suggest something, and Claude responds with \"You're absolutely right\" before gently steering you in a better direction. It's the most polite way to be corrected in the history of artificial intelligence.\n\nThis oversized hoodie celebrates that signature Claude moment.\n\nPerfect for:\n- AI developers and engineers who work with Claude daily\n- Tech enthusiasts who appreciate AI humor\n- Anyone who wants comfortable, conversation-starting apparel\n- Developers who understand the 'gentle correction' experience\n- Cold offices and late-night coding sessions\n- Casual wear that shows your AI passion\n\nFeatures premium Bella + Canvas materials with heavyweight fabric for superior warmth and durability. The oversized fit provides maximum comfort whether you're coding at home, attending hackathons, or just relaxing. Full-zip design makes it easy to layer and adjust to any temperature.\n\nAvailable in:\n- Black and White colors\n- Sizes S through 3XL for the perfect fit\n- Unisex sizing works for everyone\n\nHigh-quality printing ensures the design stays vibrant wash after wash. This isn't just a hoodie - it's a statement about your relationship with AI technology and your appreciation for thoughtful, collaborative artificial intelligence.\n\nBuilt for the AI era. Designed for developers. Perfect for anyone who's experienced that moment when Claude validates you before offering wisdom. This is more than merch—it's a nod to the future of human-AI interaction, one validation at a time.",
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
    shortDescription: "Trendy crop hoodie for those absolutely right fashion moments. Comfort meets style.",
    description: "Trendy crop hoodie for those absolutely right fashion moments.\n\nCelebrate Claude AI culture with style. This women's fleece crop hoodie combines the comfort you need for coding sessions with the fashion-forward look you want for tech events, casual outings, and everything in between.\n\nWhy AI enthusiasts love it:\n- Perfect blend of tech culture and modern fashion\n- Comfortable for long work-from-home days\n- Great conversation starter at tech meetups\n- Shows your AI passion with style\n- Ideal for casual tech company culture\n\nFeatures premium Bella + Canvas fleece material that's soft, warm, and built to last. The cropped fit offers a contemporary silhouette that pairs perfectly with high-waisted jeans, leggings, or joggers. Drawstring hood provides adjustable coverage.\n\nAvailable in sizes S through 2XL, ensuring a great fit for various body types. The \"You're Absolutely Right\" design celebrates the iconic Claude AI phrase in a fashion-forward way.\n\nPerfect for:\n- Female developers and engineers in tech\n- Students studying AI and computer science\n- Tech influencers and content creators\n- Anyone who appreciates both fashion and AI culture\n- Casual Fridays at innovative tech companies\n\nHigh-quality printing maintains its vibrant appearance through countless washes. This crop hoodie proves you don't have to choose between being fashionable and being a tech enthusiast - you can absolutely be both.\n\nComfort meets style meets AI culture. This is more than trendy apparel—it's a statement that women in tech are here, they're fashionable, and they're absolutely right about the future of AI.",
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
