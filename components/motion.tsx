"use client"

import * as React from "react"
import { motion, type Variants, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export function FadeIn({
  className,
  delay = 0,
  duration = 0.5,
  children,
}: React.PropsWithChildren<{ className?: string; delay?: number; duration?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SlideUp({
  className,
  delay = 0,
  duration = 0.6,
  children,
}: React.PropsWithChildren<{ className?: string; delay?: number; duration?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  className,
  children,
  delayChildren = 0.05,
  staggerChildren = 0.05,
}: React.PropsWithChildren<{ className?: string; delayChildren?: number; staggerChildren?: number }>) {
  const variants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced premium animations
export function ScaleIn({
  className,
  delay = 0,
  duration = 0.4,
  children,
}: React.PropsWithChildren<{ className?: string; delay?: number; duration?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SlideInLeft({
  className,
  delay = 0,
  duration = 0.5,
  children,
}: React.PropsWithChildren<{ className?: string; delay?: number; duration?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SlideInRight({
  className,
  delay = 0,
  duration = 0.5,
  children,
}: React.PropsWithChildren<{ className?: string; delay?: number; duration?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function FloatAnimation({
  className,
  children,
  amplitude = 10,
  duration = 3,
}: React.PropsWithChildren<{ className?: string; amplitude?: number; duration?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      animate={{
        y: [0, -amplitude, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulseGlow({
  className,
  children,
  intensity = 0.3,
}: React.PropsWithChildren<{ className?: string; intensity?: number }>) {
  return (
    <motion.div
      className={cn(className)}
      animate={{
        boxShadow: [
          `0 0 20px rgba(66, 232, 224, ${intensity})`,
          `0 0 40px rgba(66, 232, 224, ${intensity * 1.5})`,
          `0 0 20px rgba(66, 232, 224, ${intensity})`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Interactive hover animations
export function HoverLift({
  className,
  children,
  lift = 8,
  ...props
}: React.PropsWithChildren<HTMLMotionProps<"div"> & { lift?: number }>) {
  return (
    <motion.div
      className={cn(className, "hover-lift")}
      whileHover={{ y: -lift, transition: { duration: 0.2, ease: "easeOut" } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function GlowOnHover({
  className,
  children,
  color = "rgba(66, 232, 224, 0.4)",
  ...props
}: React.PropsWithChildren<HTMLMotionProps<"div"> & { color?: string }>) {
  return (
    <motion.div
      className={cn(className)}
      whileHover={{
        boxShadow: `0 0 30px ${color}, 0 0 60px ${color}`,
        transition: { duration: 0.3 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
