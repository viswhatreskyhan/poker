if (
  (MELE(1, 9) || false) &&
  network === "GG" &&
  color === "red" &&
  level === "7A" &&
  isKo &&
  (MELE(1, 7.5) || isOffpeak) &&
  network === "PS.eu" &&
  color === "red" &&
  level === "7A" &&
  isKo
)
  return true;
if (
  (MELE(109, 150000) || isOffpeak) &&
  network === "GG" &&
  color === "black" &&
  level === "7A" &&
  !isKo
)
  return true;
if (
  (MELEME(121, 150, 250000) || isOffpeak) &&
  network === "GG" &&
  color === "black" &&
  level === "8A" &&
  isKo
)
  return true;
