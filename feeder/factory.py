import pandas as pd
from utils import *

class DataFactory:
    
    def basicSet(self, logs):
        
        now =  pd.Timestamp.now(tz='UTC').floor('ms')
        set = []
        for i in range (logs):
            usedModel = randomModel()
            logItem = basicLogItem()
            obj = {
                "customer_ID" : randomCustomer(),
                "model": usedModel["model"],
                "version": usedModel["version"],
                "GEN": logItem["gen"],
                "SAT": logItem["sat"],
                "WLI": logItem["wli"],
                "timestamp": now
            }
            set.append(obj)
    
        return set
    
    def hourBasicSet(self, minute_rate, 
                    start_year, start_month, start_day,
                    start_hour ):
        set = []
        print('factory')
        for minute in range (60):
            for i in range(minute_rate):
                usedModel = randomModel()
                logItem = basicLogItem()
                timestamp = randomTS(year=start_year, month=start_month, day=start_day,
                                     hour=start_hour, minute=minute)
                obj = {
                    "customer_ID" : randomCustomer(),
                    "model": usedModel["model"],
                    "version": usedModel["version"],
                    "GEN": logItem["gen"],
                    "SAT": logItem["sat"],
                    "WLI": logItem["wli"],
                    "timestamp": timestamp
                }
                set.append(obj)
            
        return set

        
        

