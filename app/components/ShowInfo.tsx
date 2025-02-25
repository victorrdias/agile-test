// import { Show } from "../types";
// import clsx from "clsx";
// import { PlusIcon, StarIcon } from "@heroicons/react/24/outline";
// import { CheckIcon } from "@heroicons/react/24/solid";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useRef, useState } from "react";

// interface ShowInfoProps {
//   show: Show;
//   activeTab: "general" | "elenco" | "premios";
//   onTabChange: (tab: "general" | "elenco" | "premios") => void;
// }

// // Toast types with their associated colors
// type ToastType = "success" | "rating" | "recording" | "sharing" | "info";

// interface ToastData {
//   message: string;
//   visible: boolean;
//   type: ToastType;
// }

// export default function ShowInfo({
//   show,
//   activeTab,
//   onTabChange,
// }: ShowInfoProps) {
//   // State for button functionality
//   const [inMyList, setInMyList] = useState(false);
//   const [showRating, setShowRating] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [ratingValue, setRatingValue] = useState(0);
//   const [shareOpen, setShareOpen] = useState(false);
//   const [myListOpen, setMyListOpen] = useState(false);
//   const [recordingOpen, setRecordingOpen] = useState(false);
//   const [showFullDescription, setShowFullDescription] = useState(false);

//   const tabs = [
//     { id: "general", label: "GENERAL" },
//     { id: "elenco", label: "ELENCO" },
//     { id: "premios", label: "PREMIOS" },
//   ] as const;

//   // Reference to the cast carousel container
//   const carouselRef = useRef<HTMLDivElement>(null);
//   // State to track whether navigation buttons should be visible
//   const [showLeftNav, setShowLeftNav] = useState(false);
//   const [showRightNav, setShowRightNav] = useState(false);

//   // Function to scroll the carousel
//   const scrollCarousel = (direction: "left" | "right") => {
//     if (!carouselRef.current) return;

//     const scrollAmount = 280; // Approximate width of 3 cards
//     const currentScroll = carouselRef.current.scrollLeft;
//     const newScroll =
//       direction === "left"
//         ? currentScroll - scrollAmount
//         : currentScroll + scrollAmount;

//     carouselRef.current.scrollTo({
//       left: newScroll,
//       behavior: "smooth",
//     });

//     // Update navigation buttons visibility after scroll
//     setTimeout(checkScrollButtons, 300);
//   };

//   // Check if scroll buttons should be visible
//   const checkScrollButtons = () => {
//     if (!carouselRef.current) return;
//     setShowLeftNav(carouselRef.current.scrollLeft > 10);
//     setShowRightNav(
//       carouselRef.current.scrollLeft + carouselRef.current.clientWidth <
//         carouselRef.current.scrollWidth - 10
//     );
//   };

//   // Close all popups
//   const closeAllPopups = () => {
//     setShowRating(false);
//     setShareOpen(false);
//     setMyListOpen(false);
//     setRecordingOpen(false);
//   };

//   // Handle My List click
//   const handleMyListClick = () => {
//     closeAllPopups();
//     setMyListOpen(true);
//   };

//   // Handle adding to list
//   const handleAddToList = () => {
//     setInMyList(true);
//     setMyListOpen(false);
//     showToast(`${show.title} ha sido añadido a tu lista`, "success");
//   };

//   // Handle removing from list
//   const handleRemoveFromList = () => {
//     setInMyList(false);
//     setMyListOpen(false);
//     showToast(`${show.title} ha sido eliminado de tu lista`, "success");
//   };

//   // Handle Rating click
//   const handleRatingClick = () => {
//     closeAllPopups();
//     setShowRating(true);
//   };

//   // Handle Recording click
//   const handleRecordingClick = () => {
//     closeAllPopups();
//     setRecordingOpen(true);
//   };

//   // Handle start recording
//   const handleStartRecording = () => {
//     setIsRecording(true);
//     setRecordingOpen(false);
//     showToast(`${show.title} ha sido programado para grabar`, "recording");
//   };

//   // Handle cancel recording
//   const handleCancelRecording = () => {
//     setIsRecording(false);
//     setRecordingOpen(false);
//     showToast(`${show.title} ha sido cancelada la grabación`, "recording");
//   };

//   // Handle Share click
//   const handleShareClick = () => {
//     closeAllPopups();
//     setShareOpen(true);
//   };

//   // Handle rating selection
//   const handleRatingSelection = (value: number) => {
//     setRatingValue(value);
//     setShowRating(false);
//     showToast(`Has calificado ${show.title} con ${value} estrellas`, "rating");
//   };

//   // Enhanced toast notification function with type
//   const [toast, setToast] = useState<ToastData>({
//     message: "",
//     visible: false,
//     type: "info",
//   });

//   const showToast = (message: string, type: ToastType = "info") => {
//     setToast({ message, visible: true, type });
//     setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), 3000);
//   };

//   // Get toast background color based on type
//   const getToastBgColor = (type: ToastType) => {
//     switch (type) {
//       case "success":
//         return "bg-emerald-600";
//       case "rating":
//         return "bg-yellow-500";
//       case "recording":
//         return "bg-red-600";
//       case "sharing":
//         return "bg-blue-600";
//       default:
//         return "bg-gray-800";
//     }
//   };

//   // Check for overflow on mount and tab change
//   useEffect(() => {
//     if (activeTab === "elenco") {
//       setTimeout(checkScrollButtons, 100);

//       // Add resize listener to recheck when window size changes
//       window.addEventListener("resize", checkScrollButtons);
//       return () => window.removeEventListener("resize", checkScrollButtons);
//     }
//   }, [activeTab]);

//   return (
//     <div className="flex flex-col px-3 sm:px-6 md:px-12 h-full">
//       {/* Header with tabs at the top */}
//       <div className="bg-black px-2 sm:px-4 md:px-8 pt-4 md:pt-6">
//         <div className="flex items-center border-b border-gray-800">
//           <div className="flex pt-2 md:pt-4 overflow-x-auto scrollbar-hide">
//             {tabs.map((tab) => (
//               <motion.button
//                 key={tab.id}
//                 onClick={() => onTabChange(tab.id)}
//                 className={clsx(
//                   "text-sm md:text-base font-medium tracking-wide pb-2 px-3 sm:px-4 md:px-6 relative transition-colors whitespace-nowrap",
//                   activeTab === tab.id
//                     ? "text-white"
//                     : "text-gray-400 hover:text-gray-200"
//                 )}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {tab.label}
//                 {activeTab === tab.id && (
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500"
//                     layoutId="activeTab"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.2 }}
//                   />
//                 )}
//               </motion.button>
//             ))}
//           </div>
//           <div className="ml-auto">
//             <div className="bg-white text-black text-xs sm:text-sm px-1 sm:px-2 my-1 font-bold tracking-wider">
//               TELE
//             </div>
//             <div className="bg-black text-white text-xs sm:text-sm px-1 sm:px-2 my-1 font-bold tracking-wider">
//               CINE
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content area - vertically centered */}
//       <div className="flex-1 flex items-center">
//         <AnimatePresence mode="wait">
//           {activeTab === "general" && (
//             <motion.div
//               className="flex flex-col sm:flex-row w-full px-2 sm:px-4 md:px-8"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               key="general"
//             >
//               {/* Action buttons - left side */}
//               <div className="flex justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-0 w-full sm:w-auto">
//                 <motion.button
//                   className="flex flex-col items-center gap-1"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleMyListClick}
//                 >
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
//                       inMyList
//                         ? "border-emerald-500 bg-emerald-500/10"
//                         : "border-white/80"
//                     } flex items-center justify-center transition-colors`}
//                   >
//                     {inMyList ? (
//                       <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-500" />
//                     ) : (
//                       <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
//                     )}
//                   </div>
//                   <span className="text-[10px] sm:text-xs font-medium tracking-wide">
//                     Mi Lista
//                   </span>
//                 </motion.button>

//                 <motion.button
//                   className="flex flex-col items-center gap-1"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleRatingClick}
//                 >
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
//                       ratingValue > 0
//                         ? "border-yellow-400 bg-yellow-400/10"
//                         : "border-white/80"
//                     } flex items-center justify-center transition-colors`}
//                   >
//                     <StarIcon
//                       className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${
//                         ratingValue > 0 ? "text-yellow-400 fill-yellow-400" : ""
//                       }`}
//                     />
//                   </div>
//                   <span className="text-[10px] sm:text-xs font-medium tracking-wide">
//                     Evaluar
//                   </span>
//                 </motion.button>

//                 <motion.button
//                   className="flex flex-col items-center gap-1"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleRecordingClick}
//                 >
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
//                       isRecording
//                         ? "border-red-500 bg-red-500/10"
//                         : "border-white/80"
//                     } flex items-center justify-center transition-colors`}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke={isRecording ? "rgb(239, 68, 68)" : "currentColor"}
//                       className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-[10px] sm:text-xs font-medium tracking-wide">
//                     Grabar
//                   </span>
//                 </motion.button>

//                 <motion.button
//                   className="flex flex-col items-center gap-1"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleShareClick}
//                 >
//                   <div
//                     className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border ${
//                       shareOpen
//                         ? "border-blue-400 bg-blue-400/10"
//                         : "border-white/80"
//                     } flex items-center justify-center transition-colors`}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke={shareOpen ? "rgb(96, 165, 250)" : "currentColor"}
//                       className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-[10px] sm:text-xs font-medium tracking-wide">
//                     Compartir
//                   </span>
//                 </motion.button>
//               </div>

//               {/* Mi Lista panel */}
//               <AnimatePresence>
//                 {myListOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
//                     style={{
//                       width: "fit-content",
//                       maxWidth: "calc(100% - 32px)",
//                     }}
//                   >
//                     <div className="flex flex-col gap-2 items-center">
//                       <span className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2 text-center">
//                         {inMyList ? "Ya en tu lista:" : "Añadir a tu lista:"}
//                       </span>
//                       <div className="flex gap-2 sm:gap-4">
//                         {inMyList ? (
//                           <button
//                             onClick={handleRemoveFromList}
//                             className="bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs flex items-center gap-2"
//                           >
//                             <span>Quitar de Mi Lista</span>
//                           </button>
//                         ) : (
//                           <button
//                             onClick={handleAddToList}
//                             className="bg-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs flex items-center gap-2"
//                           >
//                             <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
//                             <span>Añadir a Mi Lista</span>
//                           </button>
//                         )}
//                         <button
//                           onClick={() => setMyListOpen(false)}
//                           className="bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs"
//                         >
//                           Cancelar
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Rating panel */}
//               <AnimatePresence>
//                 {showRating && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
//                     style={{
//                       width: "fit-content",
//                       maxWidth: "calc(100% - 32px)",
//                     }}
//                   >
//                     <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
//                       <span className="text-white/90 text-xs sm:text-sm">
//                         Califica este título:
//                       </span>
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <button
//                             key={star}
//                             onClick={() => handleRatingSelection(star)}
//                             className="p-1"
//                           >
//                             <StarIcon
//                               className={`w-5 h-5 sm:w-6 sm:h-6 ${
//                                 star <= ratingValue
//                                   ? "text-yellow-400 fill-yellow-400"
//                                   : "text-white/60"
//                               }`}
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Recording panel */}
//               <AnimatePresence>
//                 {recordingOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
//                     style={{
//                       width: "fit-content",
//                       maxWidth: "calc(100% - 32px)",
//                     }}
//                   >
//                     <div className="flex flex-col gap-2 items-center">
//                       <span className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2 text-center">
//                         {isRecording
//                           ? "Grabación programada:"
//                           : "Programar grabación:"}
//                       </span>
//                       <div className="flex gap-2 sm:gap-4">
//                         {isRecording ? (
//                           <button
//                             onClick={handleCancelRecording}
//                             className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs flex items-center gap-2"
//                           >
//                             <span>Cancelar Grabación</span>
//                           </button>
//                         ) : (
//                           <button
//                             onClick={handleStartRecording}
//                             className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs flex items-center gap-2"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth={1.5}
//                               stroke="currentColor"
//                               className="w-3 h-3 sm:w-4 sm:h-4"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
//                               />
//                             </svg>
//                             <span>Programar Grabación</span>
//                           </button>
//                         )}
//                         <button
//                           onClick={() => setRecordingOpen(false)}
//                           className="bg-gray-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs"
//                         >
//                           Cancelar
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Share panel */}
//               <AnimatePresence>
//                 {shareOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute left-0 right-0 mx-auto bottom-20 sm:bottom-32 md:bottom-44 bg-gray-900 p-3 sm:p-4 rounded-lg shadow-lg z-50"
//                     style={{
//                       width: "fit-content",
//                       maxWidth: "calc(100% - 32px)",
//                     }}
//                   >
//                     <div className="flex flex-col gap-2">
//                       <span className="text-white/90 text-xs sm:text-sm mb-1 sm:mb-2 text-center">
//                         Compartir con:
//                       </span>
//                       <div className="flex gap-2 sm:gap-4">
//                         <button
//                           onClick={() => {
//                             showToast("Compartido en Facebook", "sharing");
//                             setShareOpen(false);
//                           }}
//                           className="bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs"
//                         >
//                           Facebook
//                         </button>
//                         <button
//                           onClick={() => {
//                             showToast("Compartido en Twitter", "sharing");
//                             setShareOpen(false);
//                           }}
//                           className="bg-sky-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs"
//                         >
//                           Twitter
//                         </button>
//                         <button
//                           onClick={() => {
//                             showToast("Compartido por Email", "sharing");
//                             setShareOpen(false);
//                           }}
//                           className="bg-gray-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded text-xs"
//                         >
//                           Email
//                         </button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Synopsis section - right side */}
//               <div className="hidden sm:block ml-auto max-w-[50%]">
//                 <h3 className="text-sm uppercase tracking-wide mb-1 text-white/80">
//                   SINOPSE
//                 </h3>
//                 <div className="relative">
//                   <p className="text-base leading-relaxed overflow-hidden text-white/90 line-clamp-2">
//                     {show.description}
//                   </p>
//                   <button
//                     onClick={() => setShowFullDescription(true)}
//                     className="text-emerald-500 font-medium text-sm mt-1 hover:text-emerald-400 transition-colors"
//                   >
//                     Leer más
//                   </button>
//                 </div>
//               </div>

//               {/* Mobile synopsis */}
//               <div className="sm:hidden w-full mt-1">
//                 <h3 className="text-xs uppercase tracking-wide mb-1 text-white/80">
//                   SINOPSE
//                 </h3>
//                 <div className="relative">
//                   <p className="text-sm leading-tight text-white/90 line-clamp-2">
//                     {show.description}
//                   </p>
//                   <button
//                     onClick={() => setShowFullDescription(true)}
//                     className="text-emerald-500 font-medium text-xs mt-1 hover:text-emerald-400 transition-colors"
//                   >
//                     Leer más
//                   </button>
//                 </div>
//               </div>

//               {/* Full Description Overlay */}
//               <AnimatePresence>
//                 {showFullDescription && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
//                     onClick={() => setShowFullDescription(false)}
//                   >
//                     <motion.div
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       exit={{ y: 20, opacity: 0 }}
//                       className="bg-gray-900 p-5 rounded-lg max-w-2xl mx-auto max-h-[80vh] overflow-y-auto"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <h2 className="text-lg font-medium mb-3 text-white/90">
//                         {show.title}
//                       </h2>
//                       <p className="text-base leading-relaxed text-white/90">
//                         {show.description}
//                       </p>
//                       <button
//                         onClick={() => setShowFullDescription(false)}
//                         className="mt-5 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors"
//                       >
//                         Cerrar
//                       </button>
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}

//           {/* Toast notification */}
//           <AnimatePresence>
//             {toast.visible && (
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 20 }}
//                 className={`fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 mx-auto w-auto max-w-[90%] sm:max-w-md z-50 ${getToastBgColor(
//                   toast.type
//                 )} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg text-center text-xs sm:text-sm`}
//                 style={{ width: "fit-content" }}
//               >
//                 {toast.message}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {activeTab === "elenco" && (
//             <motion.div
//               className="w-full px-0"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               key="elenco"
//             >
//               {/* Cast Carousel with Navigation Controls */}
//               <div className="relative w-full">
//                 {/* Left Navigation Button */}
//                 {showLeftNav && (
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 rounded-full p-1 hover:bg-black/80"
//                     onClick={() => scrollCarousel("left")}
//                   >
//                     <ChevronLeftIcon className="h-8 w-8 text-white" />
//                   </motion.button>
//                 )}

//                 {/* Cast List */}
//                 <div
//                   ref={carouselRef}
//                   className="overflow-x-auto scrollbar-hide py-5 px-8"
//                   onScroll={checkScrollButtons}
//                 >
//                   <div className="flex space-x-4">
//                     {show.cast.map((actor) => (
//                       <motion.div
//                         key={actor.id}
//                         className="bg-zinc-900/80 rounded overflow-hidden flex-shrink-0 w-[135px] h-[100px] flex flex-col justify-center p-3"
//                         whileHover={{
//                           scale: 1.03,
//                           boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
//                           backgroundColor: "rgba(39, 39, 42, 0.9)",
//                         }}
//                       >
//                         <div className="text-center">
//                           <p className="text-sm font-medium mb-1.5">
//                             {actor.name}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             {actor.character}
//                           </p>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Right Navigation Button */}
//                 {showRightNav && (
//                   <motion.button
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/60 rounded-full p-1 hover:bg-black/80"
//                     onClick={() => scrollCarousel("right")}
//                   >
//                     <ChevronRightIcon className="h-8 w-8 text-white" />
//                   </motion.button>
//                 )}
//               </div>
//             </motion.div>
//           )}

//           {activeTab === "premios" && (
//             <motion.div
//               className="w-full px-8"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               key="premios"
//             >
//               <div className="space-y-4">
//                 {show.awards?.map((award) => (
//                   <motion.div
//                     key={award.id}
//                     className="space-y-1"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     <h3 className="text-base font-medium text-white">
//                       {award.name}
//                     </h3>
//                     <p className="text-sm">{award.description}</p>
//                   </motion.div>
//                 )) || <p>No hay premios registrados para esta serie.</p>}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
