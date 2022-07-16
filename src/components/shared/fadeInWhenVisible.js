import PropTypes from "prop-types";
import React from "react";
import { motion } from "framer-motion";
export const FadeInWhenVisible = ({ children }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 1.2 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    }}
  >
    {children}
  </motion.div>
);

FadeInWhenVisible.propTypes = {
  children: PropTypes.node.isRequired,
};
