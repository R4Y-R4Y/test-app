import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import LabelList from './shared/labelList'
import { useState } from 'react'
import { Annotation, LabelResult, Output } from './shared/labelResult'



export default function Home() {
  const [labels, setLabels] = useState<string[]>([])
  const [inputLabel, setInputLabel] = useState("")
  const [confirmDocument, setConfirmDocument] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [activeLabel, setActiveLabel] = useState(-1)
  const [output, setOutput] = useState<Output>({document:"",annotations:[]})
  return (
    <>
      <Head>
        <title>Annotation App</title>
        <meta name="description" content="App for annotating text documents and exporting the annotations info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h2>Add new labels here:</h2>
            <input onChange={e => setInputLabel(e.target.value)} />
            <button 
              style={{marginLeft:"10px"}}
              onClick={() => {
                const newLabels = [...labels, inputLabel];
                if(labels.includes(inputLabel)){
                  alert("There's already a label with that name")
                }
                else{
                  setLabels(newLabels);
                }
              }} 
            >Add Label</button>
            {confirmDocument && <h3>Select the annotation that you want to use and then select the desired text to annotate:</h3>}
            <LabelList labels={labels} setActiveLabel={setActiveLabel}/>
            {activeLabel>=0 && <h3>Active label: {labels[activeLabel]}</h3>}
          </div>
          <div className={styles.section}>
            <h2>Insert your document text here:</h2>
            <textarea
              id='document'
              onSelect={e => {
                const selection = window.getSelection() as Selection
                const text = selection.toString().toUpperCase()
                setSelectedText(text)
                
              }}
              readOnly={confirmDocument}
              value={output.document}
              rows={20}
              cols={60}
              onChange={e => {
                const res: Output = {document: e.target.value, annotations:[]}
                setOutput(res)
              }}
            />
            { selectedText 
              && 
              <h3>Selected Text: {selectedText}</h3>
            }
            <button style={{marginLeft:"10px", marginTop:"10px"}}
              disabled={confirmDocument}
              onClick={() => {
                setOutput({document:output.document,annotations:[{start: 0, end: output.document.length-1, text: output.document, label: null}]})
                setConfirmDocument(true)
              }}
            >Confirm Document</button>
            <button style={{marginLeft:"10px", marginTop:"10px"}}
              onClick={() => {
                setOutput({document: output.document, annotations:[]})
                setConfirmDocument(false)
              }}
            >Clear Annotation</button>
          </div>
          
          { 
            confirmDocument 
            && 
            <div className={styles.section}>
              <h1>Annotated document</h1>
              <LabelResult searchString={selectedText} output={output} selectedLabel={labels[activeLabel]} setOutput={setOutput} />
              <button onClick={() => exportData(output)} >Export Annotation to JSON</button>
            </div>
          }
        </div>
      </main>
    </>
  )
}

function exportData (input: Output){
  let annotations: Annotation[] = input.annotations.filter((a) => a.label != null) 
  let data: Output = {document: input.document, annotations}
  const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
    JSON.stringify(data)
  )}`;
  const link = document.createElement("a");
  link.href = jsonString;
  link.download = "data.json";

  link.click();
};
