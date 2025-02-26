"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ActiveTab } from "../../hooks/useShowInfo";

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const TabNavigation = ({
  activeTab,
  onTabChange,
}: TabNavigationProps) => {
  const tabs = [
    { id: "general", label: "GERAL" },
    { id: "elenco", label: "ELENCO" },
    { id: "premios", label: "PRÊMIOS" },
  ] as const;

  return (
    <div className="bg-black px-2 sm:px-4 md:px-8 pt-4 md:pt-6">
      <div className="flex items-center border-b border-gray-800">
        <div className="flex pt-2 md:pt-4 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={clsx(
                "text-sm md:text-base font-medium tracking-wide pb-2 px-3 sm:px-4 md:px-6 relative transition-colors whitespace-nowrap",
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              )}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"
                  layoutId="activeTab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        <div className="ml-auto">
          <div className="bg-white text-black text-xs sm:text-sm px-1 sm:px-2 my-1 font-bold tracking-wider">
            TELE
          </div>
          <div className="bg-black text-white text-xs sm:text-sm px-1 sm:px-2 my-1 font-bold tracking-wider">
            CINE
          </div>
        </div>
      </div>
    </div>
  );
};
