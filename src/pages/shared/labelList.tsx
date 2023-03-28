import React, { useState } from "react";
import { Label,  } from "./label";

interface Props {
  labels: string[];
}

export default function LabelList(props: Props) {
  const { labels } = props;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {labels.map((label, index) => (
        <Label title={label} index={index} />
      ))}
    </div>
  );
}
