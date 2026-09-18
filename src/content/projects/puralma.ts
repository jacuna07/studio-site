import type { Project } from "./types";

const project: Project = {
  slug: "puralma",
  title: "Puralma",
  tagline: "An identity as bold as its food.",
  client: "Puralma",
  year: "2026",
  industry: "Food & Restaurants",
  featured: true,
  featuredOrder: 2,
  summary:
    "A rebrand for one of Costa Rica's best known vegan restaurants, built around the tagline: Revolutionary but kind.",
  brief:
    "A brand update for Barrio Escalante's staple vegan kitchen, made for a more mature chapter.",
  overview: [
    "Puralma opened in Barrio Escalante and let the kitchen speak first. No fuss, just food good enough to make it a regular stop in one of Costa Rica's most visited neighborhoods, celebrities passing through the country included.",
    "That kind of reach called for a brand that could hold it. We built the identity around \"Revolutionary but kind,\" the same conviction that built the kitchen's reputation in the first place, now given a face that matches where Puralma stands today.",
    "The result is a brand that reads as confidently as the food tastes: ready for a bigger stage, without losing the kindness that built it.",
  ],
  hero: { src: "/images/puralma/cover.jpg", alt: "Puralma. Cover image" },
  gallery: [
    {
      src: "/images/puralma/01-gallery.jpg",
      alt: "Puralma. A circular brand stamp with the flower mark, wordmark, and \"Brunch, Cake, Coffee, Fun.\"",
      aspect: "square",
    },
    {
      src: "/images/puralma/02-gallery.mp4",
      poster: "/images/puralma/02-gallery-poster.jpg",
      alt: "Puralma. The flower mark rotating in place.",
      aspect: "square",
      type: "video",
    },
    {
      src: "/images/puralma/03-gallery.jpg",
      alt: "Puralma. Brand posters: \"100% Plant Based\" and \"Kind but revolutionary.\"",
      aspect: "wide",
    },
    {
      src: "/images/puralma/04-gallery.jpg",
      alt: "Puralma. Branded paper cups stacked on a counter.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/05-gallery.jpg",
      alt: "Puralma. A tote bag reading \"Kind but revolutionary,\" carried over the shoulder.",
      aspect: "wide",
    },
    {
      src: "/images/puralma/06-gallery.jpg",
      alt: "Puralma. Takeout containers banded with the flower mark, repeated in a grid.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/07-gallery.jpg",
      alt: "Puralma. Wrapping paper in the brand's flower and wordmark pattern.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/08-gallery.jpg",
      alt: "Puralma. A textile in the brand's pattern, caught mid-fall.",
      aspect: "wide",
    },
    {
      src: "/images/puralma/09-gallery.jpg",
      alt: "Puralma. Exterior signage with the wordmark and flower mark.",
      aspect: "portrait",
    },
    {
      src: "/images/puralma/10-gallery.jpg",
      alt: "Puralma. A Run Club event poster beside a watermelon agua fresca.",
      aspect: "wide",
    },
    {
      src: "/images/puralma/11-gallery.jpg",
      alt: "Puralma. A taco on a blue corn tortilla, on a patterned napkin.",
      aspect: "wide",
    },
    {
      src: "/images/puralma/12-gallery.jpg",
      alt: "Puralma. The flower mark and tagline, \"With love, from the tropics.\"",
      aspect: "square",
    },
    {
      src: "/images/puralma/13-gallery.jpg",
      alt: "Puralma. A bottle cap opened to reveal \"Kind never tasted this good.\"",
      aspect: "square",
    },
    {
      src: "/images/puralma/14-gallery.jpg",
      alt: "Puralma. A before and after comparison: the previous logo beside the new flower mark and wordmark.",
      aspect: "wide",
    },
  ],
  theme: { bodyColor: "#F9B4ED" },
};

export default project;
