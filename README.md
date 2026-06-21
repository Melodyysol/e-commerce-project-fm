# E-commerce Project FM

A React + TypeScript + Vite e-commerce storefront built with:

- React 19
- TypeScript
- Vite
- Tailwind CSS + DaisyUI
- Supabase (Database, Auth, and RLS cart/profile management)
- Zod (Runtime schema validation and type safety inference)
- TanStack React Query (Server state synchronization and cache invalidation)
- React Query for async data fetching
- Motion (Fluid, hardware-accelerated animated transitions)
- Toast notifications for in-app feedback

## Features

- Dynamic Product Engine: Full-catalog listing with fuzzy/wildcard lookup engines (.ilike()) driving text searches.
- Media Carousel Layout: Syncs primary layouts with localized thumbnail arrays, boundary navigation guards, and asynchronous loading skeletons.
- Relational Cart Syncing: Full read/write backend database synchronization utilizing Postgres database foreign key relation structures (.select("*, products(*)")).
- Granular Security (RLS): Enforced custom Row Level Security policies isolated by account references (auth.uid() = user_id).
- Strict Parsing Architectures: Runtime contract schema guards isolating remote data returns safely before component processing.
- Interactive Identity Profile Layouts: Encapsulates reactive client-side blob image generators (URL.createObjectURL()) ahead of remote storage piping.

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

## What was added and resolved

- `src/pages/product/component/RenderProductItem.test.tsx`
  - verifies quantity increment/decrement behavior
  - confirms `addToBag` receives the selected quantity
- `src/pages/product/ProductItem.tsx`
  - renders toast notifications for the product page
- `src/custom-hooks/useCart.tsx`
  - invalidates the cart cache after mutations
  - passes quantity into `addToBag`
- `src/schemas/cartShema.ts & productSchema.ts`
  - Configured Zod typing schemas to expect relational table shapes (products: productSchema).
  - Swapped account string constraints to enforce strict Supabase UUID formatting parameters (z.string().uuid()).

## Contribution

Contributions are welcome. To contribute:

1. Fork the repository
2. Create a new branch for your feature or fix
3. Submit a pull request with a clear description

## Contact

- Email: [issaabdulwaris212@gmail.com](mailto:issaabdulwaris212@gmail.com)
- Instagram: [@issaabdulwaris212](https://instagram.com/issaabdulwaris212/)
- LinkedIn: [Issa Abdulwaris](https://www.linkedin.com/in/issa-abdulwaris-b4329639b/)
- Twitter: [@melody_shiller](https://x.com/melody_shiller)
- GitHub: [Melodyysol](https://github.com/Melodyysol)

## License

This project is licensed under the MIT License. See `LICENSE` for details.