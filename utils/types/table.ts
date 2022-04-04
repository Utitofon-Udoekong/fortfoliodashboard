export interface TestTableHeader{
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

export interface MainTableHeader{
    id: string
    description: string
    amountInvested: string
    paymentDate: string
    dueDate: string
    status: string
}
export interface MainTableData{
    id: string
    description: string
    amountInvested: string
    paymentDate: string
    dueDate: string
    status: string
}
export interface InvestmentTableHeader{
    plan: string
    id: string
    amountInvested: string
    processed: string
    status: string
}
export interface InvestmentTableData{
    description: string
    id: string
    amountInvested: string
    processed: string
    status: string
}
export interface UsersTableHeader{
    id: string
    userName: string
    email: string
    phone: string
    verification: string
    status: string
}
export interface UsersTableData{
    id: string
    userName: string
    email: string
    phone: string
    verification: string
    status: string
}
export interface KYCTableHeader{
    id: string,
    fullName: string,
    docType: string
    documents: string
    submitted: string
    status: string
}
export interface KYCTableData{
    id: string,
    fullName: string,
    docType: string
    documents: string
    submitted: string
    status: string
}
export interface TransactionsTableHeader{
    id: string
    payment_for: string
    amount_invested: number
    payment_date: string
    due_date: string
    status: string
}
export interface TransactionsTableData{
    id: string
    payment_for: string
    amount_invested: number
    payment_date: string
    due_date: string
    status: string
}