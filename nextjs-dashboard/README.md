# Next.js Training Plan

![Next.js Training Plan Overview](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd1XW2rQN8FeKs6NfZ_Dh-bXsGY-uE1Qfdos-f7jmRjuSWdOZ0xWZet2GDuK3LvXxXd3em1JkmN3VyfrOWLm-mm8CZ9ZKuerJSRwVF8L9Ir8SM7xBsVbUo10PMS_lrx0xr5PO4nxbtAR9_KEXY2C8CphHI?key=ULzQfxtlUV4dL8_d7VlWDQ)
www.agilityio.com

NEXTJS TRAINING PLAN

14Th Aug 2024

## OVERVIEW

- This Next.js training plan focuses on the latest version of Next.js ([14.2.3](https://github.com/vercel/next.js/releases/tag/v14.2.3)). Learn Next.js fundamentals step by step and practice hands-on. <https://nextjs.org/> 

## REFERENCE TIMELINE

- Total: 3 weeks

- Fundamentals Approach

- Advanced Approach

- Practice Improvements
  
## FUNDAMENTALS APPROACH

### TARGETS

- Initialize the Next.js app with one command or upgrade to the latest version.

- Master key features: routing, caching, streaming, and data fetching.

- Understand the operation and build a full-stack web app with Next.js.

- Complete the course and record quiz results during implementation.

- Apply Unit testing and Storybook.

- Implement both UI/UX and functionality.

### STUDY PLAN

- [Introduction](https://nextjs.org/learn/dashboard-app)

- [Chapter 1: Getting Started](https://nextjs.org/learn/dashboard-app/getting-started)

- [Chapter 2: CSS Styling](https://nextjs.org/learn/dashboard-app/css-styling)

- [Chapter 3: Optimizing Fonts and Images](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images)

- [Chapter 4: Creating Layouts and Pages](https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages)

- [Chapter 5: Navigating Between Pages](https://nextjs.org/learn/dashboard-app/navigating-between-pages)

- [Chapter 6: Setting Up Database](https://nextjs.org/learn/dashboard-app/setting-up-your-database): Skip all PostgreSQL databases and use [mockapi](https://mockapi.io/) as an alternative solution to interact with data.

- [Chapter 7: Fetching Data](https://nextjs.org/learn/dashboard-app/fetching-data): The same approach was as Chapter 6, please skip all PostgreSQL/SQL database guidelines. Alternatively, the trainees can replace API queries by hitting api directly in file /app/lib/data.ts.

- [Chapter 8: Static and Dynamic Rendering](https://nextjs.org/learn/dashboard-app/static-and-dynamic-rendering)

- [Chapter 9: Streaming](https://nextjs.org/learn/dashboard-app/streaming)

- [Chapter 10: Partial Prerendering (Optional)](https://nextjs.org/learn/dashboard-app/partial-prerendering)

- [Chapter 11: Adding Search and Pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)

- [Chapter 13: Handling Errors](https://nextjs.org/learn/dashboard-app/error-handling)

## ADVANCED APPROACH

### TARGETS

- Use hooks for efficient Search features.

- Differentiate and apply server/client directives appropriately.

- Handle errors, show relevant ones per situation.

- Include accessibility and form validation consistently.

- Understand metadata for SEO and shareability.

### STUDY PLAN

- [Chapter 14: Improving Accessibility](https://nextjs.org/learn/dashboard-app/improving-accessibility)

- [Chapter 16: Adding Metadata](https://nextjs.org/learn/dashboard-app/adding-metadata)

- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

- [Rendering](https://nextjs.org/docs/app/building-your-application/rendering)

- [Caching](https://nextjs.org/docs/app/building-your-application/caching)

- [Optimizing](https://nextjs.org/docs/app/building-your-application/optimizing)

- [File Conventions](https://nextjs.org/docs/app/api-reference/file-conventions)

- [Configuration (OPTIONAL)](https://nextjs.org/docs/app/api-reference/next-config-js)

### PRACTICE IMPLEMENTATION

Some outstanding hooks/directives/features:

- Hooks:

  - useSearchParams

  - usePathname

  - userRouter

  - useFormStatus

  - useFormState

- Directives:

  - 'use server'

  - 'use client'

- Features:

  - The notFound function and not-found file

  - Revalidate the client cache

## REFERENCES

### PERFORMANCE & ACCESSIBILITY MEASUREMENT TOOLS

- [LightHouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)

- [Google PageSpeed](https://pagespeed.web.dev/)

### AUTHENTICATION

- [NextAuth](https://next-auth.js.org/)

### UI FRAMEWORKS

- [shadcn/ui](https://ui.shadcn.com/)
