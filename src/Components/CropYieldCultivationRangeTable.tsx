import React, { useState, useEffect} from "react";
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

interface AverageData {
  crop: string;
  averageArea: string;
  averageYield: string;
}

const CropYieldCultivationRangeTable: React.FC = () => {
  const [averageResult, setAverageResult] = useState<AverageData[]>([]);

  useEffect(() => {
    const processedAverageData = processAverageData(data);
    setAverageResult(processedAverageData);
  }, []);

  const processAverageData = (data: CropData[]): AverageData[] => {
    const filteredData = data.map((item) => ({
      ...item,
      AreaUnderCultivation:
        parseFloat(
          item["Area Under Cultivation (UOM:Ha(Hectares))"] as string
        ) || 0,
      YieldOfCrops:
        parseFloat(
          item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as string
        ) || 0,
    }));

    const cropData: {
      [key: string]: { totalArea: number; totalYield: number; count: number };
    } = {};

    filteredData.forEach((item) => {
      const crop = item["Crop Name"];
      if (!cropData[crop]) {
        cropData[crop] = { totalArea: 0, totalYield: 0, count: 0 };
      }
      cropData[crop].totalArea += item.AreaUnderCultivation as number;
      cropData[crop].totalYield += item.YieldOfCrops as number;
      cropData[crop].count += 1;
    });

    const resultData = Object.keys(cropData).map((crop) => {
      const { totalArea, totalYield, count } = cropData[crop];
      return {
        crop,
        averageArea: (totalArea / count).toFixed(3),
        averageYield: (totalYield / count).toFixed(3),
      };
    });

    return resultData;
  };

  return (
    <Container>
      <Title order={1} style={{ margin: "20px" }}>
        Crop Avg Yield and Cultivation Area{" "}
      </Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Crop</Table.Th>
            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
            <Table.Th>
              Average Cultivation Area of the Crop between 1950-2020
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {averageResult?.map((item, index) => (
            <Table.Tr key={index}>
              <Table.Td>{item.crop}</Table.Td>
              <Table.Td>{item.averageArea}</Table.Td>
              <Table.Td>{item.averageYield}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default CropYieldCultivationRangeTable;
