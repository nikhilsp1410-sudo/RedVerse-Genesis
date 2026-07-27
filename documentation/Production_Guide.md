# RedVerse Genesis: Production Guide & Prompt Bible

## Overview
This document serves as the absolute source of truth for all AI generation and art direction for the RedVerse Genesis NFT collection. Any prompt engineer or artist working on this collection MUST adhere to these guidelines to ensure the collection remains visually cohesive, premium, and strictly aligned with the dark luxury, ancient futuristic aesthetic.

---

## 1. Core Visual Language

- **Theme**: Ancient futuristic civilization.
- **Aesthetic**: Dark luxury, premium collectible quality.
- **Visual Target**: AAA Game Quality, Unreal Engine 5 cinematic realism, hyper-realistic.
- **No-Go Zones**: NO cartoon styles. NO anime styles. NO flat 2D illustrations. NO bright, cheery daylight. NO chaotic noise.

## 2. Material & Texture Rules

To maintain consistency across all 10,000 NFTs (and their individual traits), the following materials are the baseline:

1. **Black Obsidian**: The primary structural material. It should appear polished, dense, highly reflective, and ancient.
2. **Brushed Titanium**: Used for accents, armor joints, weapon hilts, and technical components. Provides a matte, modern contrast to the obsidian.
3. **Crimson Energy**: The primary light source and power manifestation. It must be a deep, vivid crimson red (`#DC143C`).
4. **Glowing White Engravings**: Used for ancient runes, technical decals, or secondary lighting accents. Should cast a soft, clean white bloom.

## 3. Lighting & Render Rules

Lighting is critical to achieving the "premium collectible" feel. All generated images must simulate high-end 3D rendering.

- **Primary Lighting**: Dramatic studio lighting.
- **Rim Lighting**: Strong crimson rim light to separate the subject from the background.
- **Environment**: Volumetric fog must be present in the background to create depth and atmosphere.
- **Render Engine Keywords**: `Unreal Engine 5`, `ray traced lighting`, `cinematic composition`.

## 4. Camera & Composition Rules

- **Framing**: Center-framed, symmetrical balance wherever possible. The subject must be clearly isolated and readable at small sizes (PFP scale).
- **Lens**: Simulate an 85mm lens with an f/1.8 depth of field for sharp focus on the primary subject and soft bokeh/fog in the deep background.
- **Aspect Ratio**: `--ar 1:1` for standard traits.

## 5. Universal Negative Prompt

Always append this negative prompt to ensure models do not deviate into unwanted styles:
> `cartoon, anime, 2d, flat, illustration, lowres, bad quality, messy, noisy, bright colors, text, watermark`

---

## 6. Directory Structure & Workflow

All generated prompts are stored in `d:\RedVerse\ai\prompts\`.
The system is divided into **10 Master Templates** and **75 Placeholder Prompts**.

### Workflow:
1. Open the relevant Master Template in `ai/prompts/templates/`.
2. Locate the individual item prompt in its respective folder (e.g., `ai/prompts/armor/Armor_01.md`).
3. Generate the image using the provided baseline prompt.
4. Final naming, rarity, lore, and metadata assignment will occur in a later production phase. Do not invent permanent names during the raw generation phase.

### Prompt Categories:
1. **Backgrounds** (10)
2. **Armor** (12)
3. **Helmets** (10)
4. **Weapons** (12)
5. **Crimson Cores** (8)
6. **Eyes** (10)
7. **Auras** (8)
8. **Companion Drones** (5)
9. **Guardian Characters** (Template Only)
10. **Legendary Variants** (Template Only)
