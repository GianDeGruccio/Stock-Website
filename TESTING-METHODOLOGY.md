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

Does using this website for about 10–15 minutes measurably improve a student's
understanding of five basic investing concepts (market capitalization, beta,
P/E ratio, diversification, and price vs. quality), and what do real users
find confusing, boring, or broken?

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

## Planned formal pilot

**Purpose: the first actual learning and feedback analysis.** After fixing
anything the dry run surfaces, I'll run a formal pilot with a target of
roughly **15–30** students, ideally through a describable channel (e.g. a
class period or a club) rather than an ad hoc group, so the sample can be
described honestly (who, how many, how recruited) rather than vaguely. This
is the round whose pre/post scores and feedback I intend to actually analyze
and, eventually, publish a summary of.

## What testers do

1. Read a short, honest framing of the test (what it is, that it takes
   ~10–15 minutes, that criticism is more useful than compliments, that it's
   anonymous and not investment advice).
2. Take a 5-question baseline quiz. **Answers are not revealed** — no
   correct/incorrect marks, no explanations, and ideally not even the score
   itself — specifically so this step can't teach the concepts before the
   learning step that follows. The quiz locks after submission.
3. Read all five Learn lessons (the same five concepts the quizzes cover)
   and use the Model Lab, changing at least one factor weight. A Research
   page visit is offered afterward as optional, since it isn't tied to a
   specific quiz concept.
4. Take a second 5-question quiz covering the same five concepts with
   different questions, so it isn't a memorized repeat of the first. This
   quiz does reveal correct answers and explanations once submitted, since
   measurement is finished at that point. This step only unlocks after
   Step 2's baseline is submitted.
5. Submit anonymous feedback through a separate Google Form. If both quizzes
   are complete, the pre- and post-test scores arrive already filled in on
   the form (via a Google Forms pre-filled link built from data already in
   the tester's own browser) — the tester can still review or change them
   before submitting.

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

The self-reported understandability rating collected in the Google Form is
treated as a secondary, subjective signal — useful context, not the headline
number. "People rated it highly" is not, by itself, evidence of learning.

## Feedback being collected

Through the Google Form: pre-test score, post-test score (both pre-filled
when available, editable by the tester), which sections a tester used, prior
familiarity with stock analysis, roughly how much time they spent, an
understandability rating, what became clearer, what was confusing, what
should change, and whether their anonymous feedback may be quoted. No name,
email, or other identifying information is collected or required.

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
  and consider them equivalent in difficulty, but I'm not a neutral third
  party, and I haven't had an outside educator review them for balance yet.
- **Order isn't fully enforced.** The site's normal navigation stays open
  during testing — nothing stops a tester from browsing Learn before
  starting the baseline quiz, which would undercut the blind pre-test. The
  post-test is locked until the baseline is submitted, but earlier browsing
  isn't prevented. For the dry run this is managed through direct
  instruction; whether it's a real problem at pilot scale is itself
  something the dry run should surface.
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
