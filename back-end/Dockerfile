FROM python:3

WORKDIR /f1hub

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . /f1hub

EXPOSE $PORT

CMD ['python', 'f1hub/manage.py', 'runserver', '0.0.0.0:$PORT']
