# Arkhive

> A static, searchable campaign codex and session tracker for tabletop RPGs, built with Astro and Starlight.

Arkhive began as the documentation site for my D&D campaign **The Well**, but it has gradually evolved into a reusable framework that other Game Masters can use for their own worlds and campaigns.

Unlike a traditional wiki, Arkhive treats your campaign as structured data. Session logs, NPCs, locations, factions, items, quests, and encounters are all stored as Markdown with frontmatter, allowing the site to automatically generate cross-links, statistics, dashboards, and reference pages.

Because everything is static, the site is fast, version-controlled with Git, and can be hosted for free using GitHub Pages.

## Features

* 📖 Markdown-based campaign journal
* 🗺️ World, location, and faction pages
* 👥 NPC pages with automatic appearance tracking
* 📊 Campaign dashboard with statistics and charts
* 💰 Session XP and treasure tracking
* 🔍 Full-text search
* 🔗 Automatic cross-linking between campaign entities
* 🌙 Built on Astro + Starlight
* 🚀 Free hosting on GitHub Pages

## Why?

Most campaign management tools are either:

* proprietary web applications,
* difficult to customize,
* or treat notes as unstructured text.

Arkhive aims to be something different.

By storing campaign information as structured frontmatter, the site can derive useful information automatically instead of requiring duplicate data entry.

Examples include:

* listing every session an NPC appeared in,
* generating XP progression charts,
* tracking treasure earned over time,
* building timelines,
* linking locations, quests, factions, and NPCs together automatically.

The more information you record, the more useful the site becomes.

## Technology

* Astro
* Starlight
* TypeScript
* React (for interactive components)
* uPlot (campaign statistics and charts)
* Markdown / MDX

## Repository Structure

```text
src/
├── components/
├── content/
│   ├── codex/
│   │   ├── session/
│   │   ├── npc/
│   │   ├── location/
│   │   ├── faction/
│   │   └── ...
├── lib/
├── pages/
└── styles/
```

## Current Status

Arkhive is an active work in progress.

Features are being developed alongside my campaign, so the project evolves as new needs arise. Expect the data model and components to continue growing as additional campaign systems are added.

## Using Arkhive

The easiest way to use Arkhive for your own campaign is to fork this repository and replace the campaign content inside the `src/content/` directory with your own.

Most of the functionality is driven by frontmatter, allowing dashboards, cross-links, and statistics to update automatically as your campaign grows.

## Roadmap

Planned or in-progress features include:

* Session analytics
* NPC relationship graphs
* Quest tracking
* Timeline generation
* Location statistics
* Encounter database
* Treasure analytics
* Additional dashboard widgets
* Campaign templates and starter content

## License

This project is open source. See the repository license for details.
