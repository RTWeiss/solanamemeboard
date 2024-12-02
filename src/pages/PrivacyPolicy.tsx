import React from "react";
import { Shield } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="h-8 w-8 text-secondary" />
          <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              When you use Memegrid, we collect and process the following
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Public wallet addresses used to interact with the platform
              </li>
              <li>Transaction data on the Solana blockchain</li>
              <li>Images and links you choose to display on the grid</li>
              <li>Basic usage data such as pixel selections and purchases</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                To process your pixel purchases and display your content on the
                grid
              </li>
              <li>
                To maintain a record of pixel ownership and transaction history
              </li>
              <li>To prevent fraud and ensure platform security</li>
              <li>To improve our services and user experience</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Data Storage and Security
            </h2>
            <p className="text-gray-600 mb-4">
              Your data is stored and processed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Transaction data is stored on the public Solana blockchain
              </li>
              <li>Images and metadata are stored in secure cloud storage</li>
              <li>
                We implement industry-standard security measures to protect your
                data
              </li>
              <li>
                We do not store private keys or sensitive wallet information
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to request deletion of your data (where applicable)</li>
              <li>Right to object to data processing</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
