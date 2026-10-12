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

// The foam finger's Temu listing, keyed on the goods id rather than the slug.
//
// Temu retitles listings, and the slug changes with the title while the id does
// not. The owner's two links for this same product show it:
//
//   stored previously: .../set-of-6-oversized-foam-fingers-measuring-18-inches-...
//   found later:       .../gift-for-her-him-6pcs-enormous-1-foam-fingers-18in-...
//   both ending        -g-605652411892197.html
//
// so the /goods.html?goods_id= form is used: short, locale-neutral, and it
// survives the next rename. The owner confirmed this form opens the product.
//
// The owner's original link also carried a `/ca/` locale prefix (the Canadian
// storefront) plus about fifteen tracking parameters, including
// `search_key=<their search term>`, `refer_page_name=search_result`,
// `_x_sessn_id`, and `spec_gallery_id`. All of that is dropped: it describes how
// one person arrived, not which product to show. The locale matters because every
// Amazon call to action points at amazon.com, so pinning Temu to the Canadian
// storefront would send US visitors to the wrong one.
//
// Temu's own Share button produces a link the owner reports as incorrect, so do
// not substitute one. The page cannot be checked by script either: Temu answers
// every automated client, including requests spoofing Googlebot and Bingbot, with
// a CAPTCHA. This URL is verified by hand only.
export const TEMU_GOODS_ID = '605652411892197';
export const TEMU_LISTING_URL = `https://www.temu.com/goods.html?goods_id=${TEMU_GOODS_ID}`;

