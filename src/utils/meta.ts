export function updateMetaTags(page: "home" | "meme-generator") {
  const memeTitle = "Solana Memegrid | Create and Share Your Memes";
  const memeDescription =
    "Create, customize, and share your memes with our easy-to-use meme generator. Add text, stickers, and effects to make your meme stand out on the Solana blockchain.";
  const defaultTitle =
    "Solana Memegrid | Purchase a Pixel to Add Your Meme or Advertise!";
  const defaultDescription =
    "The Solana Memegrid lets you purchase pixels to add your meme or advertise your brand or memecoin. What community is strongest? Claim your spot on the grid today!";

  // Update all meta tags
  document.title = page === "meme-generator" ? memeTitle : defaultTitle;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      page === "meme-generator" ? memeDescription : defaultDescription
    );
  }

  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );

  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      page === "meme-generator" ? memeTitle : defaultTitle
    );
  }
  if (ogDescription) {
    ogDescription.setAttribute(
      "content",
      page === "meme-generator" ? memeDescription : defaultDescription
    );
  }

  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector(
    'meta[name="twitter:description"]'
  );

  if (twitterTitle) {
    twitterTitle.setAttribute(
      "content",
      page === "meme-generator" ? memeTitle : defaultTitle
    );
  }
  if (twitterDescription) {
    twitterDescription.setAttribute(
      "content",
      page === "meme-generator" ? memeDescription : defaultDescription
    );
  }
}
