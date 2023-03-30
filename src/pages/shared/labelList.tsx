import React, { Dispatch, SetStateAction } from "react";
import { Label,  } from "./label";

interface Props {
  labels: string[]
  setActiveLabel: Dispatch<SetStateAction<number>>
}

export default function LabelList(props: Props) {
  const { labels, setActiveLabel } = props;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {labels.map((label, index) => (
        <Label title={label} key={index} index={index} setActiveLabel={setActiveLabel} />
      ))}
    </div>
  );
}
