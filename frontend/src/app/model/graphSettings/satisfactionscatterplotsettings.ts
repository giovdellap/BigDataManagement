export class XAxisOption {
  value: string
  type: string
  domain: number[]

  constructor(value: string, type: string, domain: number[]) {
    this.value = value
    this.type = type
    this.domain = domain
  }
}

export const settings: XAxisOption[] = [
  {
    value: 'tokens',
    type: 'linear',
    domain: [2000, 11000]
  },
  {
    value: 'wli',
    type: 'linear',
    domain: [0, 6]
  },
  {
    value: 'temperature',
    type: 'linear',
    domain: [0.1, 0.8]
  },
  {
    value: 'presence_penalty',
    type: 'linear',
    domain: [0, 2]
  }
]
