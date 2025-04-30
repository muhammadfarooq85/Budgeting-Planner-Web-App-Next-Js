// Libraries Imports
import { InvoicesDataTable } from "@/components/invoices-data-table";
// Local Imports
import data from "./data.json";

function Invoices() {
  return <InvoicesDataTable data={data} />;
}

export default Invoices;
