import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WriteOptions
from influxdb_client.client.write_api import SYNCHRONOUS

import pandas as pd
import time
from factory import DataFactory


token = "Ph9-lWs0podQxKiQQlBEkqOm-pzm2Uz2hrzgEw_x-8sMb8FA7v9kz5Po8dL0pgALUe22V-jAU-ZbzjL9Z97VtA=="
org = "my-org"
url = "http://localhost:8086"
bucket="testdb"

print('app')
print("porcodio")
now =  pd.Timestamp.now(tz='UTC').floor('ms')

factory = DataFactory()
set = factory.hourBasicSet(minute_rate=4, 
                           start_year=2024, start_month=4,
                           start_day=1, start_hour=0)
print(set[0])
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
print(len(points))
print('sono qui')
client = influxdb_client.InfluxDBClient(url=url, token=token, org=org, timeout=30_000)
write_api = client.write_api(write_options=WriteOptions(batch_size=1_000, flush_interval=2_000)) 
write_api.write(bucket=bucket, record=points, data_frame_timestamp_column='timestamp')
write_api.close()
client.close()

print('ao')

# Wait for the batch to be written
time.sleep(2)