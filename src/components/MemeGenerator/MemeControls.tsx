import React from 'react';
import { ImagePlus, Type, Sticker, Palette } from 'lucide-react';
import { ImageUpload } from './Controls/ImageUpload';
import { TextControls } from './Controls/TextControls';
import { StickerPicker } from './Controls/StickerPicker';
import { BackgroundControls } from './Controls/BackgroundControls';

export const MemeControls: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'image' | 'text' | 'stickers' | 'background'>('image');

  const tabs = [
    { id: 'image', icon: ImagePlus, label: 'Image' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'stickers', icon: Sticker, label: 'Stickers' },
    { id: 'background', icon: Palette, label: 'Background' },
  ] as const;

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Tab Navigation */}
      <div className="flex border-b">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === id
                ? 'border-secondary text-secondary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            title={label}
          >
            <Icon className="w-5 h-5 mx-auto" />
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === 'image' && <ImageUpload />}
        {activeTab === 'text' && <TextControls />}
        {activeTab === 'stickers' && <StickerPicker />}
        {activeTab === 'background' && <BackgroundControls />}
      </div>
    </div>
  );
};