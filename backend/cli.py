import requests
import json

def send_prediction_request(text):
    url = "http://127.0.0.1:3000/predict"
    headers = {"Content-Type": "application/json"}
    data = {"data": text}
    response = requests.post(url, headers=headers, data=json.dumps(data))
    return response.json()

if __name__ == '__main__':
    text = input("Enter the text to be analyzed: ")
    result = send_prediction_request(text)
    print("Prediction Result:", result)
