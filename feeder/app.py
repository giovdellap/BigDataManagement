from flask import Flask, request
from influxdb_client import Point
import dbhandler
import pandas as pd
import time
from factory import DataFactory

app = Flask(__name__)

@app.route('/writeSet', methods = ['POST'])
def writeSet():
    
    factory = DataFactory()
    set = factory.hourBasicSet(minute_rate=4, models_set=1,
                           start_year=2024, start_month=4,
                           start_day=1, start_hour=0)
    dbhandler.write_data(set)
    time.sleep(2)
    return 'ao'



