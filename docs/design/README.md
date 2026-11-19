# Design canvas: source files

These are the source files of the design canvas the GM and the Principal worked on from 2026-11-18 to 2026-11-19. Nothing here is built into the app. They are mock-ups.

- **Where it renders:** a private claude.ai artifact, `https://claude.ai/artifact/7FXevyKQLmCRc6RnSDdJTA` (the Principal's account). A scheduled GM run cannot open it. Read the files here instead.
- **What the files are:** `canvas/canvas.json` lists every artboard and its position. Each `*.dc.html` is one artboard. The markup inside the `<x-dc>` tag is ordinary HTML with inline styles and can be read directly.
- **None of it was rendered or checked by the GM.** The Principal looked at it and gave feedback by eye. Layout faults are likely.

## What is current and what is superseded

| Files | Status |
| --- | --- |
| `On1Welcome` to `On7Reading` | **Current.** The onboarding: about you, your situation, your money, first reading. |
| `AppHome`, `GapDetail`, `TryDecision` | **Current.** The product's three core screens. |
| `PageDesk`, `PageMobile` | **Current.** Home page with the Principal's headline, the animated maze, and the product screen. |
| `MazeCircuit`, `Circuit`, `Buildup` | Kept as reference for the maze and money-flow visual. |
| `Start` | Superseded by the onboarding row. |
| `Main`, `Everything`, `Reason`, `Leave`, `Stock`, `Map`, `Dashboard`, `Ground`, `GroundPhone` | Superseded brand angles A to G. Kept for the record. |

The decisions behind these are in `docs/gm/product_direction.md`.
