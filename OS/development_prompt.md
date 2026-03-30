# OptiStyle Luxury E-commerce Platform - Master Development Prompt

**Objective:**
Build "OptiStyle", a premium, high-converting luxury eyewear e-commerce platform. The application must feature sophisticated micro-interactions, an elite boutique visual aesthetic, interactive product showcases, and a robust isolated Vendor Management portal. 

## 1. Tech Stack & Architecture
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Strict usage of utility classes for layout, shadows, and gradients).
- **Routing:** `react-router-dom` (BrowserRouter).
- **Animations:** `framer-motion` (for fluid page transitions, layout shifts, modals, and scrolling carousels) + `react-confetti`.
- **Icons:** `lucide-react` & `react-icons/fi`.
- **State Management:** Functional React Hooks (`useState`, `useEffect`) simulating backend functionality.

## 2. Design System & Aesthetics
- **Core Color Palette:** Deep Royal Blue (`#292077`) as the primary brand color, Metallic Gold (`#d4af37`) for accents, calls-to-action, and luxury highlights. Backgrounds are strictly clean white (`#FFFFFF`) or ultra-light gray (`#F9FAFB`).
- **Typography:** Heavy use of modern sans-serif fonts. Headings should utilize `font-black` with uppercase tracking (`tracking-widest`). Key highlight words should use `font-serif lowercase italic` in gold for a distinct luxury signature look (e.g. `The <span className="text-[#d4af37] italic font-serif">Boutique</span>`).
- **UI Components:** Widespread use of rounded corners (`rounded-2xl`, `rounded-[3rem]`), soft glowing shadow highlights (`shadow-xl shadow-[#292077]/20`), and glassmorphism (translucency + `backdrop-blur`).

---

## 3. Global Components

### The Navbar (`Navbar.jsx`)
- Fixed position at the top (`top-4`) with a floating glassmorphic container (`bg-white/70 backdrop-blur-xl`).
- **Logo:** Image aligned vertically in the center to perfectly match text height.
- **Links:** Home, Features, Shop, Categories, Vendor, Contact. Links feature custom underline hover animations expanding from the center.
- **Cart:** Cart icon with an overlapping notification badge.
- **Logic:** Must utilize `useLocation` to entirely unmount (`return null;`) when the user is on the `/login` or `/vendor/*` routes.

### The Footer (`CTA.jsx`)
- A dark, monumental luxury footer component showcasing the primary brand logo, newsletter email signup, internal utility links, and social footprints.

---

## 4. Consumer Facing Pages

### Homepage (`/`)
- **Video Hero (`Header.jsx`)**: Autoplaying background `.mp4` video. Must have a strict black-to-transparent dark gradient overlay `bg-black/40` so the glowing "OptiStyle" text is fully legible.
- **Signature Collection (`FeatureSection.jsx`)**: An interactive, tabbed showcase using `framer-motion` to smoothly transition hero product images (e.g., Nova Classic, Eclipse Aviator) alongside their detailed luxury descriptions. 
- **Categories Carousel (`Gategories.jsx`)**: Clean white luxury category cards featuring subtle gray/black shadowing mapping out eyewear types.
- **Reviews & Trust (`Gallery.jsx` / `Comments.jsx`)**: An auto-scrolling infinite marquee of luxury reviews. Must feature a functional "Add Your Review" form updating state dynamically. Underneath, a "Secure Payments" trust badge listing Visa, MasterCard, PayPal, and Apple Pay with a credit card icon.

### The Boutique / Shop (`/shop`)
- **Grid Layout**: Displays a masonry/grid map of premium eyewear products using Framer Motion layout animations.
- **Filter Tabs**: Toggleable categories ("All", "Luxury Sunglasses", "Optical Frames") directly filtering the grid. 
- **Product Modal**: Clicking "Buy Now" dims the background and opens a centered modal over the screen.
  - Displays product image, title, and price.
  - **Size Selector**: Interactive grid buttons (S, M, L).
  - **Color Swatches**: Clickable color circles mapping to HEX codes (Gold, Navy, Silver, Black). Selected color renders a checkmark.
  - **Checkout Flow**: The "Confirm & Checkout" button intercepts the flow and `navigate('/login')`, forcing the user to authorize/register to complete their purchase.

### Contact / Team (`/contact`)
- A dedicated page outlining the leadership team: *Aya Lahrar, Amine Ressa, Labiad Mohamed, Bennay Aymane*.
- Renders dynamically generated UI-Avatars mapping to brand colors for portraits. Lists direct contact methods per card.
- Incorporates the `CTA.jsx` footer organically at the bottom.

### Auth (`/login`)
- Splitted registration and login layout, stylized consistently with the royal blue/gold branding. 

---

## 5. The Vendor Portal (`/vendor/dashboard`)

*The Vendor portal must be fully isolated. It has its own layout and does not render the global Navbar or Footer.*

- **Layout Grid**: Fixed 72px/20rem sidebar on desktop featuring navigational tabs mapping to conditional main-content renderers using `<AnimatePresence>`. 
- **Top Header Tooling**: 
  - **Search Bar**: Interacts dynamically with state.
  - **Notifications**: Bell icon toggle opens an absolute-positioned dropdown. Clicking specific notifications updates their state to "read" (dimming text and dropping the unread badge count).
- **Analytics Tab**: 
  - Contains a visual SVG circular progress ring mapping "Conversion Rate".
  - Include an active `useEffect` simulating live backend data by fluctuating the conversion rate integer up and down passively every few seconds.
- **Inventory Tab**: 
  - Displays a table list of items mapped out. 
  - Typing in the global header search bar dynamically filters the rows in this table. 
  - An "Export" button generates a dummy raw JSON file download of the inventory array using `URL.createObjectURL(new Blob(...))`.
- **Orders Tab**: 
  - A dashboard table visualizing orders. 
  - Three state filter buttons: "All Orders", "Pending" (filters 'Processing'/'Pending'), and "Completed" (filters 'Shipped'/'Delivered'). 
  - Status badges utilize dynamic color backgrounds (e.g., `bg-green-50 text-green-600` for Delivered).
- **Settings Tab**: 
  - **Logo Upload Implementation**: Allow the vendor to upload an image into the "Store Brand Logo" slot. An `<input type="file" />` dynamically renders a `URL.createObjectURL` thumbnail replacing the default "O" placeholder upon successful upload.

### The "Add Product" Action Modal
- Triggered from the top global Vendor Header. Uses a 4-step wizard structure.
- **Step 1:** Basic Details (Name, Category, Description).
- **Step 2:** Visual Assets. Implements an actual hidden `<input type="file" accept="image/*" />`. Once selected, morph the drag-and-drop placeholder into a full-cover preview of the uploaded image.
- **Step 3:** Pricing & Stock. Mandatory boundary step. Clicking "Publish" executes strict form validation checking if Price and Stock state exist. If missing, render red error text preventing progression.
- **Step 4:** Confirmation screen. Successfully passing validation mounts this final screen. Natively triggers a `react-confetti` explosion mapping brand colors (`['#292077', '#d4af37', '#ffffff']`).
