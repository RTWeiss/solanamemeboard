import React from "react";
import {
  MousePointer2,
  CreditCard,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
  Sticker,
  Type,
  Download,
  Palette,
} from "lucide-react";

export const HowTo: React.FC = () => {
  const pixelGridSteps = [
    {
      icon: <MousePointer2 className="h-6 w-6" />,
      title: "Select Your Space",
      description:
        "Click and drag on the grid to select the pixels you want to purchase. The larger the selection, the more visible your content will be!",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Connect Your Wallet",
      description:
        "Connect your Solana wallet (like Phantom or Solflare) to make the purchase. Make sure you have enough SOL to cover the pixel cost.",
    },
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: "Add Your Content",
      description:
        "Upload an image or choose a color for your pixels. Images can be PNG, JPG, or GIF format, up to 5MB in size.",
    },
    {
      icon: <LinkIcon className="h-6 w-6" />,
      title: "Add a Link (Optional)",
      description:
        "Include a link to your website, social media, or any destination you want visitors to reach when they click your pixels.",
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Complete Purchase",
      description:
        "Confirm the transaction in your wallet and wait for it to be processed on the Solana blockchain. Your pixels will be updated immediately after confirmation!",
    },
  ];

  const memeGeneratorSteps = [
    {
      icon: <ImageIcon className="h-6 w-6" />,
      title: "Upload Your Image",
      description:
        "Start by uploading your base image. This can be any image you want to turn into a meme. Supported formats include PNG, JPG, and GIF up to 5MB.",
    },
    {
      icon: <Type className="h-6 w-6" />,
      title: "Add Text",
      description:
        "Add text to your meme using the text tool. You can customize the font, size, color, and style. Click and drag to position your text anywhere on the image.",
    },
    {
      icon: <Sticker className="h-6 w-6" />,
      title: "Add Stickers",
      description:
        "Enhance your meme with stickers! Choose from our collection of emojis and meme stickers. Resize, rotate, and position them to perfect your creation.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Customize Background",
      description:
        "Optionally customize the background color or add patterns to make your meme stand out. Perfect for when you want to add some extra flair!",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download Your Meme",
      description:
        "Preview your meme and download it! Choose between a free version with our watermark or pay 0.001 SOL for an unbranded version.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          How to Use MemeGrid
        </h1>

        <div className="space-y-16">
          {/* Pixel Grid Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pixel Grid Guide
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                The Pixel Grid lets you purchase and customize pixel spaces on
                our collaborative canvas. Here's how to get started:
              </p>
              <div className="space-y-8">
                {pixelGridSteps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Meme Generator Section */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Meme Generator Guide
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Create and customize your own memes with our easy-to-use Meme
                Generator. Follow these steps to make your perfect meme:
              </p>
              <div className="space-y-8">
                {memeGeneratorSteps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tips Section */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-1" />
                <span>Use high-contrast colors for better text visibility</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-1" />
                <span>Keep text concise and impactful for better memes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-1" />
                <span>Experiment with different font sizes and styles</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-1" />
                <span>Use stickers strategically to enhance your meme</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary mt-1" />
                <span>
                  Preview your meme before downloading to ensure everything
                  looks perfect
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
