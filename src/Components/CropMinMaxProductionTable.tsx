import React, { useState, useEffect } from "react";
import { Table, Container, Title } from "@mantine/core";
import data from '../Dataset'
import "@mantine/core/styles.css";

interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

interface ResultData {
  year: string;
  minCrop: string;
  maxCrop: string;
}

const CropMinMaxProductionTable: React.FC = () => {
  const [result, setResult] = useState<ResultData[]>([]);

  const processData = (data: CropData[]): ResultData[] => {
    const filteredData = data.filter(
      (item) => item["Crop Production (UOM:t(Tonnes))"] !== ""
    );

    const groupedData: { [year: string]: CropData[] } = {};

    filteredData.forEach((item) => {
      const year = item.Year;
      if (!groupedData[year]) {
        groupedData[year] = [];
      }
      groupedData[year].push(item);
    });

    const resultData: ResultData[] = Object.keys(groupedData).map((year) => {
      const crops = groupedData[year];
      const minProductionCrop = crops.reduce(
        (min, crop) =>
          crop["Crop Production (UOM:t(Tonnes))"] <
          min["Crop Production (UOM:t(Tonnes))"]
            ? crop
            : min,
        crops[0]
      );
      const maxProductionCrop = crops.reduce(
        (max, crop) =>
          crop["Crop Production (UOM:t(Tonnes))"] >
          max["Crop Production (UOM:t(Tonnes))"]
            ? crop
            : max,
        crops[0]
      );
      return {
        year,
        minCrop: minProductionCrop["Crop Name"],
        maxCrop: maxProductionCrop["Crop Name"],
      };
    });

    return resultData;
  };

  useEffect(() => {
    setResult(processData(data));
  }, []);

  return (
    <Container>
    <Title order={1} style={{ margin: "20px" }}>
      Crop Production Table
    </Title>
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Minimum Production</Table.Th>
          <Table.Th>Crop with Maximum Production</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {result.map((item, index) => (
          <Table.Tr key={index}>
            <Table.Td>{item.year}</Table.Td>
            <Table.Td>{item.minCrop}</Table.Td>
            <Table.Td>{item.maxCrop}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  </Container>
  );
};

export default CropMinMaxProductionTable;
