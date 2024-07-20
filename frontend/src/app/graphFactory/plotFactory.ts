import * as Plot from "@observablehq/plot";
import { getWLIBoxPlotSettings } from "../model/plotSettings/plotSettings";
import { BasicQueryNoCountResponseItem } from "../model/queryresponses/basicQueryNoCountResponse";

export class PlotFactory {
  private margin = 80;
  private width
  private height

  constructor(width: number, height: number) {
    this.width = width - (this.margin * 2)
    this.height = height - (this.margin * 2)
  }

  getWLIBoxplot(data: BasicQueryNoCountResponseItem[], yAxis: string) {
    const settings = getWLIBoxPlotSettings(yAxis)
    let yOptions: Plot.ScaleOptions = {
      grid: true,
      interval: 1,
      label: settings.yLabel,
      domain: settings.yDomain,
    }
    let fxOptions: Plot.ScaleOptions = {
      interval: 1,
      domain: settings.fxDomain,
      label: "WLI",
      labelAnchor: "right",
      tickFormat: (x) => x.toFixed(1),
    }
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      y: yOptions,
      fx: fxOptions,
      marks: [
        //ruleY([0]),
        Plot.boxY(data, {fx: "wli", y: yAxis}),
        Plot.frame()
      ]
    })
  }

  getLineChart(data: BasicQueryNoCountResponseItem[], yAxis: string) {
    const settings = getWLIBoxPlotSettings(yAxis)
    let yOptions: Plot.ScaleOptions = {
      grid: true,
      interval: 1,
      label: settings.yLabel,
      domain: settings.yDomain,
    }
    let xOptions: Plot.ScaleOptions = {
      interval: 1,
      domain: settings.fxDomain,
      label: "WLI",
      labelAnchor: "right",
      tickFormat: (x) => x.toFixed(1),
    }
    return Plot.lineY(aapl, {x: "Date", y: "Close"}).plot({y: {grid: true}})
    return Plot.plot({
      width: this.width,
      height: this.height,
      marginLeft: this.margin,
      marginBottom: this.margin,
      y: yOptions,
      fx: fxOptions,
      marks: [
        //ruleY([0]),
        Plot.boxY(data, {fx: "wli", y: yAxis}),
        Plot.frame()
      ]
    })
  }

}
