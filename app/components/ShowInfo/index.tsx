"use client";

import { Show } from "../../types";
import { AnimatePresence } from "framer-motion";
import { TabNavigation } from "./TabNavigation";
import { TabContent } from "./TabContent";
import { useShowInfo, ActiveTab, ToastType } from "../../hooks/useShowInfo";

interface ShowInfoProps {
  show: Show;
  initialTab?: ActiveTab;
}

export const ShowInfo = ({ show, initialTab = "general" }: ShowInfoProps) => {
  // Use the custom hook to handle all the state and business logic
  const {
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
    carouselRef,

    setActiveTab,
    scrollCarousel,
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
  } = useShowInfo({ show, initialTab });

  // Create type-safe wrappers for problematic functions
  const getToastBgColorSafe = (type: string): string => {
    return getToastBgColor(type as ToastType);
  };

  return (
    <div className="flex flex-col px-3 sm:px-6 md:px-12 h-full">
      {/* Header with tabs at the top */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content area - vertically centered */}
      <AnimatePresence mode="wait">
        <TabContent
          key={activeTab}
          activeTab={activeTab}
          show={show}
          inMyList={inMyList}
          showRating={showRating}
          isRecording={isRecording}
          ratingValue={ratingValue}
          shareOpen={shareOpen}
          myListOpen={myListOpen}
          recordingOpen={recordingOpen}
          showFullDescription={showFullDescription}
          toast={toast}
          showLeftNav={showLeftNav}
          showRightNav={showRightNav}
          carouselRef={carouselRef}
          scrollCarousel={scrollCarousel}
          getToastBgColor={getToastBgColorSafe}
          handleMyListClick={handleMyListClick}
          handleAddToList={handleAddToList}
          handleRemoveFromList={handleRemoveFromList}
          handleRatingClick={handleRatingClick}
          handleRatingSelection={handleRatingSelection}
          handleRecordingClick={handleRecordingClick}
          handleStartRecording={handleStartRecording}
          handleCancelRecording={handleCancelRecording}
          handleShareClick={handleShareClick}
          handleSharePlatform={handleSharePlatform}
          setShowFullDescription={setShowFullDescription}
          checkScrollButtons={checkScrollButtons}
        />
      </AnimatePresence>
    </div>
  );
};
