interface ICustomTooltip {
  active: boolean
  payload: [{ dataKey: string; value: string }]
}

export const CustomTooltip = ({ active, payload }: ICustomTooltip) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <div>
          {payload.map((pld, idx) => {
            if (pld.dataKey === 'pv') {
              return (
                <div
                  key={idx}
                  className='relative flex h-7 w-[61px] items-center justify-center rounded-[35px] bg-dark-grey p-[10px] after:absolute after:bottom-[-4px] after:h-2  after:w-2 after:rotate-45 after:border-t-0 after:border-l after:border-dark-grey after:bg-dark-grey'
                >
                  <div className='text-sm text-white'>{pld.value}%</div>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }

  return null
}
