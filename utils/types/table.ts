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
    id: number
    userName: string
    email: string
    phone: string
    verification: string
    status: string
}

export interface KYCTableData{
    id: number
    fullName: string
    docType: string
    documents: string
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