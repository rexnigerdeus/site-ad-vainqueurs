"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Wrapper d'animation au scroll — équivalent Artlist "whileInView".
 * Apparition en fondu + translation verticale douce.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger pour révéler une liste d'enfants en cascade.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
  ...props
}: HTMLMotionProps<"div"> & { y?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax léger au scroll (pour images / sections).
 */
export function Parallax({
  children,
  className,
  offset = 60,
  ...props
}: HTMLMotionProps<"div"> & { offset?: number }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: -offset }}
      viewport={{ margin: "-50% 0px -50% 0px" }}
      transition={{ ease: "easeOut", duration: 1.2 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}