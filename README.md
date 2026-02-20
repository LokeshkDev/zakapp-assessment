## Tools used
- React & Vite
- Tailwind CSS
- Font Awesome
- Axios
- JSON Server

## Key Features
- **Store Page**: Browse all products with search, category filters, and price sorting.
- **Admin Panel**: Add new products or edit/delete existing ones.
- **Mock DB**: Uses `db.json` with JSON Server to save everything.
- **Icons**: All icons are Font Awesome.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start everything (Frontend + Backend):
   ```bash
   npm start
   ```

## Local URLs
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001/products](http://localhost:3001/products)

## Backend Steps
If you want to run the backend separately, you can use:
```bash
npm run server
```
This will watch the `db.json` file and serve the API on port 3001.

## Accessibility
The application is built with web accessibility in mind:
- **ARIA Labels**: All interactive elements (inputs, dropdowns, buttons) have descriptive ARIA labels.
- **Form Labels**: Every input is explicitly linked to its label using `id` and `htmlFor`.
- **Screen Readers**: Decorative icons are hidden using `aria-hidden="true"`, and dynamic content (like notifications) uses `aria-live` regions.
- **Modal Support**: Modals include appropriate roles and focus management attributes.
