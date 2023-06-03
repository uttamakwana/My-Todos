import { motion } from "framer-motion";
import React from "react";


const Header = () => {
  return (
    <header className="header">
      <h1 className="header-logo-text">
        <motion.span
          transition={{ delay: 0.1 }}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          T
        </motion.span>
        <motion.span
          transition={{ delay: 0.3 }}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          o
        </motion.span>
        <motion.span
          transition={{ delay: 0.5 }}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          d
        </motion.span>
        <motion.span
          transition={{ delay: 0.7 }}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          o
        </motion.span>
        <motion.span
          transition={{ delay: 0.9 }}
          initial={{ scale: 0, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          s
        </motion.span>
      </h1>
    </header>
  );
};

export default Header;
