class Model {
    
    model = ""
    version = ""

    constructor(model, version) {
        this.model = model
        this.version = version
    }
}

const models = [
    {
        model: "ChartGenerator",
        version: 1 
    },
    {
        model: "ChartGenerator",
        version: 2 
    },
    {
        model: "ChartGenerator",
        version: 3 
    },
    {
        model: "ChartAnalyzer",
        version: 2 
    },
    {
        model: "ChartAnalyzer",
        version: 5 
    },
    {
        model: "GraphPredictor",
        version: 1 
    },
    {
        model: "GraphPredictor",
        version: 1.5 
    },
    {
        model: "GraphPredictor",
        version: 1.8 
    },
    {
        model: "MarketTracker",
        version: 5 
    },
    {
        model: "MarketTracker",
        version: 6 
    },
    {
        model: "MarketTracker",
        version: 7 
    }
]

module.exports = {
    Model,
    models
}