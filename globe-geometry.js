/* Reconstruct the sketched loops as plane/sphere intersections.
   All coordinates share the globe's centre; no independently offset rings. */
globalThis.GlobeGeometry = (() => {
  const sphereRadius = 185;
  const verticalScale = 191 / 185;
  const sharedTilt = 0.5;
  function ringPoint(r, angle) {
    const tilt = sharedTilt;
    const depth = Math.sqrt(1 - tilt * tilt);
    const offset = Math.sqrt(sphereRadius * sphereRadius - r.rx * r.rx);
    const pole = r.y < 240 ? 1 : -1;
    return [r.rx * Math.sin(angle),
      -pole * depth * offset + r.rx * tilt * Math.cos(angle),
      pole * tilt * offset + r.rx * depth * Math.cos(angle)];
  }
  function orbitPoint(r, angle) {
    const tilt = sharedTilt;
    const depth = Math.sqrt(1 - tilt * tilt);
    const centerY = (r.y - 240) / verticalScale;
    // Put the orbit centre on its plane normal so every point remains
    // the same distance from the globe centre, throughout rotation.
    return [r.rx * Math.sin(angle), centerY + r.rx * tilt * Math.cos(angle),
      -centerY * tilt / depth + r.rx * depth * Math.cos(angle)];
  }
  return {sphereRadius, verticalScale, ringPoint, orbitPoint};
})();


