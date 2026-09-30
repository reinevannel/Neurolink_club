import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppShell } from "@/components/club/app-shell";
import { RouterView } from "@/shims/router";
import "@/routes/about";
import "@/routes/focus";
import "@/routes/garden";
import "@/routes/index";
import "@/routes/kaleidoscope";
import "@/routes/people";
import "@/routes/people.$personId";
import "@/routes/profile";
import "@/routes/resources";
import "@/routes/resources.$id";
import "@/routes/rooms.index";
import "@/routes/rooms.$roomId";
import "@/styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("Racine introuvable");

createRoot(root).render(
  <StrictMode>
    <RouterView>{(page) => <AppShell>{page}</AppShell>}</RouterView>
  </StrictMode>,
);
