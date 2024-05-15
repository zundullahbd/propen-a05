// 'use client'
// import React, { useState, useEffect } from "react";

// interface AnimatedTextProps {
//   languages: string[];
//   children: string;
// }

// const AnimatedText: React.FC<AnimatedTextProps> = ({ languages, children }) => {
//   const [text, setText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [loopNum, setLoopNum] = useState(0);
//   const [typingSpeed, setTypingSpeed] = useState(100);
//   const period = 2000;

//   useEffect(() => {
//     let ticker = setInterval(() => {
//       tick();
//     }, typingSpeed);

//     return () => {
//       clearInterval(ticker);
//     };
//   }, [text]);

//   const tick = () => {
//     let i = loopNum % languages.length;
//     let fullText = languages[i];
//     let updatedText = isDeleting
//       ? fullText.substring(0, text.length - 1)
//       : fullText.substring(0, text.length + 1);

//     setText(updatedText);

//     if (isDeleting) {
//       setTypingSpeed((prevTypingSpeed) => prevTypingSpeed / 2);
//     }

//     if (!isDeleting && updatedText === fullText) {
//       setIsDeleting(true);
//       setTypingSpeed(period);
//     } else if (isDeleting && updatedText === "") {
//       setIsDeleting(false);
//       setLoopNum(loopNum + 1);
//       setTypingSpeed(100);
//     }
//   };

//   return (
//     <div className="text-3xl xl:text-3xl text-indigo-800">
//       <strong>{text}</strong>
//       <span>{children}</span>
//     </div>
//   );
// };

// export default AnimatedText;

'use client'
import React, { useState, useEffect } from "react";

interface AnimatedTextProps {
  languages: string[];
  children: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ languages, children }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [cursor, setCursor] = useState("|");
  const period = 10;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, typingSpeed);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % languages.length;
    let fullText = languages[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setTypingSpeed((prevTypingSpeed) => prevTypingSpeed / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setTypingSpeed(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(200);
      setCursor("|");
    } else {
      setCursor(updatedText.length % 2 === 0 ? "|" : " ");
    }
  };

  return (
    <div className="text-4xl xl:text4xl text-indigo-800">
      <strong>{text}</strong>
      <span>{cursor}</span>
      <span>{children}</span>
    </div>
  );
};

export default AnimatedText;