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
    uid: string
    description: string
    amount: number
    paymentDate: string
    dueDate: string
    status: string
    paymentMethod: string
    duration: number
}

export interface IncomingInvestmentTableData{
    uid: string
    description: string
    amount: number
    duration: number
    dueDate: string
    status: string
}