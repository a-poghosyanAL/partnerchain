import { Pie, PieChart } from 'recharts'

interface IPieCharts {
  data01: { value: number; fill: string }[]
  width: number
  height: number
  startAngle?: number
  innerRadius?: number
  outerRadius?: number
}

const PieCharts = ({ data01, width, height, startAngle, innerRadius, outerRadius }: IPieCharts) => {
  return (
    <PieChart width={width} height={height}>
      <Pie
        stroke='none'
        data={data01}
        dataKey='value'
        cx={'50%'}
        cy={'50%'}
        innerRadius={innerRadius || 10}
        outerRadius={outerRadius || 14}
        fill='#82ca9d'
        startAngle={startAngle || -160}
      />
    </PieChart>
  )
}

export default PieCharts
