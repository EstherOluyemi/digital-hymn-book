# Digital Hymn Book

A responsive digital hymn book built with Angular that allows users to browse, search, read and save hymns in a clean and accessible interface.

## Features

- Browse a collection of hymns
- Search hymns by title, author, number and lyrics
- Filter hymns by category
- Sort hymns by number or title
- Browse dedicated hymn categories
- View complete hymn lyrics
- Navigate between previous and next hymns
- Save and remove favorite hymns
- Track recently viewed hymns
- Suggest a hymn through a validated form
- Light, dark and system themes
- Adjustable text sizes
- Persistent user preferences using local storage
- Responsive layouts for desktop, tablet and mobile

## Built With

- Angular
- TypeScript
- HTML
- CSS
- RxJS
- Angular Reactive Forms
- Angular Router

## Angular Concepts Used

The project demonstrates several Angular concepts, including:

- Standalone components
- Lazy-loaded routes
- Services and dependency injection
- Angular Signals
- Reactive Forms and validation
- Route parameters
- Component state
- Template control flow
- Property, event and class binding
- RxJS search debouncing
- Local storage persistence

## Project Structure

```text
src/app/
├── core/
│   ├── data/
│   ├── models/
│   └── services/
├── features/
│   ├── home/
│   ├── hymns/
│   ├── categories/
│   ├── favorites/
│   ├── suggest/
│   └── settings/
└── shared/
    └── components/