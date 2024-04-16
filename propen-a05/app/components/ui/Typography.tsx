import React from 'react'

import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

// function Typography(props: { type: string; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined }) {
//   return (
//     <div className="font-bold" className="font-medium" className="font-semibold" className="italic" className={props.type == "h1" ? "text-6xl" : props.type == "h2" ? "text-5xl" : props.type == "h3" ? "text-4xl" : props.type == "h4" ? "text-2xl" : props.type == "h5" ? "text-xl" : props.type == "body" ? "text-base" : props.type == "caption" ? "text-sm" : props.type == "small" ? "text-xs" : ""}>{props.text}</div>
//   )
// }

// export default Typography

const Typography = (props: { type: string; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
  const textSize = props.type === "h1" ? "text-6xl" :
                   props.type === "h2" ? "text-5xl" :
                   props.type === "h3" ? "text-4xl" :
                   props.type === "h4" ? "text-2xl" :
                   props.type === "h5" ? "text-xl" :
                   props.type === "body" ? "text-base" :
                   props.type === "caption" ? "text-sm" :
                   props.type === "small" ? "text-xs" : "";

  const classes = `font-semibold italic ${textSize}`;

  return <div className={classes}>{props.text}</div>;
};

export default Typography;