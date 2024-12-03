import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { truncateAddress } from "../../utils/string";
import { Pixel } from "../../types/grid";
import { Image, Link as LinkIcon, Palette } from "lucide-react";

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
}

interface ActivityItemProps {
  pixel: Pixel;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ pixel }) => {
  const latestActivity = pixel.history[pixel.history.length - 1];
  const [timeAgo, setTimeAgo] = useState(
    formatDistanceToNow(new Date(latestActivity.timestamp))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(latestActivity.timestamp)));
    }, 60000);

    return () => clearInterval(timer);
  }, [latestActivity.timestamp]);

  const getActivityIcon = () => {
    if (pixel.image) return <Image className="h-4 w-4" />;
    if (pixel.link) return <LinkIcon className="h-4 w-4" />;
    return <Palette className="h-4 w-4" />;
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-colors">
            {getActivityIcon()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              <Link
                to={`/?x=${pixel.x}&y=${pixel.y}`}
                className="hover:text-indigo-600 transition-colors"
              >
                Position ({pixel.x}, {pixel.y})
              </Link>
            </p>
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Purchased by{" "}
            <span className="font-medium text-gray-700 hover:text-indigo-600 cursor-pointer transition-colors">
              {truncateAddress(latestActivity.owner)}
            </span>{" "}
            for{" "}
            <span className="font-medium text-gray-900">
              {latestActivity.price.toFixed(3)} SOL
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
