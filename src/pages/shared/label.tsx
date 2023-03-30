import React, { Dispatch, SetStateAction } from "react";
import uniqolor from "uniqolor";
import styles from "../../styles/Label.module.css"
const num = (Math.random()*1000000).toString()

export interface LabelProps {
  title: string
  key: number
  index: number
  setActiveLabel: Dispatch<SetStateAction<number>>
}

export interface LabelTextProps {
  title: string;
  text: string;
}



export function Label(props: LabelProps) {
  const { title, setActiveLabel, index } = props;
  return (
    <div className={styles.selection} >
      <div
        onClick={() => {
          setActiveLabel(index)
        }}
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
    </div>
  );
}

export function LabelText(props: LabelTextProps) {
  const { title, text } = props;


  return (
    <span style={{
      margin:"3px"
    }}>
      <span
        style={{
          backgroundColor: uniqolor(title + num).color,
          borderRadius: "5px",
          padding: "6px",
          textTransform: "capitalize",
          color: "black",
        }}
      >
        {text}
        <span
          style={{
            backgroundColor: "white",
            borderRadius: "5px",
            padding: "2px",
            margin:"10px",
            paddingRight: "10px",
            textTransform: "uppercase",
            color: "black",
          }}
        >
          {title}
        </span>
      </span>
    </span>
  );
}
