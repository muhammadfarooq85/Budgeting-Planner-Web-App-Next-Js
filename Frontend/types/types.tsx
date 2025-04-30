// Auth
export interface authFormTypes {
  email: string;
  password: string;
}

// Sender and Receiver Details
interface SenderReceiverDetails {
  name: string;
  accountNumber: string;
  email: string;
  bankName: string;
  address: string;
}

export interface TransactionFormTypes {
  purposeOfTransaction: string;
  type: string;
  description: string;
  issueDate: string;
  amount: number;
  senderDetails: SenderReceiverDetails;
  receiverDetails: SenderReceiverDetails;
}

// Invoice Item
export interface InvoiceItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export interface InvoiceFormTypes {
  issueDate: string;
  dueDate: string;
  description: string;
  purposeOfInvoice: string;
  status: string;
  senderDetails: SenderReceiverDetails;
  receiverDetails: SenderReceiverDetails;
  items: InvoiceItem[];
}
