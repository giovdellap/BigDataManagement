import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WriteOptions
from influxdb_client.client.write_api import SYNCHRONOUS

import pandas as pd
import time
import logging
from factory import DataFactory


_logger = logging.getLogger(__name__)

token = "ON4zZrJY__SuQJ-LPNCL1T-Jlg0hYVfPmBTF87_nT0Ie5JZMQhx87s3mhrotEJb1aPIkTt_J3S6u6vxZAl-cTg=="
org = "my-org"
url = "http://localhost:8086"
bucket="testdb"


print("porcodio")
now =  pd.Timestamp.now(tz='UTC').floor('ms')

factory = DataFactory()
set = factory.basicSet(100)
points = []

for index in range(len(set)):
    point = (
        Point("interrogation") \
        .tag("customer_ID", set[index]['customer_ID']) \
        .tag("model", set[index]["model"]) \
        .tag("version", set[index]["version"]) \
        .field("GEN", set[index]["GEN"]) \
        .field("SAT", set[index]["SAT"]) \
        .field("WLI", set[index]["WLI"]) \
        .time(set[index]['timestamp'])
    )
    points.append(point)

client = influxdb_client.InfluxDBClient(url=url, token=token, org=org, timeout=100_000)
write_api = client.write_api(write_options=WriteOptions(batch_size=50_000, flush_interval=10_000)) 
write_api.write(bucket=bucket, record=points)
write_api.close()


# Wait for the batch to be written
time.sleep(2)