from datetime import datetime

now = datetime.now()
formatted = now.strftime("%Y-%m-%dT%H:%M:%S")

print(formatted)