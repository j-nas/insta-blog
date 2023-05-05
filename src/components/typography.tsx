import { cn } from "@/lib/utils";
import * as React from "react";
import Link, { type LinkProps } from "next/link";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type AProps = Props & LinkProps;

const A = ({ children, className, ...props }: AProps) => {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex font-medium underline underline-offset-4",
        className
      )}
    >
      {children}
    </Link>
  );
};

A.displayName = "TypographyA";

const P = ({ children, className }: Props) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
};
P.displayName = "TypographyP";

const H1 = ({ children, className }: Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
};
H1.displayName = "TypographyH1";

const H2 = ({ children, className }: Props) => {
  return (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b  pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ",
        className
      )}
    >
      {children}
    </h2>
  );
};
H2.displayName = "TypographyH2";

const H3 = ({ children, className }: Props) => {
  return (
    <h3
      className={cn(
        "mt-10 scroll-m-20 border-b  pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0 ",
        className
      )}
    >
      {children}
    </h3>
  );
};
H3.displayName = "TypographyH3";

const H4 = ({ children, className }: Props) => {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
};

H4.displayName = "TypographyH4";

const List = ({
  children,
  className,
}: React.HTMLAttributes<HTMLUListElement>) => {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
};

List.displayName = "TypographyList";

const Lead = ({ children, className }: Props) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
};
Lead.displayName = "TypographyLead";

const Large = ({ children, className }: Props) => {
  return (
    <div className={cn("text-lg font-semibold ", className)}>{children}</div>
  );
};
Large.displayName = "TypographyLarge";

const Subtle = ({ children, className }: Props) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};
Subtle.displayName = "TypographySubtle";

const Small = ({ children, className }: Props) => {
  return (
    <p className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </p>
  );
};
Small.displayName = "TypographySmall";

const Blockquote = ({ children, className }: Props) => {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
};
Blockquote.displayName = "TypographyBlockquote";

export { A, H1, H2, H3, H4, Lead, Large, P, Subtle, Small, List, Blockquote };
