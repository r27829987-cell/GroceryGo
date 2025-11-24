# Assets — Required Images for GroceryGo

This file lists all the images the site expects (current mock data + recommended additional assets), suggested local filenames, recommended sizes and usage notes. Place images under `public/images/` following the suggested folders.

---

## Summary
- Product primary images required: 6
- Subscription images required: 2
- Recommended additional images (optional): logo, hero/banner, category thumbnails, placeholder
- Total required now: 8 primary images

---

## Required Product Images (place in `public/images/products/`)

1. Product ID 1 — Fresh Apples
   - Suggested filename: `product-1-apples.jpg`
   - Suggested path: `/images/products/product-1-apples.jpg`
   - Recommended size: 800×800 (primary), thumbnail 300×300
   - Usage: Product listing card, product details, cart

2. Product ID 2 — Organic Tomatoes
   - Suggested filename: `product-2-tomatoes.jpg`
   - Path: `/images/products/product-2-tomatoes.jpg`
   - Size: 800×800 primary, 300×300 thumbnail
   - Usage: Product listing, product card, details

3. Product ID 3 — Whole Milk
   - Suggested filename: `product-3-milk.jpg`
   - Path: `/images/products/product-3-milk.jpg`
   - Size: 800×800 primary (or 800×600), 300×200 thumbnail
   - Usage: Product listing, details

4. Product ID 4 — Basmati Rice
   - Suggested filename: `product-4-rice.jpg`
   - Path: `/images/products/product-4-rice.jpg`
   - Size: 1200×800 (if package photo), or 800×800; thumbnail 300×300
   - Usage: Product listing, details

5. Product ID 5 — Fresh Bananas
   - Suggested filename: `product-5-bananas.jpg`
   - Path: `/images/products/product-5-bananas.jpg`
   - Size: 800×800 primary, 300×300 thumbnail
   - Usage: Product listing, details

6. Product ID 6 — Spinach (Fresh)
   - Suggested filename: `product-6-spinach.jpg`
   - Path: `/images/products/product-6-spinach.jpg`
   - Size: 800×800 primary, 300×300 thumbnail
   - Usage: Product listing, details

---

## Required Subscription Images (place in `public/images/subscriptions/`)

1. Subscription ID 1 — Weekly Veggie Box
   - Suggested filename: `sub-1-veggie-box.jpg`
   - Path: `/images/subscriptions/sub-1-veggie-box.jpg`
   - Size: 1200×800 (card hero) or 800×600
   - Usage: Subscriptions page card and detail

2. Subscription ID 2 — Family Essentials
   - Suggested filename: `sub-2-essentials.jpg`
   - Path: `/images/subscriptions/sub-2-essentials.jpg`
   - Size: 1200×800 or 800×600
   - Usage: Subscriptions page card and detail

---

## Recommended (Optional) Images

- Logo
  - Filename: `logo.svg` or `logo.png`
  - Path: `/images/logo.svg`
  - Usage: Navbar, favicon source (also add a small `favicon.ico` in `public/`)

- Hero / Banner
  - Filename: `hero-1.jpg`
  - Path: `/images/hero-1.jpg`
  - Size: 1920×600 (large)
  - Usage: Home page hero section

- Category thumbnails (optional, one per category)
  - Fruits: `/images/categories/fruits.jpg`
  - Vegetables: `/images/categories/vegetables.jpg`
  - Dairy: `/images/categories/dairy.jpg`
  - Pantry: `/images/categories/pantry.jpg`
  - Size: 800×600 (or 600×400)
  - Usage: Category grid on Home/Categories pages

- Placeholder / Fallback
  - Filename: `placeholder.png` or `placeholder.jpg`
  - Path: `/images/placeholder.png`
  - Size: 800×800 (small file, compressed)
  - Usage: When a product image is missing or fails to load

- Additional gallery images (optional)
  - Filenames: `product-1-1.jpg`, `product-1-2.jpg`, etc.
  - Usage: Product detail gallery (1–3 extra images per product)

---

## Naming & Format Recommendations
- Use lowercase, hyphen-separated filenames: `product-3-milk.jpg`
- Prefer `jpg` or `webp` for photos; `webp` saves bandwidth but include `jpg` fallback if you need maximum compatibility
- Compress images (e.g., quality 75) to balance quality and load speed
- Use consistent aspect ratios for listing thumbnails (square 1:1 or 4:3) to keep the grid consistent

---

## How I’ll integrate them (if you want me to proceed)
1. Create the directories under `public/images/products` and `public/images/subscriptions`.
2. Either:
   - (A) You upload your images into those folders and I’ll update `src/utils/mockData.js` to reference them, or
   - (B) I download the current Unsplash images and save them locally, then update `mockData.js` to local paths.
3. Add a `placeholder.png` and update `ProductCard` and `ProductDetails` to use the placeholder when `image` is missing.

---

## Next action — pick one
- I can create the directories and download the Unsplash images locally and update `mockData.js` to reference them.
- Or you can upload your own images and I will place them and update `mockData.js` accordingly.

Reply with which option you prefer (download Unsplash images for you, or you will upload your images), and I will proceed.
