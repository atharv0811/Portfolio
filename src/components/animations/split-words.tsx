import { Fragment } from "react";

export type TextSegment = { text: string; className?: string };

/**
 * Wraps each word in a clipping mask so GSAP can slide words up into view.
 * The words stay as real text in the DOM, so screen readers and search engines read the heading normally.
 */
export function SplitWords({ segments }: { segments: TextSegment[] }) {
  const words = segments.flatMap((segment) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  );

  return words.map(({ word, className }, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="word-mask">
        <span data-word className={className}>
          {word}
        </span>
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
