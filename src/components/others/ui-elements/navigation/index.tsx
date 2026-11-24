"use client";
import { useState } from "react";
import NavigationControls from "./navigation-controls";
import ShellPreviews from "./shell-previews";
export default function NavigationExamples() {
  const [page, setPage] = useState(1);
  return (
    <section className="em-grid em-example-grid">
      <NavigationControls page={page} onPageChange={setPage} />
      <ShellPreviews />
    </section>
  );
}
