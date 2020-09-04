import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingSpinner = (props) => {
  const apiCalls = useSelector((state) => state.apiCalls);

  // If there are api calls being made then show the spinner
  return (
    <>
      <AnimatePresence>
        {apiCalls > 0 && (
          <motion.div
            inital={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.25 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            className="spinner"
          >
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingSpinner;
