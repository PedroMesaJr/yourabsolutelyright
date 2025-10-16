// Product catalog for yourabsolutelyright.com
// Each product will be fulfilled via Printful

export const products = [
  // TEMPORARILY DISABLED: Premium Mousepad (id: 1)
  // {
  //   id: 1,
  //   name: "Premium Mousepad",
  //   shortDescription: "You're absolutely right to upgrade your desk setup. Smooth surface, non-slip base, perfect for work or gaming.",
  //   description: "You're absolutely right to upgrade your desk setup.\n\nIf you've ever worked with Claude AI, you know the experience: precise, thoughtful, and always guiding you in the right direction. This premium mousepad brings that same philosophy to your workspace.\n\nPerfect for:\n- AI developers coding with Claude\n- Tech workers who appreciate AI humor\n- Anyone building projects with Claude Code\n- Gamers who need precision and style\n\nFeatures a smooth surface for accurate mouse tracking and a non-slip rubber base that stays in place during intense coding sessions. The \"You're Absolutely Right\" design serves as a daily reminder that even when Claude corrects you, it does so with respect.\n\nHigh-quality sublimation printing ensures the design won't fade, even after months of use. Desk-sized dimensions provide ample space for both work and play.\n\nBuilt for developers, designers, and AI enthusiasts who spend hours at their desk and want their workspace to reflect their passion for artificial intelligence and human-AI collaboration.",
  //   price: 49.99,
  //   image: "/images/products/mousepad.png",
  //   printfulId: "68edc70784ea14", // Mouse pad from Printful
  // },
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
    name: "All-Over Print Backpack",
    shortDescription: "Carry your laptop, chargers, and existential dread about deadlines. This backpack holds everything except your composure.",
    description: "All-over print backpack for when you need to look absolutely right while hauling absolutely everything.\n\nYou're absolutely right to need a backpack that can handle your lifestyle. This isn't just storage—it's a mobile validation station covered in the phrase that makes developers feel seen.\n\nWhy this backpack exists:\n- Your old backpack couldn't handle the weight of your ambitions (or your 16-inch MacBook)\n- You needed something that screams \"I work in tech\" without actually screaming\n- Someone had to make carrying things cool again\n- Here we are\n\nPerfect for:\n- Commuting with enough gear to start a small data center\n- Looking like you have your life together (you don't, but the backpack helps)\n- Hackathons where you bring 3 laptops \"just in case\"\n- Tech conferences where everyone judges your merch choices\n- Carrying energy drinks, noise-canceling headphones, and false confidence\n- Airport security lines where TSA admires your tech dedication\n\nFeatures all-over print design that wraps \"You're Absolutely Right\" around the entire backpack like a validation bubble. Spacious main compartment fits laptops up to 15\", plus all the dongles and adapters you definitely need. Padded straps prevent shoulder death during long commutes.\n\nWater-resistant material protects your tech when you inevitably get caught in the rain because you never check weather apps. Reinforced stitching survives daily abuse and existential crises.\n\nThe all-over print means no matter which angle people see you from, they know you're validated. It's 360-degree confidence coverage.\n\nBuilt for developers who treat their laptop like a firstborn child. Designed for anyone who's been told \"that's too many cables\" (there's no such thing). Perfect for carrying the weight of production bugs and the solution: more validation.\n\nThis backpack doesn't just carry your stuff—it carries your entire tech persona, wrapped in a phrase that means you're winning even when Stack Overflow can't help you.",
    price: 111.61,
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
      "/images/products/backpack/9-white-front.png",
      "/images/products/backpack/10-white-right.png",
      "/images/products/backpack/11-white-right-2.png",
      "/images/products/backpack/12-product-details.png",
      "/images/products/backpack/13-product-details-2.png",
      "/images/products/backpack/14-product-details-3.png",
    ],
    printfulId: "68f0380f51c486", // All-Over Print Backpack
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
    id: 4,
    name: "Unisex Hoodie",
    shortDescription: "Classic comfort for when you need validation in hoodie form. Because sometimes being absolutely right requires maximum coziness.",
    description: "Classic unisex hoodie for when you need validation in hoodie form.\n\nYou're absolutely right to want comfort. After seeing developers debate whether hoodies are \"real clothes\" or \"acceptable office wear\" on Twitter, we realized something: Claude would simply validate both sides before suggesting you wear whatever makes you code better.\n\nThis hoodie emerged from that exact Twitter discourse - where tech workers passionately defend their right to hoodie-based productivity. The thread got heated. People had opinions. Claude would've said everyone's absolutely right (and then gently noted that dress codes exist).\n\nWhy this hoodie exists:\n- Twitter said hoodies = peak developer aesthetic\n- You're absolutely right, they were correct\n- Someone needed to make it official merch\n- Here we are\n\nPerfect for:\n- Developers who live in hoodies\n- People who argue about hoodies online\n- Anyone who's been dress-coded at work\n- Wearing to meetings to assert dominance\n- Proving hoodies ARE professional attire\n- Cold offices where AC is set to \"Antarctic\"\n\nFeatures Cotton Heritage quality - the kind of hoodie that survives a thousand wash cycles and still looks good. Unisex fit means it works for everyone. Classic pullover style because zippers are for cowards (okay, we also have zip hoodies, but this one's for purists).\n\nAvailable in sizes S through 3XL because validation should fit everyone.\n\nThe \"You're Absolutely Right\" design reminds everyone that yes, hoodies are valid workwear, yes, comfort matters, and yes, you're winning the dress code debate simply by existing in this.\n\nBorn from Twitter discourse. Validated by Claude. Worn by developers who refuse to apologize for their wardrobe choices.\n\nThis hoodie doesn't just keep you warm—it makes a statement that comfort and productivity are absolutely right, no matter what corporate dress codes say.",
    price: 81.67,
    image: "/images/products/unisex-hoodie/1-left-front.png",
    images: [
      "/images/products/unisex-hoodie/1-left-front.png",
      "/images/products/unisex-hoodie/2-left-front-2.png",
      "/images/products/unisex-hoodie/3-left-front-3.png",
      "/images/products/unisex-hoodie/4-product-details.png",
      "/images/products/unisex-hoodie/5-right.png",
      "/images/products/unisex-hoodie/6-right-2.png",
      "/images/products/unisex-hoodie/7-right-3.png",
      "/images/products/unisex-hoodie/8-right-front.png",
      "/images/products/unisex-hoodie/9-right-front-2.png",
      "/images/products/unisex-hoodie/10-right-front-3.png",
      "/images/products/unisex-hoodie/11-right-front-4.png",
      "/images/products/unisex-hoodie/12-right-front-5.png",
    ],
    // Cotton Heritage M2580 Unisex Hoodie - 6 size variants
    printfulVariants: [
      { size: "S", variantId: "68f102ecd4b111", retailPrice: 81.67 },
      { size: "M", variantId: "68f102ecd4b179", retailPrice: 81.67 },
      { size: "L", variantId: "68f102ecd4b1c7", retailPrice: 81.67 },
      { size: "XL", variantId: "68f102ecd4b212", retailPrice: 81.67 },
      { size: "2XL", variantId: "68f102ecd4b262", retailPrice: 93.79 },
      { size: "3XL", variantId: "68f102ecd4b2a4", retailPrice: 93.79 },
    ],
    printfulId: "68f102ecd4b111", // Default to S size
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
