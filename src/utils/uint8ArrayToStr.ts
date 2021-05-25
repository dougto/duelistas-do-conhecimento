export const uint8ArrayToStr = (unit: Uint8Array, length = 16) => {
  const numberSequence = `n${unit.toLocaleString().replace(/,/g, '')}`.slice(
    0,
    length,
  );

  return numberSequence;
};
