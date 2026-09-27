# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A personal website about Philippe Baetens, who owns this repo and is the user you are working with. It's a single static page with no build step: `index.html` holds the content and `styles.css` holds the styles. Light and dark themes come from `prefers-color-scheme`, driven by CSS variables on `:root`. It's meant for GitHub Pages hosting (Philippe already has a `fiepfiep.github.io` repo).

## Commands

- Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000

## Content sources

The content comes from:
- GitHub: https://github.com/phili-b. The profile bio, the `fiepfiep` profile README and the READMEs of his own (non-fork) repos, plus his fork `fast-openISP-gui`, which he substantially extended. The avatar is loaded from his GitHub avatar URL.
- LinkedIn: https://www.linkedin.com/in/philippebaetens/. It blocks automated fetching, so the job title and education are from search snippets and still need Philippe to confirm them.
- Featured projects, chosen by Philippe: `ams-OSRAM/mira220_v4l2_driver` (plus the upstream LKML patch series for the Mira220 and Mira016), `phili-b/teensy_naneyeC` and `phili-b/fast-openISP-gui`. The kernel patches are under review, so don't describe them as merged unless Philippe says they are.

`<!-- TODO -->` comments in `index.html` mark unverified content and content still to fill in from LinkedIn.

## Content rules

- Don't invent biographical details about Philippe, such as his work history, dates, degrees, skills, contact details or photos. Ask him for them, or add a `TODO` comment.
- The site describes a real person, so check facts with Philippe before publishing or deploying anything.
