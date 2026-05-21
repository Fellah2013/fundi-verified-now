# Implementation Plan - Tuma Fundi 2.0

Tuma Fundi 2.0 is a subscription-based platform connecting verified artisans (fundis) with customers in Kenya. The platform emphasizes reliability, trust, and quality through a verified skill grading system and priority service for subscribers.

## Scope & Non-Goals
- **Scope**: Frontend implementation of customer and fundi portals, subscription management, emergency booking ("Tuma Now"), and admin dashboard.
- **Persistence**: Since no server-side database/Supabase is available, all data (users, fundis, bookings, subscriptions) will be managed via **localStorage** to simulate a persistent experience within the session.
- **Non-Goals**: Real M-Pesa integration (will be mocked), real-time GPS tracking (will be simulated with static maps/coordinates), and actual SMS/Phone verification (will be mocked).

## Assumptions & Open Questions
- **Assumption**: Users will "register" and "login" using local state.
- **Assumption**: The KES 200 registration fee and monthly subscriptions will be simulated payment flows.
- **Question**: Should the platform distinguish between "Estate/Business" and "Individual" accounts during the initial registration flow? (Plan: Yes, as a selectable role).

## Affected Areas
- **Frontend**: React-based UI using Tailwind CSS and Lucide icons.
- **State Management**: React Context or Zustand for global state (Auth, Cart/Booking, Wallet).
- **Mock Data**: Pre-populated list of verified fundis, categories, and sample reviews.

## Implementation Phases

### Phase 1: Foundation & Navigation
- Set up routing (Home, Login, Register, Dashboard, Fundi Marketplace, Admin).
- Implement basic layout components (Navbar, Sidebar, Footer).
- **Owner**: `frontend_engineer`

### Phase 2: User Authentication & Onboarding (Mocked)
- Registration flow including the KES 200 fee step (mocked payment).
- Login flow for Customers, Fundis, and Admins.
- Profile setup for Fundis (ID, skills, location).
- **Owner**: `frontend_engineer`

### Phase 3: Fundi Marketplace & Booking System
- Fundi directory with filtering by category and rating.
- Fundi detail pages with "Trusted Badge" and job completion scores.
- "Tuma Now" emergency request workflow.
- Standard scheduling system.
- **Owner**: `frontend_engineer`

### Phase 4: Subscription & Payment Simulation
- Subscription plan selection UI (Basic, Standard, Premium).
- Mock M-Pesa payment gateway for subscriptions and jobs.
- Fundi Wallet system showing earnings, commissions, and simulated withdrawals.
- **Owner**: `frontend_engineer`

### Phase 5: Admin Dashboard & Refinement
- Admin view to "verify" fundis and monitor system-wide transactions.
- Simulated analytics for revenue and job completion.
- Final UI polish and responsiveness checks.
- **Owner**: `quick_fix_engineer` (for polish) / `frontend_engineer` (for dashboard)

## Sequencing Constraints
- Phase 1 must be completed before functional pages are built.
- Phase 2 (Auth/Role) is required for the different dashboard views in Phases 3-5.
- Phase 4 depends on the booking logic from Phase 3.
