import { Icons } from "@/components/icons";

export const DATA = {
  name: "Sam Gutentag",
  initials: "SG",
  url: "https://gutentag.world",
  tagline: "Gutentag, World",
  currentRole: "Developer Relations Engineer",
  currentCompany: "Audius",
  get description(): string {
    return `Hi! I'm ${this.name}, ${this.currentRole} at ${this.currentCompany}. I love building things and helping people.`;
  },
  summary: "Gutentag, World",
  avatarUrl: "/me.png",
  skills: ["Python"],
  contact: {
    email: "hello@samgutentag.com",
    get mailto(): string {
      return `mailto:${this.email}?subject=Hello!`;
    },
    // tel: "+123456789",
    social: {
      Email: {
        url: `mailto:hello@samgutentag.com?subject=Hello!`,
        icon: Icons.email,
      },
      GitHub: {
        url: "https://github.com/samgutentag",
        icon: Icons.github,
      },
      LinkedIn: {
        url: "https://www.linkedin.com/in/samgutentag/",
        icon: Icons.linkedin,
      },
      X: {
        url: "https://x.com/samgutentag",
        icon: Icons.x,
      },
      Mastodon: {
        url: "https://mastodon.social/@samgutentag",
        icon: Icons.mastodon,
      },
      // Youtube: {
      //   url: "https://youtube.com/c/dillionverma",
      //   icon: Icons.youtube,
      // },
    },
  },
  work: [
    {
      company: "Audius",
      href: "https://audius.co",
      badges: [],
      location: "Remote",
      title: "Developer Relations Engineer",
      logoUrl: "/audius.png",
      start: "December 2023",
      end: "Present",
      description: "",
    },
    {
      company: "Helium Foundation",
      badges: [],
      href: "https://helium.foundation",
      location: "Remote",
      title: "Developer Relations Lead",
      logoUrl: "/helium-foundation.svg",
      start: "May 2022",
      end: "December 2023",
      description:
        "Collaborated with device manufacturers and developers, fostering a community-driven ecosystem and aligning internal engineering efforts with developer needs. Led documentation initiatives and facilitated knowledge sharing by addressing developer questions and gathering community insights. Provided support in Community Management and Data Analytics, contributing to the ecosystem’s broader success beyond technical aspects.",
    },
    {
      company: "Penumbra, Inc",
      href: "https://www.penumbrainc.com",
      badges: [],
      location: "Alameda, CA",
      title: "Developer Support Engineer,",
      logoUrl: "/penumbra.png",
      start: "September 2018",
      end: "August 2022",
      description:
        "Founded and led a developer relations team, improving onboarding, collaboration, and issue resolution while introducing a partner developer portal for better resources and SDK best practices. Engineered an optimized asset management pipeline for Unreal Engine and created tutorials for integrating in-house pipelines with third-party software workflows.",
    },
    {
      company: "Industrial Light & Magic",
      href: "https://www.ilm.com",
      badges: [],
      location: "San Francisco, CA",
      title: "Creature Technical Director,",
      logoUrl: "/ilm.png",
      start: "November 2014",
      end: "February 2018",
      description:
        "Tailored scripts for creature and animation projects to enhance workflow efficiency and crafted comprehensive documentation for proprietary and external software integration. Built custom solutions for individual workflow integrations on a show-by-show basis for animators and layout artists. Created versatile, reusable rigging setups for internal software, ensuring consistent and efficient rigging processes, and oversaw motion capture shoots and reference photography for various productions.",
    },
    {
      company: "Industrial Light & Magic",
      href: "https://www.ilm.com",
      badges: [],
      location: "San Francisco, CA",
      title: "Technical Resource Assistant",
      logoUrl: "/ilm.png",
      start: "September 2013",
      end: "November 2014",
      description:
        "Collaborated on developing monitoring and analysis tools to enable real-time tracking of rendering progress and proactive issue detection.",
    },
  ],
  education: [
    {
      school: "Springboard",
      href: "https://www.springboard.com",
      degree: "Data Science Fellow",
      logoUrl: "/springboard.png",
      start: "September 2017",
      end: "June 2018",
    },
    {
      school: "The Ohio State University",
      href: "https://osu.edu",
      degree: "B.A. Computer Information Systems",
      logoUrl: "/ohio-state.png",
      start: "August 2008",
      end: "May 2013",
    },
  ],
  projects: [
    {
      title: "Chat Collect",
      href: "https://chatcollect.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
        "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://chatcollect.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  // hackathons: [
  //   {
  //     title: "HackDavis",
  //     dates: "January 20th - 21st, 2018",
  //     location: "Davis, California",
  //     description:
  //       "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
  //     image:
  //       "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
  //     win: "Best Data Hack",
  //     mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
  //     links: [
  //       {
  //         title: "Devpost",
  //         icon: <Icons.globe className="h-4 w-4" />,
  //         href: "https://devpost.com/software/my6footprint",
  //       },
  //       {
  //         title: "ML",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/Wallet6/my6footprint-machine-learning",
  //       },
  //       {
  //         title: "iOS",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/Wallet6/CarbonWallet",
  //       },
  //       {
  //         title: "Server",
  //         icon: <Icons.github className="h-4 w-4" />,
  //         href: "https://github.com/Wallet6/wallet6-server",
  //       },
  //     ],
  //   },
  // ],
} as const;
