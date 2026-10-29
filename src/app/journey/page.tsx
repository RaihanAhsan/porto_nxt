import type { Metadata } from "next";
import JourneyClient from "@/components/JourneyClient";

export const metadata: Metadata = {
  title: "Journey — Pendidikan, Magang & Pengalaman | Raihan Ahsan",
  description:
    "Perjalanan pendidikan, pengalaman magang (internship), dan proyek rekayasa perangkat lunak yang dikerjakan oleh Raihan Ahsan.",
};

export default function JourneyPage() {
  return <JourneyClient />;
}
