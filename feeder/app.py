from influxdb_client_3 import InfluxDBClient3, InfluxDBError, WriteOptions, write_client_options
import pandas as pd
import time
import logging
from factory import DataFactory


_logger = logging.getLogger(__name__)

# This class handles the callbacks for the batching
class BatchingCallback(object):

    def success(self, conf, data: str):
        print(f"Written batch: {conf}")

    def error(self, conf, data: str, exception: InfluxDBError):
        print(f"Cannot write batch: {conf}, data: {data} due: {exception}")

    def retry(self, conf, data: str, exception: InfluxDBError):
        print(f"Retryable error occurs for batch: {conf}, data: {data} retry: {exception}")

callback = BatchingCallback()

# This is the configuration for the batching. This is wrapped in a WriteOptions object. Within this example you
# can see the different options that can be set for the batching.
# Batch size is the number of points to write before the batch is written to the server.
# Flush interval is the time in milliseconds to wait before the batch is written to the server.
# Jitter interval is the time in milliseconds to wait before the batch is written to the server.
# Retry interval is the time in milliseconds to wait before retrying a failed batch.
# Max retries is the maximum number of times to retry a failed batch.
# exponential base is the base for the exponential retry delay.
write_options = WriteOptions(batch_size=100,
                                        flush_interval=10_000,
                                        jitter_interval=2_000,
                                        retry_interval=5_000,
                                        max_retries=5,
                                        max_retry_delay=30_000,
                                        exponential_base=2)


# This is the configuration for the write client. This is wrapped in a WriteClientOptions object.
# As you can see we incldue the BatchingCallback object we created earlier, plus the write_options.
wco = write_client_options(success_callback=callback.success,
                          error_callback=callback.error,
                          retry_callback=callback.retry,
                          WriteOptions=write_options 
                        )

client = InfluxDBClient3(
    token="0zwfcRCAvBTytJdovSqjZo6JWTouFGwh8TQu3IYq-vxvCwG_Km6oQz39Gki_jZim3bL7JI-Kmz8fF7ug8fZopA==",
    host="http://localhost:8086",
    org="my-org",
    database="testdb", enable_gzip=True, write_client_options=wco)

now =  pd.Timestamp.now(tz='UTC').floor('ms')

_logger.info(now)

factory = DataFactory()
set = factory.basicSet(100)

try:
    client.write(set, data_frame_measurement_name='interrogation',
             data_frame_tag_columns=['customer_ID', 'model', 'version'])
except Exception as e:
    print(f"Error writing point: {e}")

# Wait for the batch to be written
time.sleep(2)