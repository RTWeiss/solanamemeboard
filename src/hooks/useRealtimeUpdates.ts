import { useEffect, useCallback } from "react";
import { supabase } from "../config/supabase";
import { useGridStore } from "../stores/useGridStore";
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { Pixel } from "../types/grid";

export const useRealtimeUpdates = () => {
  const { loadPixels, updatePixelInStore } = useGridStore();

  const handlePixelChange = useCallback(
    async (payload: RealtimePostgresChangesPayload<any>) => {
      if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
        const { data: pixel } = await supabase
          .from("pixels")
          .select("*, pixel_history(*)")
          .eq("id", payload.new.id)
          .single();

        if (pixel) {
          const formattedPixel: Pixel = {
            x: pixel.x,
            y: pixel.y,
            owner: pixel.owner,
            image: pixel.image_url,
            link: pixel.link_url,
            color: pixel.color,
            startX: pixel.start_x,
            startY: pixel.start_y,
            endX: pixel.end_x,
            endY: pixel.end_y,
            currentPrice: pixel.price,
            history: pixel.pixel_history.map((h: any) => ({
              owner: h.owner,
              price: h.price,
              timestamp: new Date(h.created_at).getTime(),
            })),
          };

          updatePixelInStore(formattedPixel);
        }
      }
    },
    [updatePixelInStore]
  );

  useEffect(() => {
    let pixelsChannel: RealtimeChannel;
    let historyChannel: RealtimeChannel;

    const setupSubscriptions = async () => {
      // Initial load
      await loadPixels();

      // Subscribe to pixels table changes
      pixelsChannel = supabase
        .channel("pixels-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "pixels",
          },
          handlePixelChange
        )
        .subscribe();

      // Subscribe to pixel_history table changes
      historyChannel = supabase
        .channel("history-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "pixel_history",
          },
          () => {
            loadPixels(); // Reload all pixels for history changes
          }
        )
        .subscribe();
    };

    setupSubscriptions();

    // Cleanup subscriptions
    return () => {
      if (pixelsChannel) {
        supabase.removeChannel(pixelsChannel);
      }
      if (historyChannel) {
        supabase.removeChannel(historyChannel);
      }
    };
  }, [loadPixels, handlePixelChange]);
};
