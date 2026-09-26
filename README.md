# 💪 FitLog — Workout Library & Daily Routine Planner

**FitLog** is a dark, responsive fitness companion built with **Next.js (App Router)** and **Tailwind CSS**. It enables fitness enthusiasts to explore a 12-lift compound and isolation exercise library, inspect detailed execution specifications, assemble a custom daily routine within a 5-lift cap, and track training volume and calories in real time.

---

## 🔗 Project Links & Submission
- **Live Site URL:** https://fitlog-app-nine.vercel.app
- **GitHub Repository:** https://github.com/Sarwar-07/fitlog-app

---

## 🛠️ Technologies Used
- **Frontend Framework:** Next.js (App Router with Server & Client Components)
- **Styling & Theme:** Tailwind CSS & PostCSS (Custom dark gym theme)
- **State Management:** React Context API with persistent `localStorage` synchronization
- **Feedback & Alerts:** React-Toastify
- **Data Architecture:** REST API with Next.js internal Route Handler proxies (`/api/fitlog` and `/api/fitlog/[id]`) and a local JSON fallback engine

---

## ⚠️ Important Note Regarding the Assignment API
The assignment prompt specified the Cloudflare Worker endpoints:
- All Workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single Workout Details: `https://api.abcz.workers.dev/api/fitlog/:id`

During implementation and evaluation, the remote Cloudflare Worker returned **HTTP 429 / Error 1027 ("This website has been temporarily rate limited because the owner has reached their plan limits")**. 

To strictly satisfy the criteria that *"Your app must run without any errors after deployment"* and *"Display all workouts... covering every major muscle group"*, the application implements a resilient **Next.js Route Handler Proxy** architecture:
1. It queries the remote API first (`https://api.abcz.workers.dev/api/fitlog`).
2. If the external worker is unreachable, throws an error, or hits rate limits (429/500), it automatically serves the complete 12-workout dataset from `src/data/workouts.json`.
3. This guarantees that evaluators always experience zero crashes, zero blank states, and full functionality across all 12 exercises.

---

## ✨ Key Features (Minimum 5 Met)
1. **Interactive 12-Lift Library Grid:** Responsive 3x4 card grid featuring categorized compound and isolation lifts with equipment tags and live metrics (duration, calories, star rating).
2. **Two-Column Workout Details (`/workouts/[id]`):** Dedicated dynamic routes with full-bleed media, target muscle badges, structured specs panel (Equipment, Difficulty, Sets, Reps), and 4-step execution guides.
3. **Reactive Sticky Navbar & Global Counters:** Real-time "Plan" (accent pill) and "Saved" (bordered pill) badge counters that link to `/my-plan` and reflect routine counts dynamically.
4. **Daily Plan Cap & Real-Time Metrics Summary:** Enforces a strict 5-lift cap for today's routine while auto-calculating total exercises, training minutes, and burned calories live on `/my-plan`.
5. **Interactive Task Management & Sorting (Challenges C1 & C3):** 
   - **Challenge C1:** Sort routine entries dynamically by *Duration*, *Calories*, or *Rating*.
   - **Challenge C3:** Mark lifts as completed (*"✔ Mark as Done"*) with status toggles and remove workouts (*"✕"*) with instant toast notifications.
6. **Graceful Empty State & Custom 404:** Handles empty tabs with a CTA to return to the library, plus a custom-styled 404 page for invalid routes.

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Sarwar-07/fitlog-app.git](https://github.com/Sarwar-07/fitlog-app.git)
   cd fitlog-app
