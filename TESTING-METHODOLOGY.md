# Testing Methodology

This document describes how I'm testing whether this website actually helps
students understand a few finance basics. It's not a peer-reviewed study —
it's a student project using a more careful, honest testing process than
just asking "did you like it?" I'm writing this plan down *before* running
formal testing so I can't quietly change what counts as success after seeing
the results.

## Purpose

I built this site to practice finance research and web development, and to
give other beginners a place to learn a few core investing concepts. I've
spent most of the summer building it. What I don't have yet is real evidence
that it actually works for someone who isn't me — that a first-time user can
use it, understand it, and come away knowing something they didn't before.
This testing process exists to produce that evidence honestly, including if
it shows the site doesn't work as well as I hoped.

## Testing question

Does a guided, roughly 6–8 minute walkthrough of this site measurably improve
a student's understanding of five basic investing concepts (market
capitalization, beta, P/E ratio, diversification, and price vs. quality), and
what do real users find confusing, boring, or broken?

## Planned dry run

**Purpose: process improvement only, not impact evidence.** Before any
formal testing, I'll run a small dry run with roughly **3–5** students I can
talk to directly. Its only purpose is to catch problems with the test itself
before I use it on a larger group: confusing instructions, technical bugs,
unrealistic timing estimates, ambiguous quiz questions, and any problems
connecting scores to the Google Form. I expect to revise instructions,
questions, or the flow itself based on this round. **Dry run results —
including any pre/post score change — will not be reported as findings
about the website's educational value.** The sample is too small and too
informal for that, and I am not treating it as pilot data.

For the dry run specifically, I'll hand out `?order=a` and `?order=b` links
myself rather than the plain link, so I deliberately walk through both quiz
orderings at least once each. With only 3–5 people, letting the built-in
random assignment decide could easily hand every tester the same order by
chance, meaning the reversed path never actually gets exercised before it
matters.

## Planned formal pilot

**Purpose: the first actual learning and feedback analysis.** After fixing
anything the dry run surfaces, I'll run a formal pilot with a target of
roughly **15–30** students, ideally through a describable channel (e.g. a
class period or a club) rather than an ad hoc group, so the sample can be
described honestly (who, how many, how recruited) rather than vaguely. This
is the round whose pre/post scores and feedback I intend to actually analyze
and, eventually, publish a summary of.

For balance at this sample size, I'll distribute the `?order=a` and
`?order=b` links deliberately alternating, rather than relying only on the
site's random fallback — true 50/50 randomness can plausibly land at an
uneven split like 13/7 at n=15–30, while alternation guarantees the two
orders stay close to even. To avoid the alternating sequence itself lining
up with something else (e.g. one classroom's invites all going out before
another's), I'll flip a coin for which order the very first tester gets, then
alternate strictly from there. The random fallback remains available in the
code for any later, broader, or public testing where manual alternation
isn't practical.

Before running the formal pilot, I also intend to have an outside teacher or
educator review `QUIZ` and `QUIZ2` for approximate difficulty balance — see
"Known methodological limitations" below for why.

## What testers do

Everything below happens on one page, inside the Student Test section —
there's no navigating to the real Learn or Model Lab pages during the test.
This is a deliberate change from an earlier version of this flow (see
"Known methodological limitations"): it removes navigation friction, and it
closes a real answer-leakage risk, since the ordinary Learn page's own
practice quiz uses the same question set (`QUIZ`) as the post-test.

1. Read a short, honest framing of the test (what it is, that it takes about
   6–8 minutes total including the feedback form, that criticism is more
   useful than compliments, that it's anonymous and not investment advice).
2. **Step 1 — baseline quiz (5 questions).** Answers are not revealed — no
   correct/incorrect marks, no explanations, and not the score itself —
   specifically so this step can't teach the concepts before the learning
   step that follows. The quiz locks after submission.
3. **Step 2 — five concepts, inline.** The same five lessons the quizzes
   cover render directly inside the Student Test section, pulled from the
   same `LESSONS` data the real Learn page uses, so an edit to a lesson
   automatically appears in both places. Each lesson's "how it connects
   here" line is shown smaller and muted, signaling it's background context
   rather than something either quiz tests directly (see "How learning is
   measured").
4. **Step 3 — a directed Model Lab interaction.** A single Valuation-weight
   slider, defaulting to the site's real default (20), with the instruction
   to set it to 90 and watch a small, curated set of companies re-rank. This
   is a supplemental, applied demonstration of the fifth lesson concept
   (Good Company vs. Good Price) — not a second, independent teaching
   moment, and not the full Model Lab (which stays unchanged elsewhere on
   the site, with all five factors and all fifteen companies).
5. **Step 4 — post-test (5 questions, alternate set).** Covers the same five
   concepts with different questions, so it isn't a memorized repeat of the
   first. This quiz reveals correct answers and explanations once submitted,
   since measurement is finished at that point. Unlocks only after Step 1's
   baseline is submitted.
6. **Step 5 — anonymous feedback**, through a separate Google Form. Six
   values are computed in the tester's own browser and arrive pre-filled on
   the form once Step 4 is complete: pre-test score, post-test score,
   elapsed time, which quiz order they got, and a correctness vector for
   each quiz (see "How learning is measured"). Nothing is transmitted
   anywhere unless the tester actually submits that form — the tester can
   still review or change any pre-filled value before submitting.

## How learning is measured

The primary signal is the change between the first and second quiz score,
using two different question sets that test the same five concepts (see the
site's `data.js` — `QUIZ` and `QUIZ2`). This is a real pre/post comparison,
not a repeated identical quiz, which would let someone "pass" just by
remembering an answer's position rather than by understanding it. The
baseline quiz is deliberately blind (no answers shown) so it can't itself
teach the concepts before the learning step; the second quiz reveals answers
because by that point scoring is complete. Both scores exist only in the
tester's own browser session and are never sent anywhere unless the tester
submits the feedback form — see "Feedback being collected" below.

**Counterbalancing.** Which set (`QUIZ` or `QUIZ2`) a given tester sees first
is controlled by a `?order=` URL parameter (`a` or `b`), falling back to a
random 50/50 assignment if absent. See "Planned dry run" / "Planned formal
pilot" above for how this is actually used at each stage. This exists
because the two sets, while intended to test the same five concepts at
comparable difficulty, are not guaranteed to be perfectly equivalent — see
"Known methodological limitations."

**Per-concept analysis, not just the aggregate.** Both quiz question sets
cover the five concepts in the same fixed order (market cap, beta, P/E,
diversification, price vs. quality), so each submission also records a
five-position correctness vector (e.g. `1,0,1,1,0`) for the pre- and
post-test, not just the total score. This lets me check whether the score
change is roughly even across all five concepts, or concentrated in one.
That matters specifically because of Step 3: the mini Model Lab interaction
only reinforces the fifth concept (price vs. quality) — it doesn't touch the
other four at all. If the fifth question's gain looks similar to the other
four, that's evidence the five inline lessons are doing the real teaching
and the mini Model Lab is genuinely supplemental, as intended. If it looks
meaningfully larger, that's a real, reportable finding on its own — either
way, this is checked rather than assumed. **The headline pre/post
comparison should not be read as evidence that the whole website, or the
Model Lab specifically, caused any observed change** — it's a measure of
the five inline lessons plus one directed applied interaction, in a guided
sequence, not of the site's Model Lab or Learn section as an independent
visitor would encounter them.

The self-reported understandability rating collected in the Google Form is
treated as a secondary, subjective signal — useful context, not the headline
number. "People rated it highly" is not, by itself, evidence of learning.

## Feedback being collected

Through the Google Form. No name, email, or other identifying information is
collected or required.

**Automatically filled in, required** (computed in-browser, never typed by
the tester):
- Pre-test score and post-test score
- Elapsed time on the test, in seconds — measured from when the tester opens
  the Student Test section to when they finish the post-test, not from page
  load, and not self-estimated
- Quiz order (`A` or `B`) — which question set the tester saw first
- Pre-test and post-test item-level correctness vectors (e.g. `1,0,1,1,0`),
  used for the per-concept analysis described above

**Typed by the tester, required:**
- Prior familiarity with stock analysis (clearly anchored categories)
- Overall clarity/ease, 1–5 (anchored endpoints)
- "What was the most confusing or weakest part? If nothing was confusing,
  just say so."

**Typed by the tester, optional:**
- What became clearer
- What would you improve
- Permission to quote anonymously

**Deliberately not asked:** which sections a tester used (the guided flow
means every completing tester used the same sequence, so this would just
collect a constant) and a self-estimated time spent (replaced by the
automatic measurement above, which doesn't rely on a tester's guess).

## What counts as completion

A completed test = both quizzes attempted and the feedback form submitted.
Partial completions (e.g. someone who does the quizzes but not the form, or
vice versa) will be reported as partial, not folded into the completed count.

## Known methodological limitations

- **Small sample.** Even the formal pilot (15–30) is far too small to draw
  statistically confident conclusions. Results are directional, not proof.
- **Non-random sample.** Testers are recruited through whoever I can reach,
  not a random sample of "students in general," so results may not
  generalize beyond people similar to my testers.
- **No control group.** Everyone who participates uses the site; there's no
  comparison group who didn't, so I can't fully separate "the site taught
  this" from "this person would have learned it anyway in 10 minutes of
  thinking about it."
- **Single time point.** I'm not testing whether understanding lasts beyond
  the test itself.
- **Self-selection.** Students who agree to participate may already be more
  interested in finance or more patient with a school project than average,
  which could bias results in a positive direction.
- **I both built the site and am grading the quiz.** I wrote both quiz sets
  and intended them to be equivalent in difficulty, but I'm not a neutral
  third party. On a close read, `QUIZ2` (used as the pre-test by default)
  leans more on applied/scenario reasoning in at least a few of its five
  questions than `QUIZ` does — e.g. its market-cap question requires an
  actual multiplication comparison, where `QUIZ`'s is closer to a
  definition-recall question. If that difference is real rather than
  incidental, it would tend to make the measured pre→post gain look larger
  than actual learning alone would produce, since part of the "improvement"
  could just be answering a differently-styled quiz the second time. This is
  exactly why counterbalancing (see "How learning is measured") and an
  outside educator's review, both planned before the formal pilot, matter —
  and it's also why dry-run results specifically should not be read as
  evidence of the site's educational value, even before accounting for
  sample size.
- **The Student Test flow no longer sends testers to the real Learn or
  Model Lab pages, which resolves a leakage risk an earlier version of this
  document flagged: the ordinary Learn page's own practice quiz uses the
  same question set as the post-test, so a tester who happened to try it
  mid-test could see post-test answers early.** With lessons rendered
  inline and the mini Model Lab self-contained inside the Student Test
  section itself, that specific risk no longer applies. This doesn't
  guarantee full attention to the inline lesson content — nothing about a
  web page can force genuine reading over fast scrolling — but it does
  remove the one concrete way this design could leak the actual answers.
- **Nothing persists across a page reload.** Scores live only in the
  browser's memory for that session, matching the site's existing "nothing
  is stored" design. An accidental refresh mid-test loses the baseline score
  and requires starting over — a deliberate privacy/simplicity tradeoff, not
  a bug, but worth confirming it isn't a frequent practical problem.

## How I intend to use feedback

After the formal pilot, I'll read every response, note repeated themes in
the open-ended answers, and make specific, describable changes to the site
based on what shows up most often. Each change made because of tester
feedback will be added to the Project Revision Log on the About page, tied
to the feedback that prompted it, so there's an honest, visible record of
what changed and why.

## Honest reporting commitment

Whatever the results show — including if quiz scores don't improve, if
completion rates are low, or if feedback is mostly critical — I will report
them as they actually are on the site's Testing and Impact section. No
numbers, quotes, or participant counts will be published until real data
exists to back them, and no results will be summarized in a way that implies
more confidence or scale than a small, non-random student sample supports.
