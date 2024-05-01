import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

import pandas as pd
import time
import logging
from factory import DataFactory


_logger = logging.getLogger(__name__)

token = "1TjRrLx-khqcb7m3YUz6eNrIIGHxcyN-uMoFcD1_V-6e8WZDwR2glGoNPuzJkmaMQ8APTULAu4i3uJd1xPiPuQ=="
org = "my-org"
url = "http://localhost:8086"
bucket="testdb"

write_client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)
write_api = write_client.write_api(write_options=SYNCHRONOUS) 

print("porcodio")
now =  pd.Timestamp.now(tz='UTC').floor('ms')

factory = DataFactory()
set = factory.basicSet(100)

for index in range(len(set)):
  point = (
    Point("interrogation")
    .tag("customer_ID", set[index]['customer_ID'],
                "model", set[index]["model"],
                "version", set[index]["version"])
    .field("GEN", set[index]["gen"],
                "SAT", set[index]["sat"],
                "WLI", set[index]["wli"])
  )
  write_api.write(bucket=bucket, org="my-org", record=point)
  time.sleep(1) # separate points by 1 second

# Wait for the batch to be written
time.sleep(2)