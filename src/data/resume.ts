/**
 * Single source of truth for all personal / professional data.
 *
 * Plain TypeScript — no JSX, no React imports. This file is imported by
 * server components, so keeping it dependency-free is intentional.
 * `as const` makes every value a literal type, which catches typos at compile time.
 */
export const DATA = {
  name: "Sam Gutentag",
  url: "https://gutentag.world",
  currentRole: "Sr. Developer Relations Engineer",
  currentCompany: "Trunk",
  companyUrl: "https://trunk.io",
  bio: "Building developer experiences and writing about the tools that shape how we code. Previously at ILM, Penumbra, Helium, and Audius.",
  contact: {
    email: "hello@samgutentag.com",
    github: "https://github.com/samgutentag",
    linkedin: "https://www.linkedin.com/in/samgutentag/",
    x: "https://x.com/samgutentag",
    mastodon: "https://mastodon.social/@samgutentag@hachyderm.io",
    bluesky: "https://bsky.app/profile/samgutentag.bsky.social",
  },
  work: [
    {
      company: "Trunk",
      href: "https://trunk.io",
      logoUrl: "/companyIcons/trunk.svg",
      logoDarkUrl: "/companyIcons/trunk-white.svg",
      title: "Sr. Developer Relations Engineer",
      location: "Remote",
      start: "Jan 2025",
      end: "Present",
    },
    {
      company: "Audius",
      href: "https://audius.co",
      logoUrl: "/companyIcons/audius.svg",
      logoDarkUrl: "/companyIcons/audius-white.svg",
      title: "Developer Relations Engineer",
      location: "Remote",
      start: "Dec 2023",
      end: "Dec 2024",
    },
    {
      company: "Helium Foundation",
      href: "https://helium.foundation",
      logoUrl: "/companyIcons/helium-foundation.svg",
      logoDarkUrl: "/companyIcons/helium-foundation-white.svg",
      title: "Developer Relations Lead",
      location: "Remote",
      start: "May 2022",
      end: "Dec 2023",
    },
    {
      company: "Penumbra, Inc",
      href: "https://www.penumbrainc.com",
      logoUrl: "/companyIcons/penumbra-white.svg",
      title: "Developer Support Engineer",
      location: "Alameda, CA",
      start: "Sep 2018",
      end: "Aug 2022",
    },
    {
      company: "Industrial Light & Magic",
      href: "https://www.ilm.com",
      logoUrl: "/companyIcons/ilm-white.svg",
      title: "Creature Technical Director",
      location: "San Francisco, CA",
      start: "Nov 2014",
      end: "Feb 2018",
    },
    {
      company: "Industrial Light & Magic",
      href: "https://www.ilm.com",
      logoUrl: "/companyIcons/ilm-white.svg",
      title: "Technical Resource Assistant",
      location: "San Francisco, CA",
      start: "Sep 2013",
      end: "Nov 2014",
    },
  ],
} as const;
