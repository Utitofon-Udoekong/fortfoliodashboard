export interface TableHeader{
    text: string
    name: string
}

export interface WithdrawalsTableData{
    description: string
    amount: number
    planName: string
    duration: number
    roi: number
    paymentMethod: string
    currency: string
    traxId: string
    createdat: string
    status: string,
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
    status: string
}

interface Documentbody{
    name: string,
    downloadUrl: string
}

export interface KYCTableData{
    id: string
    fullName: string
    documentType: string
    documents: Documentbody[]
    submitted: string
    status: string
}

export interface InvestmentTableData{
    traxId: string
    description: string
    amount: number
    paymentDate: string
    dueDate: string
    status: string
    paymentMethod: string
    duration: number
}

export interface IncomingInvestmentTableData{
    traxId: string
    description: string
    amount: number
    duration: number
    dueDate: string
    status: string
}