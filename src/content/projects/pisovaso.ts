import type { Project } from "./types";

const project: Project = {
  slug: "pisovaso",
  title: "PisoVaso",
  tagline: "Heritage you can set a glass on.",
  client: "PisoVaso",
  year: "2019",
  industry: "Home Goods",
  credits: [
    { role: "Concept & Ideation", name: "Pablo Zurdo" },
    { role: "Photography", name: "Geanina Mora" },
  ],
  summary:
    "Coasters that bring the hydraulic tile patterns of Costa Rica's antique places from the floor to the table.",
  brief:
    "Coasters inspired by the hydraulic tiles found in antique places across Costa Rica.",
  overview: [
    "PisoVaso starts on the floors of antique places across Costa Rica, where hydraulic tiles have been underfoot all along. Each coaster takes one of those patterns off the floor and puts it where it can finally be seen up close.",
    "The name says it: piso is floor, vaso is glass. The brand is built around that short trip, so the heritage feels like something you use every day, not something kept behind glass.",
  ],
  hero: {
    src: "/images/pisovaso/cover.jpg",
    alt: "PisoVaso. Cover image",
  },
  gallery: [
    {
      src: "/images/pisovaso/01-gallery.jpg",
      alt: "PisoVaso. The PV mark over the brand line: the artistry of history, curated for your tabletop.",
      aspect: "square",
    },
    {
      src: "/images/pisovaso/02-gallery.jpg",
      alt: "PisoVaso. A glass on a hydraulic tile coaster, next to one of the tile patterns in red.",
      aspect: "square",
    },
    {
      src: "/images/pisovaso/03-gallery.mp4",
      poster: "/images/pisovaso/03-gallery-poster.jpg",
      alt: "PisoVaso. A tile pattern built from the brand's shapes, then the coasters themselves.",
      aspect: "square",
      type: "video",
    },
    {
      src: "/images/pisovaso/04-gallery.jpg",
      alt: "PisoVaso. The brand at a glance: the coaster in use, the logo, the brand line, a tile pattern and the wordmark.",
      aspect: "wide",
    },
    {
      src: "/images/pisovaso/05-gallery.mp4",
      poster: "/images/pisovaso/05-gallery-poster.jpg",
      alt: "PisoVaso. Hydraulic tile patterns redrawn for the brand, in light blue and wine.",
      aspect: "square",
      type: "video",
    },
    {
      src: "/images/pisovaso/06-gallery.jpg",
      alt: "PisoVaso. The dieline for the coaster box, with the logo and a tile pattern on its panels.",
      aspect: "wide",
    },
    {
      src: "/images/pisovaso/07-gallery.mp4",
      poster: "/images/pisovaso/07-gallery-poster.jpg",
      alt: "PisoVaso. Two more tile patterns, in red and dark brown.",
      aspect: "square",
      type: "video",
    },
    {
      src: "/images/pisovaso/08-gallery.jpg",
      alt: "PisoVaso. A brand card and the insert that tells the story behind one tile, from the Costa Rican Film Center.",
      aspect: "wide",
    },
    {
      src: "/images/pisovaso/09-gallery.jpg",
      alt: "PisoVaso. A drink being poured into a glass that sits on a tile coaster.",
      aspect: "square",
    },
    {
      src: "/images/pisovaso/10-gallery.mp4",
      poster: "/images/pisovaso/10-gallery-poster.jpg",
      alt: "PisoVaso. The logo in its versions: the full lockup, the stacked lockup, the PV monogram and the symbol.",
      aspect: "square",
      type: "video",
    },
  ],
  theme: { bodyColor: "#F2361C" },
};

export default project;
