export type ProjectProps = {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  available: boolean;
};

export const devProjects = [
  {
    id: 0,
    name: "BlockFrame",
    description:
      "A Web3 NFT marketplace platform that enables users to mint, buy, sell, and trade digital collectibles. Features include wallet integration, real-time pricing, and a seamless trading experience.",
    technologies: ["NextJs", "Tailwind CSS", "NodeJs"],
    github: "",
    demo: "",
    image: require("./../../public/projects/blockframe.png"),
    available: true,
  },
  {
    id: 1,
    name: "Rapid Rilief",
    description:
      "A collection of high-converting landing pages designed for different product launches and marketing campaigns. Each page features optimized user flows and clear call-to-actions to maximize conversion rates.",
    technologies: ["NextJs", "Tailwind CSS", "Framer Motion"],
    github: " ",
    demo: " ",
    image: require(".//../../public/projects/rapido1.png"),
    available: true,
  },
  {
    id: 2,
    name: "Wärmemacher",
    description:
      "An e-commerce platform specializing in AC products, featuring detailed product listings, comparison tools, and a streamlined checkout process. Includes real-time inventory management and customer support integration.",
    technologies: ["NextJs", "Tailwind CSS", "STRIPE", "STRAPI"],
    github: "",
    demo: " ",
    image: require(".//../../public/projects/warmem.png"),
    available: true,
  },
  {
    id: 3,
    name: "HAPPER.TV",
    description:
      "A social media platform connecting content creators with their fans through exclusive content, live streaming, and community features. Includes monetization tools and analytics for creators.",
    technologies: ["React", "NestJs", "MongoDB"],
    github: " ",
    demo: " ",
    image: require(".//../../public/projects/Discover.png"),
    available: true,
  },
];
export const designProjects = [
  {
    id: 1,
    name: "Hebron Statup Lab Website",
    description:
      "SkyWatch is a convenient and user-friendly tool that allows you to quickly and easily check the current.",
    technologies: ["UX Research", "UI Design", "Prototyping"],
    github: "",
    demo: "",
    image: "/_next/image?url=%2F..%2Fpublic%2Fprojects%2Fhsl.webp&w=1920&q=75",
    available: false,
  },
  {
    id: 2,
    name: "RAGS Scrubs Website",
    description:
      "An image generator website that allows users to generate, combine, and download images.",
    technologies: ["UX Research", "UI Design", "Prototyping"],
    github: "",
    demo: "",
    image: "/_next/image?url=%2F..%2Fpublic%2Fprojects%2Frags.webp&w=1920&q=75",
    available: false,
  },
  {
    id: 3,
    name: "Crown Branding Agency Website",
    description:
      "A website that reduces the length of your URL using Bit.ly's API",
    technologies: ["UX Research", "UI Design", "Prototyping"],
    github: "",
    demo: "",
    image:
      "/_next/image?url=%2F..%2Fpublic%2Fprojects%2Fcrown.webp&w=1920&q=75",
    available: false,
  },
  {
    id: 4,
    name: "Titi Mobile App",
    description:
      "TMTM helps you find people who are headed to the same location as you, so you can share a ride and split the cost with them.",
    technologies: ["UX Research", "UI Design", "Prototyping"],
    github: "",
    demo: "",
    image: "/_next/image?url=%2F..%2Fpublic%2Fprojects%2Ftiti.webp&w=1920&q=75",
    available: false,
  },
];
