// External destinations, in their own module on purpose: the navbar is a client
// component and needs the Amazon URL, and importing lib/products.ts there would
// pull the entire product catalogue (descriptions, FAQs, features) into the
// browser bundle.
// The foam finger's Amazon listing. `th=1` is kept deliberately: it belongs to
// Amazon's variation/twister family, and removing parameters is the one change
// that could plausibly stop the colour selector from appearing. Everything a
// search result carries (ref, dib, dib_tag, m, marketplaceID, nsdOptOutParam,
// qid, s, sr) is dropped - those only encode how you arrived, never which page
// you land on. The `/EYRYA-.../dp/<ASIN>` slug is optional decoration, so the
// canonical `/dp/<ASIN>` form is used; it survives a title edit.
export const AMAZON_FLAGSHIP_ASIN = 'B0GXC35N85';
export const AMAZON_FLAGSHIP_URL = `https://www.amazon.com/dp/${AMAZON_FLAGSHIP_ASIN}?th=1`;

// TODO(owner): replace with the correct Temu link. The current one is known to be
// wrong, and is left in place only until a replacement is supplied.
export const TEMU_LISTING_URL =
  'https://www.temu.com/ca/set-of-6-oversized-foam-fingers-measuring-18-inches-46-cm----events-parties-concerts-and-celebrations-offered-in--colors-g-605652411892197.html';
