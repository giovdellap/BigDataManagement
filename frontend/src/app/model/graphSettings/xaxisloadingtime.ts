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

export const loadingTimeSettings: XAxisLoadingTime[] = [
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
    maxRay: 5
  },
  {
    value: 'input_dimension',
    type: 'linear',
    domain: [0, 10000],
    maxRay: 5
  }
]
