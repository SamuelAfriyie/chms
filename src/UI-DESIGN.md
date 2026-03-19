# CHMS Design Specification: "High-Tech Sanctuary"

## 1. Brand Identity & Visual Language

The **Church Management System (CHMS)** design language is rooted in **Modern Liturgical Minimalism**. It balances the functional efficiency of an enterprise developer tool with the communal trust of **Impact Field Chapel**.

* **Design Principle:** High-Contrast Professionalism.
* **Visual Strategy:** Use "Impact Blue" for all primary actions and navigation, "Sanctuary White" for content clarity, and "Steel Mist" for structural depth.

---

## 2. Global Color System

Define these as CSS variables or Tailwind constants to ensure consistency across the application.

| Variable Name | Hex Code | Application |
| :--- | :--- | :--- |
| `--color-impact-blue` | `#1A1A9E` | Sidebar background, Primary Buttons, Active Tabs, Link text. |
| `--color-sanctuary-white`| `#FFFFFF` | Main workspace background, Card surfaces, Modal backgrounds. |
| `--color-steel-mist` | `#F4F4F9` | App-wide background (behind cards), Inactive input fills. |
| `--color-divine-gold` | `#D4AF37` | **Accent Only:** Success states, "Goal Reached" indicators, VIP tags. |
| `--color-halo-gray` | `#E0E0E6` | Borders, Dividers, Table grid lines. |
| `--color-text-main` | `#2D2D2D` | High-readability body text (not pure black). |

---

## 3. Typography

Focus on legibility for high-density data entry and "Scribe" transcription features.

* **Primary Typeface:** `Inter` or `Montserrat` (Sans-serif).
* **Scale:**
    * **H1 (Page Title):** 24px, Semi-bold, Impact Blue.
    * **H2 (Section Header):** 18px, Medium, Impact Blue.
    * **Body:** 14px, Regular, Text Main.
    * **Labels/Captions:** 12px, Medium, Gray-600.

---

## 4. Layout & Grid Architecture

The app follows a **Master-Detail Layout** for efficient management.

* **Sidebar Navigation:** * Width: `240px` fixed.
    * Background: `Impact Blue`.
    * Icon Style: 24px Line icons (White @ 70% opacity).
    * Active State: `Divine Gold` left-border (3px).
* **Top Action Bar:** * Height: `64px`.
    * Contains: Global Search (Member look-up), Notifications, User Profile.
* **Main Stage:** * Background: `Steel Mist`.
    * Padding: `32px` on all sides.

---

## 5. Component Specifications

### **A. Input Fields & Forms**

* **Surface:** `Steel Mist` background with a 1px `Halo Gray` border.
* **Focus State:** Border transitions to `Impact Blue` with a 2px soft glow.
* **Radius:** `8px` (Rounded).
* **Labeling:** Labels sit directly above the field in 12px Medium Gray.

### **B. Data Tables ("The Ledger")**

* **Header:** `Steel Mist` background, Uppercase text, `Halo Gray` bottom border.
* **Rows:** `Sanctuary White` background.
* **Hover State:** Background shifts to `#F0F0FF` (faint blue tint).
* **Padding:** Vertical `12px`, Horizontal `16px`.

### **C. Cards & Containers**

* **Background:** `Sanctuary White`.
* **Shadow:** `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);`
* **Corner Radius:** `8px`.

---

## 6. Interaction & UX States

* **Empty States:** Use a watermark version of the **Impact Field Chapel** logo (10% opacity) in the center of empty tables with a "Get Started" call-to-action.
* **Success Feedback:** Use `Divine Gold` for confirmation checkmarks and progress bars to provide a "rewarding" feeling for administrative tasks.
* **Loading:** Implement **Skeleton Screens** (pulsing Steel Mist blocks) instead of traditional spinners for a faster perceived performance.