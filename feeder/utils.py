import random
from model import sets
import pandas as pd

def randomTS(year, month, day, hour, minute):
    return pd.Timestamp(year=year, month=month, day=day,
                 hour=hour, minute=minute, 
                 second=random.randint(0, 59),
                 microsecond=random.randint(0, 999))    

def randomChar():
    return chr(random.randint(65,90))

def basicLogItem():
    return {
        "GEN": random.randint(2, 4),
        "SAT": random.randint(2, 4),
        "WLI": random.randint(4, 7)
    }

def randomModel(set):
    index = set - 1
    return random.choice(sets[index]['set'])