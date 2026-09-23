/**
 * ============================================================================
 * INDIAWANDER - CLIENT DEMO / VIEW-ONLY MODE CONFIGURATION
 * ============================================================================
 * 
 * When VIEW_ONLY_MODE = true:
 * - The website runs in clean "View Only" showcase mode for client demonstrations.
 * - Deep package & destination detail pages (/packages/:slug, /destinations/:slug) 
 *   are locked so internal itineraries, hotel lists, and details are protected.
 * - Package cards display a direct "Inquire This Journey" / "Plan This Trip" button
 *   that opens the booking modal pre-filled with the package name.
 * - Direct URL visits to /packages/:slug or /destinations/:slug redirect to the main view.
 * 
 * When VIEW_ONLY_MODE = false:
 * - Full multi-page navigation is completely restored!
 * - Every package card shows "View Package →" linking to the full 19-section
 *   /packages/:slug page, and all destination detail pages are fully enabled.
 * 
 * TO SWITCH BACK AT ANY TIME:
 * Simply set VIEW_ONLY_MODE = false below!
 * ============================================================================
 */
export const VIEW_ONLY_MODE = true;

