"use client";
import { Home } from "@/components/Home";
import styles from "./page.module.css";
import { FormComp } from "@/components/FormComp";

export default function App() {
  return (
    <main className={styles.main}>
      <Home />
      <FormComp />
    </main>
  );
}
