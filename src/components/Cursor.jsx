import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hoverLink, setHoverLink] = useState(false);
  const [hoverField, setHoverField] = useState(false);
  const [hoverImage, setHoverImage] = useState(false);
  const [hoverParagraph, setHoverParagraph] = useState(false);

  // hide native cursor everywhere
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  // track mouse position & context
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

  // base styles
  let style = {
    position:      'fixed',
    top:           pos.y,
    left:          pos.x,
    pointerEvents: 'none',
    zIndex:        9999,
    transition:    'width 200ms ease, height 200ms ease, background-color 200ms ease, transform 200ms ease',
    transform:     'translate(-50%, -50%)',
  };

  if (hoverField) {
    // text‐input caret
    Object.assign(style, {
      width:           '2px',
      height:          '20px',
      backgroundColor: 'rgba(255, 255, 255)',
      mixBlendMode:    'normal',
      borderRadius:    '0',
    });
  } else if (hoverLink) {
    // big dot on links
    Object.assign(style, {
      width:           '60px',
      height:          '60px',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      mixBlendMode:    'normal',
      borderRadius:    '50%',
    });
  } else if (hoverImage) {
    // normal dot on images (no inversion)
    Object.assign(style, {
      width:           '15px',
      height:          '15px',
      backgroundColor: 'rgb(255, 255, 255)',
      mixBlendMode:    'normal',
      borderRadius:    '50%',
    });
  } else if (hoverParagraph) {
  Object.assign(style, {
    width:            0,       // caret is made with borders, so zero box size
    height:           0,
    borderLeft:       '8px solid transparent',
    borderRight:      '8px solid transparent',
    borderBottom:     '12px solid rgba(255,255,255,0.8)', // caret color
    transform:        'translate(-50%, 4px)', 
    transition:       'transform 200ms ease',  // you probably don’t want it morphing size
  });
  } else {
    // default inverted dot
    Object.assign(style, {
      width:           '15px',
      height:          '15px',
      backgroundColor: 'rgb(255, 255, 255,0.8)',
      mixBlendMode:    'difference',
      borderRadius:    '50%',
    });
  }

  return <div style={style} />;
}
