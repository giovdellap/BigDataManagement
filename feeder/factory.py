from influxdb_client import Point
import pandas as pd
from utils import *

class DataFactory:
    
    def hourBasicSet(self, minute_rate, start_hour, models_set,
                    start_year, start_month, start_day):
        set = []
        for minute in range (60):
            for i in range(minute_rate):
                usedModel = randomModel(models_set)
                logItem = basicLogItem()
                print(logItem['GEN'])
                timestamp = randomTS(year=start_year, month=start_month, day=start_day,
                                     hour=start_hour, minute=minute)
                point = (
                    Point("interrogation") \
                    .tag("model", usedModel["model"]) \
                    .tag("version", usedModel["version"]) \
                    .tag("version", usedModel["version"]) \
                    .field("GEN", logItem["GEN"]) \
                    .field("SAT", logItem["SAT"]) \
                    .field("WLI", logItem["WLI"]) \
                    .time(timestamp)
                )
                set.append(point)
            
        return set

        
        

