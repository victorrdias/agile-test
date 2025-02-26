"use client";

import { Show } from "../../types";
import { motion } from "framer-motion";

interface PremiosTabContentProps {
  show: Show;
}

export const PremiosTabContent = ({ show }: PremiosTabContentProps) => {
  return (
    <div className="space-y-4">
      {show.awards?.map((award) => (
        <motion.div
          key={award.id}
          className="space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-base font-medium text-white">{award.name}</h3>
          <p className="text-sm">{award.description}</p>
        </motion.div>
      )) || <p>Não há prêmios registrados para esta série.</p>}
    </div>
  );
};
