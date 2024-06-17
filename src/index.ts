import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PdfService } from "./pdf-service";
import { getCsvData } from "./utils/get-csv";
import { findDifferences } from "./utils/findDifferences";
import multer from 'multer'

const upload = multer({ dest: 'assets/' })

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const pdfService = new PdfService("TEST_KEY");

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/", async (req, res) => {
  /**
   *  Extract the file
   *  const { file } = req
   *  const parsedData = await pdfService.extract(file);
   */

  try {
    const parsedData = await pdfService.extract("assets/retailco.pdf");
    const companyName = (parsedData['Company Name'] ? parsedData['Company Name'] : "") as string;
    const storedData = await getCsvData(companyName.toLocaleLowerCase());
    const nonMatchingFields = findDifferences(parsedData, storedData)
    res.send(nonMatchingFields);
  } catch (error) {
    res.send(error)
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
