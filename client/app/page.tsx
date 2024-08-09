"use client";
import { Home } from "@/components/Home";
import styles from "./page.module.css";
import { FormComp } from "@/components/FormComp";
import { NavComp } from "@/components/Nav";

export default function App() {
  return (
    <main className={styles.main}>
      <NavComp />
      <Home />
      <FormComp />
    </main>
  );
}
