export class WLIBoxPlotSettings {
  valueAPI: string = ""
  yLabel: string = ""
  yDomain: number[] = []
  fxDomain: number[] = []
}

export class LineChartXSettings {

}

export class LineChartYSettings {

}

export const wliboxplotSettings: WLIBoxPlotSettings[] = [
  {
    valueAPI: "satisfaction",
    yLabel: "Satisfaction",
    yDomain: [0, 6],
    fxDomain: [1, 2, 3, 4, 5]
  },
  {
    valueAPI: "generations",
    yLabel: "Generations",
    yDomain: [0, 10],
    fxDomain: [1, 2, 3, 4, 5]
  },
]

export function getWLIBoxPlotSettings(value: string): WLIBoxPlotSettings {
  for (let i = 0; i < wliboxplotSettings.length; i++) {
    if(value === wliboxplotSettings[i].valueAPI) {
      return wliboxplotSettings[i]
    }
  }
  return new WLIBoxPlotSettings()
}


