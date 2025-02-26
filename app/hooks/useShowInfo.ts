"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Show } from "../types";

// Toast types with their associated colors
export type ToastType = "success" | "rating" | "recording" | "sharing" | "info";

export interface ToastData {
  message: string;
  visible: boolean;
  type: ToastType;
}

export type ActiveTab = "general" | "elenco" | "premios";

interface UseShowInfoProps {
  show: Show;
  initialTab?: ActiveTab;
}

export function useShowInfo({
  show,
  initialTab = "general",
}: UseShowInfoProps) {
  const queryClient = useQueryClient();

  // State for tabs
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  // State for button functionality
  const [inMyList, setInMyList] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [myListOpen, setMyListOpen] = useState(false);
  const [recordingOpen, setRecordingOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Reference for carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(false);

  // Toast notification
  const [toast, setToast] = useState<ToastData>({
    message: "",
    visible: false,
    type: "info",
  });

  // Close all popups
  const closeAllPopups = () => {
    setShowRating(false);
    setShareOpen(false);
    setMyListOpen(false);
    setRecordingOpen(false);
  };

  // Show toast notification
  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  // Add to my list mutation
  const addToMyListMutation = useMutation({
    mutationFn: async () => {
      // In a real app, this would call an API
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setInMyList(true);
      setMyListOpen(false);
      showToast(`${show.title} foi adicionado à sua lista`, "success");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
  });

  // Remove from my list mutation
  const removeFromMyListMutation = useMutation({
    mutationFn: async () => {
      // In a real app, this would call an API
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setInMyList(false);
      setMyListOpen(false);
      showToast(`${show.title} foi removido da sua lista`, "success");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
  });

  // Save rating mutation
  const saveRatingMutation = useMutation({
    mutationFn: async (rating: number) => {
      // In a real app, this would call an API
      return { success: true, showId: show.id, rating };
    },
    onSuccess: (_, rating) => {
      setRatingValue(rating);
      setShowRating(false);
      showToast(`Você avaliou ${show.title} com ${rating} estrelas`, "rating");
    },
  });

  // Start recording mutation
  const startRecordingMutation = useMutation({
    mutationFn: async () => {
      // In a real app, this would call an API
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setIsRecording(true);
      setRecordingOpen(false);
      showToast(`${show.title} foi programado para gravação`, "recording");
    },
  });

  // Cancel recording mutation
  const cancelRecordingMutation = useMutation({
    mutationFn: async () => {
      // In a real app, this would call an API
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setIsRecording(false);
      setRecordingOpen(false);
      showToast(`A gravação de ${show.title} foi cancelada`, "recording");
    },
  });

  // Share show mutation
  const shareShowMutation = useMutation({
    mutationFn: async (platform: string) => {
      // In a real app, this would call an API
      return { success: true, showId: show.id, platform };
    },
    onSuccess: (_, platform) => {
      setShareOpen(false);
      showToast(`Compartilhado no ${platform}`, "sharing");
    },
  });

  // Check if carousel scroll buttons should be visible
  const checkScrollButtons = () => {
    if (!carouselRef.current) return;
    setShowLeftNav(carouselRef.current.scrollLeft > 10);
    setShowRightNav(
      carouselRef.current.scrollLeft + carouselRef.current.clientWidth <
        carouselRef.current.scrollWidth - 10
    );
  };

  // Function to scroll the carousel
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const scrollAmount = 280; // Approximate width of 3 cards
    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });

    // Update navigation buttons visibility after scroll
    setTimeout(checkScrollButtons, 300);
  };

  // Handlers for UI interactions
  const handleMyListClick = () => {
    closeAllPopups();
    setMyListOpen(true);
  };

  const handleAddToList = () => {
    addToMyListMutation.mutate();
  };

  const handleRemoveFromList = () => {
    removeFromMyListMutation.mutate();
  };

  const handleRatingClick = () => {
    closeAllPopups();
    setShowRating(true);
  };

  const handleRatingSelection = (value: number) => {
    saveRatingMutation.mutate(value);
  };

  const handleRecordingClick = () => {
    closeAllPopups();
    setRecordingOpen(true);
  };

  const handleStartRecording = () => {
    startRecordingMutation.mutate();
  };

  const handleCancelRecording = () => {
    cancelRecordingMutation.mutate();
  };

  const handleShareClick = () => {
    closeAllPopups();
    setShareOpen(true);
  };

  const handleSharePlatform = (platform: string) => {
    shareShowMutation.mutate(platform);
  };

  // Check for overflow on mount and tab change
  useEffect(() => {
    if (activeTab === "elenco") {
      setTimeout(checkScrollButtons, 100);

      // Add resize listener to recheck when window size changes
      window.addEventListener("resize", checkScrollButtons);
      return () => window.removeEventListener("resize", checkScrollButtons);
    }
  }, [activeTab]);

  return {
    // State
    activeTab,
    inMyList,
    showRating,
    isRecording,
    ratingValue,
    shareOpen,
    myListOpen,
    recordingOpen,
    showFullDescription,
    toast,
    showLeftNav,
    showRightNav,

    // Refs
    carouselRef,

    // Actions
    setActiveTab,
    scrollCarousel,
    closeAllPopups,
    handleMyListClick,
    handleAddToList,
    handleRemoveFromList,
    handleRatingClick,
    handleRatingSelection,
    handleRecordingClick,
    handleStartRecording,
    handleCancelRecording,
    handleShareClick,
    handleSharePlatform,
    setShowFullDescription,
    checkScrollButtons,

    // Helper functions
    getToastBgColor: (type: ToastType) => {
      switch (type) {
        case "success":
          return "bg-emerald-600";
        case "rating":
          return "bg-yellow-500";
        case "recording":
          return "bg-red-600";
        case "sharing":
          return "bg-blue-600";
        default:
          return "bg-gray-800";
      }
    },
  };
}
