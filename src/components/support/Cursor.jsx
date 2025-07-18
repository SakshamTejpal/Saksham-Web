import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [pos, setPos]             = useState({ x: 0, y: 0 });
  const [hoverLink, setHoverLink] = useState(false);
  const [hoverField, setHoverField] = useState(false);
  const [hoverImage, setHoverImage] = useState(false);
  const [hoverParagraph, setHoverParagraph] = useState(false);

  // 1. hide native cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  // 2. track mouse + context
  useEffect(() => {
    const handleMouseMove = e => {
      setPos({ x: e.clientX, y: e.clientY });
      setHoverLink(!!e.target.closest('a'));
      setHoverField(!!e.target.closest('input,textarea,select,[contenteditable]'));
      setHoverImage(!!e.target.closest('img'));
      setHoverParagraph(!!e.target.closest('p'));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. base container style
  const baseStyle = {
    position:      'fixed',
    top:           pos.y,
    left:          pos.x,
    pointerEvents: 'none',
    zIndex:        9999,
    transform:     'translate(-50%, -50%)',
    transition:    'width 150ms ease, height 150ms ease, background-color 150ms ease, transform 150ms ease',
    willChange:    'transform',
    display:       'flex',
    alignItems:    'center',
    justifyContent:'center',
  };

  let inner = null;
  let sizeStyle = {};

  if (hoverField) {
    // input/text caret
    sizeStyle = {
      width:           '2px',
      height:          '1em',
      backgroundColor: 'rgba(255,255,255,1)',
      mixBlendMode:    'normal',
      borderRadius:    '0',
    };
  } else if (hoverLink) {
    // big dot on links
    sizeStyle = {
      width:           '60px',
      height:          '60px',
      backgroundColor: 'rgba(0,0,0,0.5)',
      mixBlendMode:    'normal',
      borderRadius:    '50%',
    };
  } else if (hoverImage) {
    // normal dot on images
    sizeStyle = {
      width:           '15px',
      height:          '15px',
      backgroundColor: 'rgba(255,255,255,1)',
      mixBlendMode:    'normal',
      borderRadius:    '50%',
    };
  } else if (hoverParagraph) {
// ─── DEFAULT: teardrop pointer ───────────────────────────────────────
inner = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 223.14 319.008"
    style={{
      width:         '100%',
      height:        '100%',
      pointerEvents: 'none',
      // no fill here, we’ll do it per-path
    }}
  >
    <path
      d="M111.57,13.291c0,0,57.179,86.984,72.719,108.819
         c30.359,42.66,41.005,114.694,1.626,154.074c-20.464,20.463-47.533,30.293-74.344,29.488h-0.002
         c-26.811,0.805-53.88-9.025-74.344-29.488C-2.154,236.804,8.492,164.77,38.851,122.11C54.391,100.275,111.57,13.291,111.57,13.291z"
     // your semi-transparent white
      stroke="black"                  // outline color
      strokeWidth="10px"                 // outline thickness
      strokeLinejoin="round"  
          fill="rgba(255,255,255)"         // soften the corners a bit
    />
  </svg>
);
sizeStyle = {
  width:        '20px',
  height:       '20px',
  mixBlendMode: 'normal',
  transform:    'translate(-50%, -50%) rotate(-30deg)',
};

  } else {
    sizeStyle = {
      width:           '15px',
      height:          '15px',
      backgroundColor: 'rgb(255, 255, 255)',
      mixBlendMode:    'difference',
      borderRadius:    '50%',
    };
  }
  return (
    <div style={{ ...baseStyle, ...sizeStyle }}>
      {inner}
    </div>
  );
}