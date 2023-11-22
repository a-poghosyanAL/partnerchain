import { connectselect } from '../../utils/constants'

export type AllFilters = ReturnType<typeof connectselect> | Record<string, never>

export interface ITable {
  accountData: { isLoading: boolean; data: IaccountData[] }
  driveData: { isLoading: boolean; data: IaccountData[] }
  accountDetailInfo: { isLoading: boolean; data: IaccountDetail[] }
  filteredData: { isLoading: boolean; data: IaccountData[] }
  filters: AllFilters
  sort: { key: SortFields | ''; dir: SortDir | '' }
  selectedFilters: { [key in keyof IaccountData]: string } | Record<string, never>
  searchValue: string
  boxData: []
  entries: number
  page: number
}

export interface IaccountData {
  account_owner: string
  partner_account_owner: string
  partner_account_name: string
  partner_company: string
  status:
    | 'Ready'
    | 'Awaiting Owner Response'
    | 'Complete'
    | 'Awaiting Partner Response'
    | 'Rejected'
  potential_revenue: number
  opportunities: number
  children_ids: string
  number_of_children: number
  shared_accounts: string
  number_of_customers: number
  number_of_prospects: number
}

export type DataCategory = keyof Pick<ITable, 'driveData' | 'accountData'>

export type IFilters = Pick<
  IaccountData,
  | 'account_owner'
  | 'partner_account_owner'
  | 'partner_account_name'
  | 'partner_company'
  | 'shared_accounts'
>

export type ISearchFields = keyof Pick<
  IaccountData,
  | 'account_owner'
  | 'partner_account_owner'
  | 'partner_account_name'
  | 'partner_company'
  | 'shared_accounts'
>

export interface IaccountDetail {
  id?: number
  account_name: string
  account_id: string
  account_type: string
  account_owner: string
  open_opps: number
  closed_won_opps: number
  owner_division: string
  owner_name: string
  owner_title: string
  owner_phone: string
  owner_email: string
  state: string
  company_size: string
  segment: string
  industry: string
  phone_number: string
  closed_opps: number
  recent_open_opp_date: string
  recent_closed_opp_date: string
  contract_renewal_date: string
  partner_company: string
  partner_account_id: string
  partner_owner_division: string
  partner_owner_phone: string
  partner_owner_title: string
  match_status: string
  partner_is_customer: string
  partner_account_owner: string
  partner_owner_email: string
  partner_owner_name: string
  partner_closed_won_opps: number
  partner_open_opps: number
  partner_account_name: string
  product: string
  potential_revenue: string
  customer: string
  owner_email_sent_datetime: string
  owner_email_response: string
  owner_email_response_datetime: string
  partner_owner_email_sent_datetime: string
  partner_owner_email_response: string
  partner_owner_email_response_datetime: string
  uploaded_user_id: string
  action: string
  status: string
  created_datetime: string
  shared_account: string
}

export type SortFields = keyof Pick<IaccountData, 'opportunities'>

export type SortDir = 'asc' | 'desc'
