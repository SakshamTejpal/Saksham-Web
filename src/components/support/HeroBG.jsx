// src/components/HeroBg.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

export default function HeroBg({ opacity = 1 }) {
  const ref = useRef(null);
  const effect = useRef(null);

  useEffect(() => {
    if (!effect.current) {
      effect.current = CLOUDS({
        THREE,
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        skyColor: 0x1f1f1f,
        cloudColor: 0xffffff,
        cloudShadowColor: 0x555555,
        opacity,
      });
    }
    // update opacity dynamically
    effect.current.setOptions({ opacity });

    return () => {
      effect.current.destroy();
      effect.current = null;
    };
  }, [opacity]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
