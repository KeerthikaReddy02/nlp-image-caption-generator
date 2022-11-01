import requests

test_file = open("C:/Users/Drago/Downloads/boar.jpg", "rb")

test_url = "http://127.0.0.1:5000/predict"

test_response = requests.post(test_url, files = {"file": test_file})

print(test_response.text)