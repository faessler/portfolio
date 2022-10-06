type Props = {
  alt: string;
  src: string;
  srcX2?: string;
  srcX3?: string;
  srcX4?: string;
};

const Image = ({ alt, src, srcX2, srcX3, srcX4 }: Props) => {
  const srcSet = [
    ...(srcX2 ? [`${srcX2} 2x`] : []),
    ...(srcX3 ? [`${srcX3} 3x`] : []),
    ...(srcX4 ? [`${srcX4} 4x`] : []),
  ];
  return (
    <img
      alt={alt}
      {...(srcSet.length && { srcSet: srcSet.join(", ") })}
      src={src}
    />
  );
};

export default Image;
