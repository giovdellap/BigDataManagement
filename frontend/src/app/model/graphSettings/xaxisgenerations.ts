export class XAxisGenerations {
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

export const generationsSettings: XAxisGenerations[] = [
  {
    value: 'tokens',
    type: 'linear',
    domain: [2000, 11000],
    maxRay: 5
  },
  {
    value: 'wli',
    type: 'linear',
    domain: [0, 6],
    maxRay: 30
  },
  {
    value: 'temperature',
    type: 'linear',
    domain: [0.1, 0.8],
    maxRay: 5
  },
  {
    value: 'presence_penalty',
    type: 'linear',
    domain: [0, 2],
    maxRay: 5
  }
]

export const models = [
  "all",
  "ChartGenerator",
  "ChartAnalyzer",
  "GraphPredictor",
  "MarketTracker"
]
