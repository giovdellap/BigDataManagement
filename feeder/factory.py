import pandas as pd
import random
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
    
        return pd.DataFrame(set).set_index('timestamp')
    

        
        

