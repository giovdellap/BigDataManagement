import influxdb_client, os, time
from influxdb_client import InfluxDBClient, Point, WriteOptions
from influxdb_client.client.write_api import SYNCHRONOUS

token = "4altES3-QQK8NhYhYSzAuY3nBSFEFExyNEMyuysXlSzc0BvDmbK4VGT94BNmZrWlY6SVrfZnftZr47CYSkFTuA=="
org = "my-org"
url = "http://localhost:8086"
bucket="testdb"

def write_data(points):
    client = influxdb_client.InfluxDBClient(url=url, token=token, org=org, timeout=30_000)
    write_api = client.write_api(write_options=WriteOptions(batch_size=1_000, flush_interval=2_000)) 
    write_api.write(bucket=bucket, record=points, data_frame_timestamp_column='timestamp')
    write_api.close()
    client.close()