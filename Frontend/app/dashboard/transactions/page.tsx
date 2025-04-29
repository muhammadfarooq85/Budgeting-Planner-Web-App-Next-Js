// Libraries Imports
import { DataTable } from "@/components/data-table";
// Local Imports
import data from "./data.json";

function Transactions() {
  return (
    <div>
      <DataTable data={data} />
    </div>
  );
}

export default Transactions;
