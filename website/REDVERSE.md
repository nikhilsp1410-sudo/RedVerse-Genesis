# REDVERSE

> Forging the Future of Digital Creation.

---

# Vision

RedVerse is not simply an NFT collection.

It is a premium Web3 ecosystem that combines digital collectibles,
immersive storytelling, futuristic interfaces, AI experiences and
community-driven innovation.

The experience should feel like entering a futuristic operating system
rather than visiting a traditional website.

---

# Core Principles

Every feature should satisfy at least one of these goals:

• Premium
• Minimal
• Fast
• Interactive
• Immersive
• Scalable
• Accessible
• Future Ready

If a feature does not improve the experience, it should not be added.

---

# Design Philosophy

Imagine a mix of:

Apple
+
Framer
+
Stripe
+
Cyberpunk 2077
+
Iron Man's JARVIS

The UI should be clean but cinematic.

Avoid visual clutter.

Whitespace is important.

Motion should feel intentional.

---

# Brand Identity

Name

RedVerse

Tagline

Forging the Future of Digital Creation

Theme

Dark

Premium

Luxury

Minimal

Cyberpunk

AI

Futuristic

Elegant

Never childish.

Never cartoonish.

Never overly saturated.

---

# Color Palette

Primary

#D90429

Background

#0B0B0F

Surface

#16181D

Border

rgba(255,255,255,0.08)

Accent

#FF4D6D

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Text Primary

#FFFFFF

Text Secondary

#A0A0A0

---

# Typography

Heading

Space Grotesk

Body

Inter

Display

Orbitron

Rules

Headings

Bold

Large

High contrast

Body

Readable

Comfortable spacing

Never use decorative fonts for paragraphs.

---

# Border Radius

Small

8px

Medium

16px

Large

24px

Cards

24px

Buttons

16px

---

# Shadows

Soft

Never harsh.

Use subtle red ambient glow.

Example

0 0 40px rgba(217,4,41,0.18)

---

# Glassmorphism

Allowed

Background blur

Light transparency

Thin borders

Not excessive.

---

# Animations

Motion should communicate.

Not distract.

Use Framer Motion.

Preferred

Fade

Slide

Scale

Blur reveal

Opacity

Parallax

Micro interactions

Avoid

Bounce

Shake

Flash

Random spinning

---

# Three.js Rules

Always optimize.

Never render unnecessary geometry.

Prefer procedural effects.

Lazy load all 3D scenes.

Maintain 60 FPS.

Support mobile.

Respect prefers-reduced-motion.

---

# Components

Every component must have one responsibility.

Example

Good

Button

Card

Navbar

Hero

NFTCard

Bad

MegaComponent.jsx

---

# Folder Structure

src/

components/

pages/

hooks/

context/

services/

utils/

assets/

styles/

layouts/

scenes/

data/

Each folder has a single responsibility.

---

# Naming

Components

PascalCase

Example

NFTCard.jsx

Hooks

camelCase

Example

useWallet.js

Utilities

camelCase

Example

formatAddress.js

Constants

UPPER_CASE

Example

CHAIN_ID

---

# React Rules

Functional components only.

Use hooks.

Avoid prop drilling.

Prefer Context when needed.

Memoize expensive components.

Avoid unnecessary renders.

---

# Tailwind Rules

Reuse utility classes.

Avoid duplicated styles.

Use design tokens.

Never hardcode colors repeatedly.

---

# Accessibility

Keyboard navigation

Visible focus

ARIA labels

Screen reader friendly

Reduced motion support

Contrast ratio

WCAG AA minimum

---

# Performance

Lazy loading

React.lazy()

Suspense

Code splitting

Image optimization

Tree shaking

Bundle optimization

No unnecessary dependencies.

---

# Web3

Supported Network

Polygon

Wallet

MetaMask

ethers.js

No hardcoded addresses.

Everything configurable.

---

# Smart Contract

ERC721

OpenZeppelin

Royalties

Upgradeable architecture ready

Readable service layer

---

# Code Quality

Readable

Modular

Reusable

Comment complex logic

No duplicated code

No magic numbers

---

# Git Convention

Feature

feat:

Fix

fix:

Refactor

refactor:

Performance

perf:

Documentation

docs:

Example

feat(hero): cinematic landing

---

# Commit Before Every Major Change

Always create a clean checkpoint.

---

# Pull Request Checklist

✅ Builds successfully

✅ Responsive

✅ No warnings

✅ No console errors

✅ Mobile tested

✅ Accessibility checked

✅ Performance checked

---

# Future Modules

Marketplace

Dashboard

DAO

Staking

Analytics

Mobile App

AI Assistant

Creator Portal

All future modules must follow this document.

---

# AI Instructions

Whenever an AI assistant modifies this project:

DO NOT redesign existing pages unless requested.

DO NOT change branding.

DO NOT break architecture.

Reuse existing components.

Maintain consistent spacing, typography, colors and animations.

Every new feature must integrate into the existing project.

Always prefer maintainability over cleverness.

Think like a Senior Frontend Engineer working on a premium startup.

Return production-ready code only.
