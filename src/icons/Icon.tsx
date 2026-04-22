import { Suspense } from "react";
import type { SVGProps } from "react";
import { icons, type IconName } from "./index";

type IconProps = SVGProps<SVGSVGElement> & {
    name: IconName;
    height?: number | string;
    width?: number | string;
};

export const Icon = ({ name, ...props }: IconProps) => {
    const Component = icons[name];

    if (!Component) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return (
        <Suspense fallback={null}>
            <Component  {...props} style={{ flexShrink: 0 }} />
        </Suspense>
    );
};