import requests
import base64
import os.path
import json

consumer_key = 'r7XUjDKRYahYtunqeYhfstJP5'
consumer_secret = 'W5b09ZOIB7wyHJl2ZfGnEYoVaXz2N60VllQMGmnJIDOeZ0Dlh7'

key_secret = '{}:{}'.format(consumer_key, consumer_secret).encode('ascii')
b64_encoded_key = base64.b64encode(key_secret)
b64_encoded_key = b64_encoded_key.decode('ascii')
base_url = 'https://api.twitter.com/'
auth_url = '{}oauth2/token'.format(base_url)
auth_headers = {
    'Authorization': 'Basic {}'.format(b64_encoded_key),
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
auth_data = {
    'grant_type': 'client_credentials'
}
auth_resp = requests.post(auth_url, headers=auth_headers, data=auth_data)
print(auth_resp.status_code)
access_token = auth_resp.json()['access_token']

trend_headers = {
    'Authorization': 'Bearer {}'.format(access_token)    
}

trend_params = {
    'id': 23424977,
}

trend_url = 'https://api.twitter.com/1.1/trends/place.json'  
trend_resp = requests.get(trend_url, headers=trend_headers, params=trend_params)
    
tweet_data = trend_resp.json()
json_string = json.dumps(tweet_data)
savePath = 'C:\\Users\\hashe\\OneDrive\\Desktop\\twitter_login\\public\\trending'
completeName = os.path.join(savePath, "trending.txt") 
file = open(completeName, "a")
for i in range(0,10):
    file.write(json.dumps(tweet_data[0]['trends'][i]) + '\n')
file.close()
