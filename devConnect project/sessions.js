// Each slot has a shared start/end time and up to three sessions (one per track).
// track: "a" | "b" | "c" — used for the color chip and dialog label.

const SCHEDULE = {
  day1: [
    {
      time: "9:00 – 9:45",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Rethinking the request lifecycle", speaker: "Priya Nandan", room: "Hall 1", description: "A walk through how request tracing changed after moving three services to an event-driven core, and what broke along the way." },
        { track: "b", label: "Track B · Product", title: "Naming things users actually understand", speaker: "Owen Castillo", room: "Hall 2", description: "Case studies on renaming internal jargon in shipped UI, and the support-ticket drop that followed." },
        { track: "c", label: "Track C · Design", title: "Type scales that survive redesigns", speaker: "Mei Lindqvist", room: "Hall 3", description: "Building a type system that outlives the brand refresh that comes after it." }
      ]
    },
    {
      time: "10:00 – 10:45",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Debugging across service boundaries", speaker: "Tomas Reyes", room: "Hall 1", description: "Practical tooling for the moment a bug stops living in one codebase." },
        { track: "b", label: "Track B · Product", title: "Shipping small when the roadmap is big", speaker: "Anna Buford", room: "Hall 2", description: "How one team broke an 18-month roadmap into weekly shippable slices." },
        { track: "c", label: "Track C · Design", title: "Designing empty states with intent", speaker: "Diego Farrow", room: "Hall 3", description: "Empty screens as an invitation to act, not an apology for missing data." }
      ]
    },
    {
      time: "11:15 – 12:00",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Postmortems that change behavior", speaker: "Grace Odom", room: "Hall 1", description: "Why most postmortems get filed and forgotten, and a format that doesn't." },
        { track: "b", label: "Track B · Product", title: "Talking to users without leading them", speaker: "Sam Whitcombe", room: "Hall 2", description: "Interview scripts that catch you asking leading questions before your user does." },
        { track: "c", label: "Track C · Design", title: "Color systems for low-vision users", speaker: "Ines Marchetti", room: "Hall 3", description: "Contrast, redundancy, and the palette decisions that hold up under real constraints." }
      ]
    },
    {
      time: "1:30 – 2:15",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Queues at the edge of their limits", speaker: "Ben Okafor", room: "Hall 1", description: "What actually happens to a message queue under five times expected load." },
        { track: "b", label: "Track B · Product", title: "Metrics that lie by default", speaker: "Hana Kessler", room: "Hall 2", description: "Common dashboard metrics that look healthy while the product is failing." },
        { track: "c", label: "Track C · Design", title: "Motion with a job to do", speaker: "Lars Petrenko", room: "Hall 3", description: "Cutting decorative animation and keeping only the motion that explains a change." }
      ]
    }
  ],
  day2: [
    {
      time: "9:00 – 9:45",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Migrating a database with zero downtime", speaker: "Priya Nandan", room: "Hall 1", description: "The dual-write pattern that got 40 million rows moved without a maintenance window." },
        { track: "b", label: "Track B · Product", title: "Saying no to a feature request", speaker: "Owen Castillo", room: "Hall 2", description: "A framework for declining well-intentioned requests without souring the relationship." },
        { track: "c", label: "Track C · Design", title: "Designing for one thumb", speaker: "Mei Lindqvist", room: "Hall 3", description: "Reachability zones, and what changes when you design for a phone held in one hand." }
      ]
    },
    {
      time: "10:00 – 10:45",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Caching invalidation, honestly", speaker: "Tomas Reyes", room: "Hall 1", description: "The failure modes that don't show up until cache invalidation meets real traffic." },
        { track: "b", label: "Track B · Product", title: "Onboarding flows that respect time", speaker: "Anna Buford", room: "Hall 2", description: "Cutting an 11-step onboarding down to 3 without losing activation." },
        { track: "c", label: "Track C · Design", title: "Accessible forms are just good forms", speaker: "Diego Farrow", room: "Hall 3", description: "Why the accessible version of a form is usually the clearer version for everyone." }
      ]
    },
    {
      time: "11:15 – 12:00",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Feature flags without the regret", speaker: "Grace Odom", room: "Hall 1", description: "Keeping a flag system from turning into an unmaintainable second codebase." },
        { track: "b", label: "Track B · Product", title: "Pricing pages people actually read", speaker: "Sam Whitcombe", room: "Hall 2", description: "What eye-tracking data says about how people actually scan a pricing page." },
        { track: "c", label: "Track C · Design", title: "Dark mode is a system, not a filter", speaker: "Ines Marchetti", room: "Hall 3", description: "Why inverting colors breaks contrast ratios, and what a real dark palette needs." }
      ]
    },
    {
      time: "1:30 – 2:15",
      sessions: [
        { track: "a", label: "Track A · Systems", title: "Closing keynote: what breaks next", speaker: "Ben Okafor", room: "Hall 1", description: "A look at the failure patterns showing up across systems built in the last two years." },
        { track: "b", label: "Track B · Product", title: "The roadmap nobody agreed to", speaker: "Hana Kessler", room: "Hall 2", description: "How roadmaps drift from what was actually agreed, and how to catch it early." },
        { track: "c", label: "Track C · Design", title: "Design systems after year three", speaker: "Lars Petrenko", room: "Hall 3", description: "What a design system needs once it outgrows its founding team." }
      ]
    }
  ]
};
