import { connectselect } from '../../utils/constants'
import { generateId } from '../../utils/helpers'
import { IaccountData } from './model'

const generateDropValue = (filter: string[]) => {
  return [
    {
      id: 0,
      name: 'All',
    },
    ...filter.map((item) => ({
      id: generateId(),
      name: item,
    })),
  ]
}

const getUniqueFields = (key: keyof IaccountData, data: IaccountData[]) => {
  return [...new Set(data.map((info) => info[key] as string))]
}

export const getFilters = (data: IaccountData[]) => {
  const accountValues = data.reduce((agg: string[], val) => {
    const withDoubles = [...agg, ...val.shared_accounts.split('|')]
    return [...new Set(withDoubles)]
  }, [])

  const ownerValues = getUniqueFields('account_owner', data)

  const partnersValues = getUniqueFields('partner_company', data)

  const partnersOwnerValues = getUniqueFields('partner_account_owner', data)

  return connectselect({
    accountValues: generateDropValue(accountValues),
    ownerValues: generateDropValue(ownerValues),
    partnersValues: generateDropValue(partnersValues),
    partnersOwnerValues: generateDropValue(partnersOwnerValues),
  })
}
