export class XAxisLoadingTime {
  value: string
  type: string
  domain: number[]
  maxRay: number

  constructor(value: string, type: string, domain: number[], maxRay: number) {
    this.value = value
    this.type = type
    this.domain = domain
    this.maxRay = maxRay
  }
}

export const pcaLoadingTimeSettings: XAxisLoadingTime[] = [
  {
    value: 'input_tokens',
    type: 'linear',
    domain: [-10000, 10000],
    maxRay: 5
  },
  {
    value: 'total_tokens',
    type: 'linear',
    domain: [-40000, 40000],
    maxRay: 5
  },
  {
    value: 'stream_messages',
    type: 'linear',
    domain: [-10, 10],
    maxRay: 7
  },
  {
    value: 'input_dimension',
    type: 'linear',
    domain: [-50, 50],
    maxRay: 5
  }
]

export const simpleLoadingTimeSettings: XAxisLoadingTime[] = [
  {
    value: 'input_tokens',
    type: 'linear',
    domain: [0, 11000],
    maxRay: 5
  },
  {
    value: 'total_tokens',
    type: 'linear',
    domain: [0, 100000],
    maxRay: 5
  },
  {
    value: 'stream_messages',
    type: 'linear',
    domain: [0, 10],
    maxRay: 7
  },
  {
    value: 'input_dimension',
    type: 'linear',
    domain: [0, 10000],
    maxRay: 5
  }
]
