import pandas as pd

models_1 = [
    {
        "model": "ChartGenerator",
        "version": "1",
        "llm_version": "3"
    },
    {
        "model": "ChartAnalyzer",
        "version": "2",
        "llm_version": "3"
    },
    {
        "model": "GraphPredictor",
        "version": "1",
        "llm_version": "3"
    },
    {
        "model": "MarketTracker",
        "version": "2",
        "llm_version": "3"
    }
]

models_2 = [
    {
        "model": "ChartGenerator",
        "version": "1",
        "llm_version": "3"
    },
    {
        "model": "ChartAnalyzer",
        "version": "3",
        "llm_version": "4"
    },
    {
        "model": "GraphPredictor",
        "version": "2",
        "llm_version": "4"
    },
    {
        "model": "MarketTracker",
        "version": "2",
        "llm_version": "3"
    }
]

models_3 = [
    {
        "model": "ChartGenerator",
        "version": "2",
        "llm_version": "4"
    },
    {
        "model": "ChartAnalyzer",
        "version": "4",
        "llm_version": "4"
    },
    {
        "model": "GraphPredictor",
        "version": "3",
        "llm_version": "4"
    },
    {
        "model": "MarketTracker",
        "version": "3",
        "llm_version": "4"
    }
]

sets = [
    {
        "name": "suite_1",
        "set": models_1,
        "start_date": 1693526400, # 2023-09-01T00:00:00+00:00
        "end_date": 1701388800, # 2023-12-01T00:00:00+00:00     
    },
    {
        "name": "suite_2",
        "set": models_2,
        "start_date": 1701388860, # 2023-12-01T00:01:00+00:00
        "end_date": 1706745600, # 2024-02-01T00:00:00+00:00    
    },
    {
        "name": "suite_3",
        "set": models_3,
        "start_date": 1706745660, # 2024-02-01T00:01:00+00:00
        "end_date": 1714521540, # 2024-04-30T23:59:00+00:00
    },
]
