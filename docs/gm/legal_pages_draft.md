# Privacy Policy and Terms of Service, draft 1

**Date:** 2026-11-18 (Mountain). **Author:** the GM. **Status:** draft 1, proposed replacement for the live `/privacy` and `/terms` pages. Not reviewed by a lawyer. Built from `claude/legal_memo.md` sections 6, 7, and 8 and product rules R3, R4, R8, R9, R10.

## The point

**The site is live and already has a privacy page and a terms page** (read 2026-11-18, about 07:00 Mountain, at `firstprinciplesmoney.com`). They are honest and short. The privacy page is missing three items California law lists, plus a contact method. Part D is the gap list, in priority order. Parts A and B are full replacement text that closes every gap.

**Nothing here is deployed.** Scheduled runs cannot reach the repo. Whoever next has repo access applies Part D.

## How to use this document

1. Parts A and B are the public text.
2. Placeholders:

| Placeholder | Value | Status |
| --- | --- | --- |
| `{{LEGAL_ENTITY_NAME}}` | Vercel variable. Live site shows "ETHEUS LLC" | Filled by Andy |
| `{{LEGAL_POSTAL_ADDRESS}}` | Vercel variable. Live site shows "30 E Broadway Suite 203 1161 Salt Lake City, UT 84111 United States" | Filled by Andy. "Suite 203 1161" may be missing punctuation, see Part D item 7 |
| `{{GOVERNING_STATE}}` | Utah, inferred from the address | Unverified: the GM does not know where the entity is formed |
| `{{CONTACT_EMAIL}}` | GM choice: `privacy@firstprinciplesmoney.com` | Mailbox does not exist as far as the GM knows. If no mailbox, use the postal address and the delete page as the contact methods and remove the email lines |
| `{{EFFECTIVE_DATE}}` | The date the new text goes live | Set at deploy |

3. Part C lists what the app must do for the text to be true. The GM could not open the code, so Part C is checked only against what the public pages show.

---

## Part A. Privacy Policy (public text)

# Privacy Policy

Effective date: {{EFFECTIVE_DATE}}

First Principles Personal Finance is operated by {{LEGAL_ENTITY_NAME}} ("we", "us"). This policy explains what we collect when you use this website and the Snapshot self-assessment, what we do with it, and how to have it deleted.

**The short version.** We collect as little as we can. We ask for ranges, never exact balances. We never ask for a Social Security number or an account number. We do not sell or share your personal information. You can delete your data with one click.

## What we collect

**If you take the Snapshot without giving an email:**
- Your result: a rating for each of the six stages and your Months of No range.
- Anonymous usage events, such as which page was viewed and whether a step was completed. These are not linked to your name or email.
- A random identifier kept in your browser. It lets us count usage without knowing who you are and keeps the site consistent between visits. You can clear it by clearing this site's data in your browser.

**If you choose to save your map:**
- Your email address.
- The result described above, plus your structure load, linked to that email. To save, your answers are sent once to be scored again and are then discarded.
- Whether you clicked "notify me" on a future product, and the price shown at the time.

**What we do not collect:**
- Social Security numbers, bank or card account numbers, or account logins.
- Exact balances, income figures, or debts. Questions offer ranges.
- Your individual answers to the questions about personal habits, relationships, and work pressure. They are used to calculate your result in the moment and are not stored.

**Collected automatically by our hosting provider:** like most websites, our host records standard technical logs, such as IP address, browser type, and time of request, to deliver the site and keep it secure.

## How we use it

- To show you your result and, if you asked, email it to you.
- To send a re-check reminder about 90 days later, if you saved your map.
- To send occasional updates about the product, if you saved your map. Every email has an unsubscribe link.
- To measure which pages and wording work, using totals and rates, not individual profiles.
- To keep the site secure and working.

We do not use your information to make decisions about credit, insurance, employment, or housing. We do not build advertising profiles.

## Who we share it with

We do not sell your personal information. We do not share it for advertising.

We use a small number of service providers who process data for us, under their own security and privacy commitments, only to run this service:

| Category | What they handle |
| --- | --- |
| Website hosting | Page requests and technical logs |
| Database hosting | Saved results and email addresses |
| Email delivery | Your email address and the emails we send you |
| Typefaces (Google Fonts) | Your IP address when a page loads |

We may also disclose information if the law requires it, or to protect the rights and safety of our users or ourselves. If the service is ever transferred to another operator, your information would move with it under this policy, and we would tell you first by email if we have your address.

## Tracking

- We use our own first-party measurement. There are no advertising pixels and no third-party analytics trackers on this site.
- We do not let other parties collect information about your activity over time and across different websites through this site. The one outside request a page makes is to Google Fonts, described above.
- **Do Not Track.** Because we do not track you across other websites, the site behaves the same whether or not your browser sends a Do Not Track signal.

## Your choices

- **Unsubscribe.** Every email has a one-click unsubscribe link. We honor it promptly, and always within 10 business days.
- **Delete your data.** Every email has a one-click delete link. It removes your email address and saved result. You can also write to {{CONTACT_EMAIL}}. We honor delete requests from everyone, wherever you live.
- **See or correct your data.** Write to {{CONTACT_EMAIL}} from the address you saved with, and we will send what we hold or correct it.
- **Use it without an email.** The Snapshot works without one.

## How long we keep it

We keep a saved email and result until you delete them or unsubscribe and ask for deletion. Anonymous usage events are kept as totals. Hosting logs are kept by our host for a limited period under its own policy.

## Security

We limit what we collect so there is less to protect. Data is sent over encrypted connections and stored with established hosting providers. No system is perfectly secure. If a breach affecting your information occurs, we will notify you as the law requires.

## Age

This service is for adults. You must be 18 or older to use it. We do not knowingly collect information from anyone under 18. If you believe a minor has given us information, write to {{CONTACT_EMAIL}} and we will delete it.

## Changes to this policy

If we make a material change, we will update the effective date at the top of this page, post a notice on the site, and email people who saved a map before the change takes effect.

## Contact

{{LEGAL_ENTITY_NAME}}
{{LEGAL_POSTAL_ADDRESS}}
{{CONTACT_EMAIL}}

---

## Part B. Terms of Service (public text)

# Terms of Service

Effective date: {{EFFECTIVE_DATE}}

These terms cover your use of First Principles Personal Finance, operated by {{LEGAL_ENTITY_NAME}} ("we", "us"). By using the Snapshot or saving your map, you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the service.

## 1. What this is

First Principles Personal Finance is an educational self-assessment. It asks about your habits and situation, scores your answers with fixed rules, and shows general educational material that matches your result.

## 2. What this is not

- **It is not advice.** Nothing here is investment, financial, tax, or legal advice, and nothing here is a recommendation to buy, sell, or hold any investment.
- **We are not your adviser.** Using the service does not create an advisory, fiduciary, or professional relationship. We are not a registered investment adviser, financial planner, broker, accountant, or law firm.
- **It does not know your full situation.** The material is general. It is the same for everyone who gets the same result. For decisions about your own money, consider speaking with a licensed professional.

## 3. Your result is an estimate

Your result, including Months of No, is arithmetic on the ranges you chose. It is only as accurate as your answers. It is not a prediction and not a guarantee of any outcome. We make no promise that using the service will improve your finances.

## 4. Who can use it

You must be 18 or older and use the service for yourself, for personal and non-commercial purposes.

## 5. Email

If you save your map, we will email your result, a re-check reminder, and occasional updates. You can unsubscribe or delete your data at any time using the links in any email.

## 6. Products that are not yet available

The site may describe a product that is not yet for sale and show a price next to a "notify me" button. Clicking it charges nothing and buys nothing. It only tells us you are interested. The price at launch may differ from the price shown, and we may decide not to offer the product.

## 7. Acceptable use

Do not misuse the service: no attempts to break, overload, or probe it, no automated scraping, and no use that breaks the law.

## 8. Our content

The framework, questions, text, and design belong to us or our licensors. You may share your own result freely. You may not copy the assessment or republish it as your own.

## 9. No warranties

The service is provided "as is" and "as available". To the fullest extent the law allows, we disclaim all warranties, express or implied, including fitness for a particular purpose and accuracy of results.

## 10. Limit of liability

To the fullest extent the law allows, we are not liable for indirect, incidental, special, or consequential damages, or for any financial loss that follows from decisions you make. Our total liability for any claim about the service is limited to the greater of the amount you paid us in the 12 months before the claim or 50 US dollars. Some places do not allow some of these limits, so they may not apply to you.

## 11. Governing law

These terms are governed by the laws of the State of {{GOVERNING_STATE}}, without regard to its conflict-of-law rules. Disputes will be heard in the state or federal courts located there, unless the law where you live gives you the right to bring a claim at home.

## 12. Changes

We may update these terms. If a change is material, we will update the effective date, post a notice on the site, and email people who saved a map. Continuing to use the service after the change means you accept the new terms.

## 13. Contact

{{LEGAL_ENTITY_NAME}}
{{LEGAL_POSTAL_ADDRESS}}
{{CONTACT_EMAIL}}

---

## Part C. What the app must do for this text to be true

Checked only against the public pages on 2026-11-18. "Seen" means the live page says or shows it. "Unverified" means it needs the code.

| # | Requirement | Status |
| --- | --- | --- |
| 1 | Individual answers are never stored | Seen as a claim on the live pages. Code unverified |
| 2 | Only ranges and stage states are stored, never a typed balance | Seen as a claim. Code unverified |
| 3 | The only browser storage is the random identifier | Unverified |
| 4 | No third-party script or tracker other than Google Fonts | Unverified: the fetch tool does not show raw HTML |
| 5 | Usage events carry no email | Seen as a claim on the delete page. Code unverified |
| 6 | Every email has a working unsubscribe link and a delete link | Unverified. The live privacy page does not mention unsubscribe |
| 7 | Delete removes the email address and the saved result | Partly seen: the delete page says it deletes "the saved result tied to" the email. Whether the email row itself goes is unverified |
| 8 | The 18-or-older box blocks Start until ticked | Box seen before question 1. Blocking unverified |
| 9 | No email is sent while the postal address is empty | Address is now filled, so this is moot in production |
| 10 | "Privacy" link in the footer of every page | Seen on all four pages read |
| 11 | The agreement sentence sits beside the save button (R10) | Unverified: the result page needs a completed snapshot |
| 12 | A 90-day re-check email exists | Unverified. If the app does not send one, remove that line from Part A and from terms section 5 |

---

## Part D. Gaps in the live pages, in priority order

Read from the live site on 2026-11-18. Each item names the fix.

**Privacy page**

1. **No statement on Do Not Track signals.** California's privacy policy law lists it (memo section 7, item 5). Fix: add the "Tracking" section from Part A.
2. **No statement on whether other parties collect activity across sites.** Same law, item 6. Fix: same section.
3. **No statement on how people learn of material changes.** Same law, item 3. Fix: add "Changes to this policy" from Part A.
4. **No contact method beyond a postal address,** and no instruction to write to it. Fix: add "Contact" and the see-or-correct line from Part A.
5. **Unsubscribe is not mentioned.** Fix: "Your choices" from Part A. Confirm the emails carry the link (rule R8).
6. **The price-intent click is described only as "something you asked about".** Fix: name it, as Part A does, and add terms section 6. This supports rule R7.
7. **Postal address reads "Suite 203 1161".** It looks like a suite and a mailbox number run together. Andy to confirm the exact form his mailbox provider gives. The address must be a valid one for email law.
8. **Google Fonts receives visitor IP addresses.** The live page discloses it, which is correct. Better: serve the fonts from our own domain so no outside request happens, then delete the line. One code change, no cost. If the app already does this through the framework's built-in font loader, the disclosure is unnecessary and should go.
9. No retention statement and no security statement. Not required by the California law. Add from Part A for trust.

**Terms page**

10. **No governing law.** Fix: section 11.
11. **No statement on how the terms change.** Fix: section 12.
12. **Liability line has no cap amount and no warranty disclaimer.** Fix: sections 9 and 10.
13. **No mention of email or of the not-yet-available product.** Fix: sections 5 and 6.

**Delete page**

14. **Anyone can type any email address and delete that person's saved result.** Low harm (a saved map is lost, nothing is exposed), and it keeps deletion one step. GM decision: accept for now, revisit if abused. An emailed confirmation link is the fix if needed.

**Site-wide**

15. **Links inside pages point to the `www` host while the bare domain also serves pages.** Pick one host and redirect the other, so search engines and the browser identifier see one site.

**How urgent.** The California law is only violated if a policy stays non-compliant 30 days after the operator is notified (memo section 7). Nobody has notified us. Items 1 to 5 should still ship in the next deploy: the site is collecting email addresses now.

---

## Part E. Choices the GM made in this draft, and why

- **Liability floor of 50 dollars.** A cap of zero on a free product reads as hostile and is more likely to be struck. GM judgment, not a sourced figure.
- **No arbitration clause, no class waiver.** Standing GM decision, 2026-11-17.
- **Home-court carve-out in terms section 11.** Customer-first, and consumer law overrides a forum clause in many states anyway.
- **Business transfer clause** with notice first, which is more than the law requires.
- **Delete for everyone,** not only residents of states that require it. From memo section 7.
- **All email treated as commercial.** From memo section 6.
- **"Financial" kept in the no-advice line.** Rule R4 bars calling ourselves an adviser. Denying it is the point of that section.

**For counsel, when engaged:** the one-hour review of these two pages is already in the proposed scope (memo section 12, question 3). Ask about terms sections 9 to 11 and whether Utah requires any added consumer wording.
