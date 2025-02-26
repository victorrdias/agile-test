"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Show } from "../types";
import {
  getToastBgColor,
  ToastType,
  scrollCarousel,
} from "../lib/utils/uiUtils";

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

  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);

  const [inMyList, setInMyList] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [myListOpen, setMyListOpen] = useState(false);
  const [recordingOpen, setRecordingOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [showRightNav, setShowRightNav] = useState(false);

  const [toast, setToast] = useState<ToastData>({
    message: "",
    visible: false,
    type: "info",
  });

  const closeAllPopups = () => {
    setShowRating(false);
    setShareOpen(false);
    setMyListOpen(false);
    setRecordingOpen(false);
  };

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, visible: true, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
  };

  const addToMyListMutation = useMutation({
    mutationFn: async () => {
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setInMyList(true);
      setMyListOpen(false);
      showToast(`${show.title} foi adicionado à sua lista`, "success");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
  });

  const removeFromMyListMutation = useMutation({
    mutationFn: async () => {
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setInMyList(false);
      setMyListOpen(false);
      showToast(`${show.title} foi removido da sua lista`, "success");
      queryClient.invalidateQueries({ queryKey: ["myList"] });
    },
  });

  const saveRatingMutation = useMutation({
    mutationFn: async (rating: number) => {
      return { success: true, showId: show.id, rating };
    },
    onSuccess: (_, rating) => {
      setRatingValue(rating);
      setShowRating(false);
      showToast(`Você avaliou ${show.title} com ${rating} estrelas`, "rating");
    },
  });

  const startRecordingMutation = useMutation({
    mutationFn: async () => {
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setIsRecording(true);
      setRecordingOpen(false);
      showToast(`${show.title} foi programado para gravação`, "recording");
    },
  });

  const cancelRecordingMutation = useMutation({
    mutationFn: async () => {
      return { success: true, showId: show.id };
    },
    onSuccess: () => {
      setIsRecording(false);
      setRecordingOpen(false);
      showToast(`A gravação de ${show.title} foi cancelada`, "recording");
    },
  });

  const shareShowMutation = useMutation({
    mutationFn: async (platform: string) => {
      return { success: true, showId: show.id, platform };
    },
    onSuccess: (_, platform) => {
      setShareOpen(false);
      showToast(`Compartilhado no ${platform}`, "sharing");
    },
  });

  const checkScrollButtons = () => {
    if (!carouselRef.current) return;
    setShowLeftNav(carouselRef.current.scrollLeft > 10);
    setShowRightNav(
      carouselRef.current.scrollLeft + carouselRef.current.clientWidth <
        carouselRef.current.scrollWidth - 10
    );
  };

  const handleScrollCarousel = (direction: "left" | "right") => {
    scrollCarousel(carouselRef, direction, checkScrollButtons);
  };

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
  useEffect(() => {
    if (activeTab === "elenco") {
      setTimeout(checkScrollButtons, 100);

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
    scrollCarousel: handleScrollCarousel,
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

    getToastBgColor,
  };
}
