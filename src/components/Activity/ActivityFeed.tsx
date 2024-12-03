import React, { useEffect, useState } from "react";
import { useGridStore } from "../../stores/useGridStore";
import { ActivityItem } from "./ActivityItem";
import { Clock } from "lucide-react";
import { sortPixelsByLatestActivity } from "../../utils/activity";
import { useRealtimeUpdates } from "../../hooks/useRealtimeUpdates";
import { Pixel } from "../../types/grid";

export const ActivityFeed: React.FC = () => {
  const { purchasedPixels } = useGridStore();
  const [recentActivity, setRecentActivity] = useState<Pixel[]>([]);

  // Enable real-time updates
  useRealtimeUpdates();

  // Update activity list when pixels change
  useEffect(() => {
    setRecentActivity(sortPixelsByLatestActivity(purchasedPixels));
  }, [purchasedPixels]);

  if (recentActivity.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <Clock className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-500">No activity yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-500">Live</span>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
        {recentActivity.map((pixel, index) => (
          <ActivityItem key={`${pixel.x}-${pixel.y}-${index}`} pixel={pixel} />
        ))}
      </div>
    </div>
  );
};
