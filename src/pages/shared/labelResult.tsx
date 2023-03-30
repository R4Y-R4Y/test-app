import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LabelText } from "./label";
import { Annotation, Output } from "@/types/labelsData";


interface LabelResultProps {
  searchString: string
  output: Output
  setOutput: Dispatch<SetStateAction<Output>>
  selectedLabel: string
}


export function LabelResult(props: LabelResultProps) {
  const { searchString, output, selectedLabel, setOutput } = props;
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (searchString && selectedLabel) {
      setLoading(true)
      fetch('/api/result',{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchString,
          annotations: output.annotations,
          selectedLabel
        })
      })
      .then((res) => {
        if(res.ok)
        {
          return res.json();         
        }
        throw new Error();})
      .then((result: Annotation[]) => {
        setOutput({...output, annotations: result})
      })
      .catch(e =>{
        setOutput(output)
      })
      .finally(
        ()=>setLoading(false)
      )
      
    }
  }, [searchString]);

  if(loading){
    return(<h3>Loading</h3>)
  }
  else{
    return (
      <div style={{lineHeight:"35px"}} >
        {output.annotations.map((part, index) => {
          if (part.label != null) {
            return(<LabelText
              title={part.label}
              key={index}
              text={part.text}
            />)
          } else {
            return <span key={index}>{part.text}</span>
          }
        })}
      </div>
    );
  }
}
