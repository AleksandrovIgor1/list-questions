import type { FC, SVGProps, LazyExoticComponent } from "react";
import { lazy } from "react";

export type SvgIcon = FC<SVGProps<SVGSVGElement>>;

const modules = import.meta.glob("./*.svg", {
  query: "?react",
  import: "default",
});

function createIcons() {
  const entries = Object.entries(modules).map(([path, loader]) => {
    const name = path.split("/").pop()!.replace(".svg", "");

    const Component = lazy(() =>
      loader().then((mod) => ({ default: mod as SvgIcon })),
    );

    return [name, Component];
  });

  return Object.fromEntries(entries);
}

export const icons = createIcons();

export type IconName = keyof typeof icons;

export type LazyIcon = LazyExoticComponent<SvgIcon>;
