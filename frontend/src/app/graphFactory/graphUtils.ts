import * as d3 from 'd3';

export function createAxis(type: string, domain: number[], range: number[]) {
  if (type === 'linear') {
    return d3.scaleLinear()
    .domain(domain)
    .range(range);
  } else {
    return d3.scaleLinear()
  }
}

export function getDotRay(count: number, total: number) {
  return 30*count/total
}

export function getTotal(data: any) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    total = total + data[i].count
  }
  return total
}

export function getMaxCount(data: any) {
  let max_count = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i].count > max_count) {
      max_count = data[i].count
    }
  }
  return max_count
}
