FROM python:3.11.9

WORKDIR /app

COPY /feeder/requirements.txt /

RUN pip3 install -r /requirements.txt

COPY /feeder/. .

CMD python ./app.py
