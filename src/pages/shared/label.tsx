import React, { useState } from "react";
import uniqolor from "uniqolor";

const num = (Math.random()*1000000).toString()

export interface LabelProps {
  title: string;
  index: number;
}

export interface LabelTextProps {
  title: string;
  text: string;
  index: number;
}

export function Label(props: LabelProps) {
  const { title } = props;

  return (
    <div style={{
      margin:"10px"
    }}>
      <a>
        <div
          style={{
            backgroundColor: uniqolor(title + num).color,
            borderRadius: "5px",
            padding: "5px",
            paddingRight: "25px",
            textTransform: "uppercase",
            display: "inline-block",
            color: "black",
          }}
        >
          {title}
        </div>
      </a>
    </div>
  );
}

export function LabelText(props: LabelTextProps) {
  const { title, text } = props;


  return (
    <div style={{
      margin:"10px"
    }}>
      <a>
        <div
          style={{
            flex:1,
            backgroundColor: uniqolor(title + num).color,
            borderRadius: "5px",
            padding: "5px",
            textTransform: "capitalize",
            display: "inline-block",
            color: "black",
          }}
        >
          {text}
          <div
            style={{
              alignSelf:"flex-end",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "5px",
              marginLeft:'10px',
              marginRight:'10px',
              paddingRight: "10px",
              textTransform: "uppercase",
              display: "inline-block",
              color: "black",
            }}
          >
            {title}
          </div>
        </div>
      </a>
    </div>
  );
}
