# Carbon icons

Interface icons use the official npm package `@carbon/icons-react` 11.92.0.

Source: https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react

The wrappers preserve existing exports, default dimensions, accessible labels, refs, and RTL behavior. A shared renderer normalizes old fill/stroke classes for Carbon's filled geometry. Brand marks and flags remain unchanged.

Only calendar-arrows.ts contains adapted SVG strings because flatpickr requires HTML strings rather than React components. Those chevrons come from `@carbon/icons` 11.92.0, copyright IBM Corp., licensed under Apache-2.0 (included in LICENSE).
