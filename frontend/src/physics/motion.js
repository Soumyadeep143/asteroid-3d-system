export function getPosition(a, e, t, mode = "normal") {
  let theta = t;
  const scale = 5;
  const scaledA = a * scale;

  let r;
  let y = 0;

  if (mode === "distort") {
    const dynamicE = e + Math.sin(t) * 0.2;
    r = (scaledA * (1 - dynamicE * dynamicE)) / (1 + dynamicE * Math.cos(theta));
  } else if (mode === "reverse") {
    r = (scaledA * (1 - e * e)) / (1 - e * Math.cos(theta));
  } else if (mode === "lift") {
    r = (scaledA * (1 - e * e)) / (1 + e * Math.cos(theta));
    y = Math.sin(t * 2) * 5;
  } else {
    r = (scaledA * (1 - e * e)) / (1 + e * Math.cos(theta));
  }

  return [
    r * Math.cos(theta),
    y,
    r * Math.sin(theta)
  ];
}
