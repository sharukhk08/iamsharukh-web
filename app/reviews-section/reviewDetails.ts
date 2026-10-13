import { StaticImageData } from "next/image";
import meltahawyImg from "../../public/clients/meltahawy.jpeg";
import maxguillaImg from "../../public/clients/maxguillabert.jpeg";
import martinGabinImg from "../../public/clients/martin_gabin.webp";
import calimeraImg from "../../public/clients/calimeraapparel.jpeg";
import saurshirImg from "../../public/clients/saurshir.jpg";
import felixImg from "../../public/clients/felixyo.webp";
import mohammadImg from "../../public/clients/MohammadAlamin.jpg";

export type reviewProps = {
  name: string;
  role: string;
  company: string;
  profileImg: StaticImageData;
  testimonial: string;
  index: number;
};

export const reviewDetails = [
  {
    name: "Mohamed El Tahawy",
    role: "CTO and Founder",
    company: "Blockframe",
    profileImg: meltahawyImg,
    testimonial:
      "The experience from start to finish with Sharukh Khan was exceptional, they delivered a clean code exceeding all expectations! We will definitely delegate some of our future projects to them.",
  },
  {
    name: "Maxguillabert",
    role: "Technical Lead",
    company: "Happer TV",
    profileImg: maxguillaImg,
    testimonial:
      "The code quality exceeded our expectations, the final result was spot-on, and the development turnaround was remarkably fast. We highly recommend Sharukh Khan for anyone needing top-notch front-end development, in our case primarily React. We will most definitely get more services from Sharukh Khan.",
  },
  {
    name: "Martin Gabin",
    role: "Product Manager",
    company: "Cerebragpt",
    profileImg: martinGabinImg,
    testimonial:
      "Sharukh Khan were always super kind and professional with the project. Super open to explain and think about new solutions over the developing ways. I 100% recommend them and look forward to repeating with them again soon.",
  },
  {
    name: "Calimeraapparel",
    role: "Engineering Director",
    company: "M3 Financial",
    profileImg: calimeraImg,
    testimonial:
      "Great communication, and delivered before the deadline. I'm a developer myself, and the code is of high quality. Really recommend them. 10/10",
  },
  {
    name: "Saurshir",
    role: "VP of Engineering",
    company: "Depth AI",
    profileImg: saurshirImg,
    testimonial:
      "The end result matched the design very well. The design was fairly complex. However, I would like to have fewer back and forths with better communication going forward. I am hoping to continue getting great quality delivery from this talented team.",
  },
  {
    name: "Felix",
    role: "Technical Architect",
    company: "Coursechest",
    profileImg: felixImg,
    testimonial:
      "Working with Sharukh Khan was an absolute pleasure! As a highly skilled and communicative developer, he ensured that all of my needs were met and exceeded my expectations. I am eager to work with him again in the future.",
  },
];
