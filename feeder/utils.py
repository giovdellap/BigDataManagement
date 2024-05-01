import random

def randomChar():
    return chr(random.randint(65,90))
        
def randomCustomer():
    return randomChar() + randomChar() + str(random.randint(10, 99)) + str(random.randint(23, 77)) + randomChar()

def randomModel():
    return random.choice(models)

def basicLogItem():
    return {
        "gen": random.randint(2, 4),
        "sat": random.randint(2, 4),
        "wli": random.randint(4, 7)
    }

models = [
    {
        "model": "ChartGenerator",
        "version": "1" 
    },
    {
        "model": "ChartGenerator",
        "version": "2" 
    },
    {
        "model": "ChartGenerator",
        "version": "3" 
    },
    {
        "model": "ChartAnalyzer",
        "version": "2" 
    },
    {
        "model": "ChartAnalyzer",
        "version": "5" 
    },
    {
        "model": "GraphPredictor",
        "version": "1" 
    },
    {
        "model": "GraphPredictor",
        "version": "1.5" 
    },
    {
        "model": "GraphPredictor",
        "version": "1.8" 
    },
    {
        "model": "MarketTracker",
        "version": "5" 
    },
    {
        "model": "MarketTracker",
        "version": "6" 
    },
    {
        "model": "MarketTracker",
        "version": "7" 
    },
]