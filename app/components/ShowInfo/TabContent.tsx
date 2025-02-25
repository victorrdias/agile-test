"use client";

import { Show } from "../../types";
import { motion } from "framer-motion";
import { ActionButtons } from "./ActionButtons";

import { ActiveTab, ToastData } from "../../hooks/useShowInfo";
import { RefObject } from "react";
import { GeneralTabContent } from "./GeneralTabContent";
import { ElencoTabContent } from "./ElencoTabContent";
import { PremiosTabContent } from "./PremiosTabContent";
import { ToastNotification } from "./ToastNotification";

interface TabContentProps {
  activeTab: ActiveTab;
  show: Show;
  inMyList: boolean;
  showRating: boolean;
  isRecording: boolean;
  ratingValue: number;
  shareOpen: boolean;
  myListOpen: boolean;
  recordingOpen: boolean;
  showFullDescription: boolean;
  toast: ToastData;
  showLeftNav: boolean;
  showRightNav: boolean;
  carouselRef: RefObject<HTMLDivElement | null>;
  scrollCarousel: (direction: "left" | "right") => void;
  getToastBgColor: (type: string) => string;
  handleMyListClick: () => void;
  handleAddToList: () => void;
  handleRemoveFromList: () => void;
  handleRatingClick: () => void;
  handleRatingSelection: (value: number) => void;
  handleRecordingClick: () => void;
  handleStartRecording: () => void;
  handleCancelRecording: () => void;
  handleShareClick: () => void;
  handleSharePlatform: (platform: string) => void;
  setShowFullDescription: (show: boolean) => void;
  checkScrollButtons: () => void;
}

export const TabContent = ({
  activeTab,
  show,
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
  scrollCarousel,
  getToastBgColor,
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
}: TabContentProps) => {
  return (
    <div className="flex-1 flex items-center">
      <motion.div
        className="w-full px-2 sm:px-4 md:px-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        key={activeTab}
      >
        {activeTab === "general" && (
          <GeneralTabContent
            show={show}
            actionButtons={
              <ActionButtons
                inMyList={inMyList}
                ratingValue={ratingValue}
                isRecording={isRecording}
                shareOpen={shareOpen}
                onMyListClick={handleMyListClick}
                onRatingClick={handleRatingClick}
                onRecordingClick={handleRecordingClick}
                onShareClick={handleShareClick}
              />
            }
            showFullDescription={showFullDescription}
            myListOpen={myListOpen}
            showRating={showRating}
            recordingOpen={recordingOpen}
            shareOpen={shareOpen}
            onShowFullDescription={() => setShowFullDescription(true)}
            onCloseFullDescription={() => setShowFullDescription(false)}
            onAddToList={handleAddToList}
            onRemoveFromList={handleRemoveFromList}
            onRatingSelection={handleRatingSelection}
            onStartRecording={handleStartRecording}
            onCancelRecording={handleCancelRecording}
            onSharePlatform={handleSharePlatform}
          />
        )}

        {activeTab === "elenco" && (
          <ElencoTabContent
            show={show}
            carouselRef={carouselRef}
            showLeftNav={showLeftNav}
            showRightNav={showRightNav}
            onScrollLeft={() => scrollCarousel("left")}
            onScrollRight={() => scrollCarousel("right")}
            onScroll={checkScrollButtons}
          />
        )}

        {activeTab === "premios" && <PremiosTabContent show={show} />}
      </motion.div>

      {/* Toast notification */}
      <ToastNotification
        message={toast.message}
        visible={toast.visible}
        bgColorClass={getToastBgColor(toast.type)}
      />
    </div>
  );
};
