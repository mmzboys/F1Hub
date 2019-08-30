FROM python:3

WORKDIR /f1hub

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

COPY . /f1hub

EXPOSE 8000

CMD ["python", "f1hub/manage.py", "runserver", "0.0.0.0:8000"]
