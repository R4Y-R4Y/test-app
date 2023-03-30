import * as z from 'zod'
export interface Output {
  document: string
  annotations: Annotation[] 
}

export const requestSchema = z.object({
  searchString: z.string(),
  annotations: z.array(z.object({
    start: z.number(),
    end: z.number(),
    label: z.string().nullable(),
    text: z.string()
  })),
  selectedLabel: z.string().nullable()
})



export const outputSchema = z.object({
  document: z.string()
})

export interface Annotation {
  start: number
  end: number
  label: string | null
  text: string
}