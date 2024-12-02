import React from "react";
import { ScrollText } from "lucide-react";

export const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <ScrollText className="h-8 w-8 text-secondary" />
          <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing and using Memegrid, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using or accessing this platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Pixel Ownership and Rights
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>When you purchase pixels on Memegrid:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You receive the right to display content on your purchased
                  pixels
                </li>
                <li>Your ownership is recorded on the Solana blockchain</li>
                <li>
                  Other users can purchase your pixels at double the last
                  purchase price
                </li>
                <li>
                  We reserve the right to remove content that violates our
                  guidelines
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Content Guidelines
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>You agree not to upload or display:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Illegal, harmful, or offensive content</li>
                <li>Content that infringes on intellectual property rights</li>
                <li>Malware, scams, or malicious links</li>
                <li>
                  Content that violates any applicable laws or regulations
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Transaction Processing
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>All transactions on Memegrid:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Are processed on the Solana blockchain</li>
                <li>Are final and non-refundable</li>
                <li>Require payment of associated network fees</li>
                <li>May be delayed or fail due to network conditions</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-600">
              Memegrid is provided "as is" without warranties of any kind. We
              are not responsible for any losses or damages arising from your
              use of the platform, including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-600">
              <li>Loss of funds due to wallet compromise or user error</li>
              <li>Technical issues or network failures</li>
              <li>Content posted by other users</li>
              <li>Changes in pixel value or ownership</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Modifications to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will
              notify users of any changes by updating the date at the top of
              this page. Continued use of Memegrid after changes constitutes
              acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
