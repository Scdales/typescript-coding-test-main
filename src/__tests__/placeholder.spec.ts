import { expect, describe, it } from 'vitest'
import { getCsvData } from "../utils/get-csv";
import { findDifferences } from "../utils/findDifferences";
import {PdfService} from "../pdf-service";

const pdfService = new PdfService("TEST_KEY");

const mockFiles = [
  "assets/healthinc.pdf",
  "assets/retailco.pdf",
  "assets/financellc.pdf"
]

describe('Test suite', () => {
  it('should be uppercase FOO', () => {
    expect('foo'.toUpperCase()).toEqual('FOO')
  })
  mockFiles.forEach((mockFile) => {
    it(`should return mismatches for unexpected values for ${mockFile}`, async () => {
      const parsedData = await pdfService.extract(mockFile);
      const companyName = (parsedData['Company Name'] ? parsedData['Company Name'] : "") as string;
      const storedData = await getCsvData(companyName.toLocaleLowerCase() as string);
      const nonMatchingFields = findDifferences(parsedData, storedData)
      console.log(nonMatchingFields);
      expect(nonMatchingFields).toBeTruthy()
    })
  })
})
