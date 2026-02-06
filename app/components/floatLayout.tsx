"use client";

type FloatingActionsProps = {
  facebookUrl: string;
  instagramUrl: string;
};

export default function FloatingActions(
  props: FloatingActionsProps
) {
  const { facebookUrl, instagramUrl } = props;

  return (
    <div>
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>

      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
    </div>
  );
}
