# E-commerce Project FM

A React + TypeScript + Vite e-commerce storefront built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS + DaisyUI
- Supabase auth and cart persistence
- React Query for async data fetching
- Motion for animated transitions
- Toast notifications for in-app feedback

## Features

- Product listing with search and category filters
- Product detail page with main image and thumbnail carousel
- Quantity selector, remove and add-to-cart flow
- Cart view with item subtotal calculation
- Toast notifications for user actions
- Auth pages for login/register flows

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173` after the dev server starts.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production bundle
- `npm run preview` — preview the production build locally
- `npm run test` — run Vitest
- `npm run lint` — run ESLint

## Testing

A focused test has been added for the product detail `RenderProductItem` component.

```bash
npm run test
```

## What was added

- `src/pages/product/component/RenderProductItem.test.tsx`
  - verifies quantity increment/decrement behavior
  - confirms `addToBag` receives the selected quantity
- `src/pages/product/ProductItem.tsx`
  - renders toast notifications for the product page
- `src/custom-hooks/useCart.tsx`
  - invalidates the cart cache after mutations
  - passes quantity into `addToBag`

## Suggested next improvements

- Add a centralized toast container in `App.tsx` so notifications work across all pages
- Add an order checkout flow and payment integration
- Add wishlist / saved favorites support
- Add product sorting and advanced filtering
- Add authenticated cart sync and order history pages
- Add end-to-end tests for cart behavior and checkout

## Notes

This app is a good base for a full e-commerce store. The current test coverage is minimal, so adding more tests for cart interaction, product search, and routing will help make the app production-ready.