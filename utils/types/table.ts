export interface TableHeader{
    text: string
    name: string
}

export interface TestTableData {
    id: string
    name: string
    position: string
    office: string
    extension: string
    startDate: string
    salary: string
}


export interface MainTableData{
    id: string
    description: string
    amountInvested: string
    paymentDate: string
    dueDate: string
    status: string
}

export interface TransactionsTableData{
    description: string
    id: number
    amountInvested: number
    processed: string
    status: string
}

// [
//     {
//       "uuid": "P7X6dGy88HTQyuQcQlZYdknZmEH2",
//       "firstName": "Etini",
//       "phoneNumber": "+123456",
//       "id": "0a93749",
//       "createdat": {
//         "_seconds": 1651498533,
//         "_nanoseconds": 697159000
//       },
//       "email": "meet@gmail.com",
//       "balance": 0,
//       "isVerified": false,
//       "lastName": "Archibong",
//       "displayName": "EA"
//     },
//   ]

export interface UsersTableData{
    id: String
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    isVerified: boolean
    createdat: object
    balance: number
    displayName: string,
}

interface Documentbody{
    name: string,
    downloadUrl: string
}

export interface KYCTableData{
    id: string
    fullName: string
    docType: string
    documents: Documentbody[]
    submitted: string
    status: string
}

export interface InvestmentTableData{
    id: number
    payment_for: string
    amount_invested: number
    payment_date: string
    due_date: string
    status: string
}