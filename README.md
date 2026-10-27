# AI Lab Code Dashboard

A source-first Next.js dashboard for browsing the supplied AI lab Python programs and Jupyter notebooks.

## Features

- Dark, responsive dashboard with Dashboard, All Programs, Notebooks, and About navigation.
- Search by verified program title, original filename, or source number.
- Exact source viewer with preserved notebook code-cell order.
- Copy and download actions that do not alter source text.
- Separate Screenshot Programs section containing the supplied screenshot transcriptions.
- Original `.py` and `.ipynb` files preserved in [`public/sources`](./public/sources).
- Static-friendly deployment configuration for Vercel.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To verify a production build:

```bash
npm run build
npm run start
```

The program index is generated from the workspace source files in [`public/programs.json`](./public/programs.json). `2.py` is intentionally included as supplied; it is empty and has no verified title or code.
