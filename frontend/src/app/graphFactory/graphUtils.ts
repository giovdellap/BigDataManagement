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
