# Yippu PRD (v0.1)

## Summary
Yippu is a lightweight website for discovering curated outfit looks sourced from Pinterest. Visitors can browse a grid of looks and filter by gender (Male, Female, Unisex, All). Clicking a look always opens a modal with a Pinterest embed and a link out.

## Goals
- Help users discover good outfits by browsing curated looks.
- Keep the experience fast, simple, and no-login.
- Reach 100 looks in the data set.

## Non-Goals
- User accounts or logins.
- Privacy/analytics requirements.
- Cover images or custom thumbnails.

## Users
- Visitor (no login needed) can browse looks.

## Core User Flow (Browse)
1. Land on homepage.
2. Choose a gender filter: Male / Female / Unisex / All.
3. See a feed/grid of outfit cards.
4. Click a card → modal opens with Pinterest embed + link.

## Pages
- `/` Home feed with filters and grid.
- `/about` Simple page explaining why the website was made. (User-provided description text.)

## Components
- `GenderFilter`
- `TagFilter` (future-ready; not required in v0.1 unless data expands)
- `LookGrid`
- `LookCard`
- `Modal` (always used on click)

## Data Model
Single JSON file: `src/data/looks.json`.

Each item:
- `id` (string)
- `title` (string)
- `gender` (`male | female | unisex | all`)
- `tags` (string array, optional)
- `pinterestUrl` (string)
- `note` (optional)

Notes:
- Remove `coverImage` from the data model and UI.
- Update any existing "other" values to `unisex`.

## Requirements
- Modal embeds are always shown on card click.
- Simple, fast filter UX (buttons or chips).
- No login, no saved states.
- Minimum dataset size goal: 100 looks.

## Tech Decisions
- **Frontend/Backend:** Next.js (Node.js runtime) with Bun for package management and scripts.
- **Styling:** Tailwind CSS (or another current industry-standard approach if you explicitly approve).
- **Data:** Local JSON file.
- **Pinterest Integration:** Embedded pins in modal + outbound link.
- **Deployment (later):** Vercel.

## Open Questions
- Do we want a tag filter in v0.1 or defer to v0.2?
- How will new looks be added (manual JSON edits vs. lightweight admin script)?

## Success Metrics
- Data set reaches 100 looks.

## Milestones
- M1: App shell + data model finalized.
- M2: Home feed + modal embed working with gender filter.
- M3: `/about` page added with your description.
- M4: 100 looks added to `src/data/looks.json`.
