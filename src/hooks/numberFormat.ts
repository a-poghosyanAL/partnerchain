export function formatPipelineValue(pipelineValue: number) {
  if (pipelineValue >= 1000000) {
    return (pipelineValue / 1000000).toFixed(1) + 'M'
  } else if (pipelineValue >= 1000) {
    return (pipelineValue / 1000).toFixed(0) + 'K'
  } else {
    return pipelineValue.toString()
  }
}
