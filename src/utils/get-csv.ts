import fs from 'fs';
import type {CompanyPDFData} from "../pdf-service";

export const getCsvData = async (companyName: string): Promise<CompanyPDFData> => {
  return new Promise((resolve, reject) => {
    fs.readFile('data/database.csv', (err, data) => {
      if (err) {
        reject('Error reading database.csv');
      }

      const stringifiedData = data.toString('utf-8')
      const [headers, ...rows] = stringifiedData
        .split('\n')
        .filter((row) => row.length)
        .map((row) => row.split(','));

      const companyRow = rows.find((company) => company[0].toLocaleLowerCase() === companyName.toLocaleLowerCase())

      if (!companyRow) {
        return reject('Company name not found')
      }

      const company = companyRow.reduce((acc, curr, index) => {
        return {...acc, [headers[index]]: +curr ? +curr : curr}
      }, {});

      resolve(company as CompanyPDFData);
    })
  })
};
