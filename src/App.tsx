import CropMinMaxProductionTable from "./Components/CropMinMaxProductionTable";
import CropYieldCultivationRangeTable from "./Components/CropYieldCultivationRangeTable";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <CropMinMaxProductionTable />
      <CropYieldCultivationRangeTable />
    </MantineProvider>
  );
}

export default App;
