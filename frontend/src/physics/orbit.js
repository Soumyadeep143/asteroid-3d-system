export function generateOrbit(a, e, points = 128) {
  let orbit = [];
  // Scale down 'a' for visualization if necessary
  const scale = 5; 
  const scaledA = a * scale;

  for (let i = 0; i <= points; i++) {
    let theta = (i / points) * Math.PI * 2;
    let r = (scaledA * (1 - e * e)) / (1 + e * Math.cos(theta));

    let x = r * Math.cos(theta);
    let z = r * Math.sin(theta);

    orbit.push([x, 0, z]);
  }

  return orbit;
}
