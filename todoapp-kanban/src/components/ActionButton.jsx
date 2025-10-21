import React from 'react';
import { motion } from 'framer-motion';

export const ActionButton = ({ onClick, children, colorClass, disabled, className, title }) => (
    <motion.button
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        title={title}
        className={`px-3 py-1 text-xs rounded-full shadow text-white transition duration-200 ease-in-out ${colorClass} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'} ${className || ''}`}>
        {children}
    </motion.button>
);