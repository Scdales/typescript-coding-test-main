import { CompanyPDFData } from "../pdf-service";

type Differences = [string, string | number, string | number][]

export const findDifferences = (parsedData: CompanyPDFData, storedData: CompanyPDFData): Differences => {
  let differences: Differences = [['Key', 'ParsedFromPDF', 'FromDatabase']]
  Object.keys(parsedData).forEach((key) => {
    const dataKey = key as keyof CompanyPDFData
    if (parsedData[dataKey]?.toString() !== storedData[dataKey]?.toString()) {
      differences.push([dataKey, parsedData[dataKey], storedData[dataKey]])
    }
  })
  return differences
}
