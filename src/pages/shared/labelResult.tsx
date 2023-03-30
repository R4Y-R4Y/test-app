import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";
import { LabelText } from "./label";

export interface Output {
  document: string
  annotations: Annotation[] 
}

export interface Annotation {
  start: number
  end: number
  label: string | null
  text: string
}


interface LabelResultProps {
  searchString: string
  output: Output
  setOutput: Dispatch<SetStateAction<Output>>
  selectedLabel: string
}


export function LabelResult(props: LabelResultProps) {
  const { searchString, output, selectedLabel, setOutput } = props;
  useEffect(() => {
    if (searchString && selectedLabel) {
      const result: Annotation[] = createAnnotations(searchString ,output.annotations, selectedLabel)
      setOutput({...output, annotations: result})
    }
  }, [searchString]);

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


function getIndicesOf(searchStr: string, str: string) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
      return [];
  }
  var startIndex = 0, index, indices = [];
  str = str.toLowerCase();
  searchStr = searchStr.toLowerCase();
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
  }
  return indices;
}

/**
 * Creates a list of annotations based on a search string and a list of annotations.
 * @param searchStr The search string to look for.
 * @param annotations The list of annotations to search through.
 * @param label Optional label to assign to the new annotations.
 * @returns A list of new annotations.
 */
function createAnnotations(searchStr: string, annotations: Annotation[], label: string | null = null): Annotation[] {
  const result: Annotation[] = [];
  let offset = 0;
  // Iterate through each annotation
  annotations.forEach((annotation) => {
    const str = annotation.text;
    const indices = getIndicesOf(searchStr, str);
    let previousEnd = 0;
    // Iterate through each index of the search string
    for (let i = 0; i < indices.length; i++) {
      const start = offset + indices[i];
      const end = offset + indices[i] + searchStr.length;
      const text = str.slice(indices[i], indices[i] + searchStr.length);
      // Create the new annotation
      const newAnnotation: Annotation = {
        start,
        end: end - 1,
        label,
        text,
      };
      // If there is non-annotated text between the previous annotation and the new one
      if (previousEnd < start) {
        const nonLabelledAnnotation: Annotation = {
          start: offset + previousEnd,
          end: offset + start - 1,
          label: annotation.label,
          text: str.slice(previousEnd, indices[i]),
        };
        result.push(nonLabelledAnnotation);
      }
      result.push(newAnnotation);
      previousEnd = end - offset;
    }
    // If there is non-annotated text after the last annotation
    if (previousEnd < str.length) {
      const nonLabelledAnnotation: Annotation = {
        start: offset + previousEnd,
        end: offset + str.length - 1,
        label: annotation.label,
        text: str.slice(previousEnd, str.length),
      };
      result.push(nonLabelledAnnotation);
    }
    offset += str.length;
  });
  result.sort((a, b) => a.start - b.start);
  console.log(result)
  return result;
}
