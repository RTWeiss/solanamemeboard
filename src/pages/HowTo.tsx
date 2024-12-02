import React from "react";
import {
  MousePointer2,
  CreditCard,
  Image as ImageIcon,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";

export const HowTo: React.FC = () => {
  const steps = [
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          How to Use Memegrid
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-12">
            Memegrid is a collaborative pixel canvas on the Solana blockchain
            where you can purchase pixel space to showcase your memes, advertise
            your project, or be part of web3 history. Here's how to get started:
          </p>

          <div className="space-y-12">
            {steps.map((step, index) => (
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

          <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4">
              Pricing & Ownership
            </h3>
            <ul className="space-y-3 text-indigo-900">
              <li>• New pixels cost 0.001 SOL each</li>
              <li>• You can select multiple pixels to create larger spaces</li>
              <li>
                • Your ownership is not permanent and can be purchased by
                another user at any time
              </li>
              <li>
                • When purchasing owned pixels, the price is double the last
                purchase price
              </li>
              <li>
                • You can update your pixels' content at any time by purchasing
                them again
              </li>
            </ul>
          </div>

          <div className="mt-12 p-6 bg-orange-50 rounded-lg">
            <h3 className="text-xl font-semibold text-orange-900 mb-4">
              Content Guidelines
            </h3>
            <ul className="space-y-3 text-orange-900">
              <li>• Keep content family-friendly and appropriate</li>
              <li>• Respect intellectual property rights</li>
              <li>• No harmful, offensive, or illegal content</li>
              <li>• No malicious links or scams</li>
              <li>
                • We reserve the right to remove content that violates these
                guidelines
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
