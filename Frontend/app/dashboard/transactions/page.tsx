// Libraries Imports
import { TransactionsDataTable } from "@/components/transactions-data-table";
// Local Imports
import data from "./data.json";

function Transactions() {
  return <TransactionsDataTable data={data} />;
}

export default Transactions;
