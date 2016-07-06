import requests

import requests

# Replace with your own information:
api_key = 'l7xxc4ee16434b7a4b17a5b1c7c7ad213168'         
shared_secret = 'e6122d8772be43edbc8534e6eab0eca5'            
# Leave these:
payload = 'grant_type=client_credentials&scope=user'
auth_url = 'api.transport.nsw.gov.au/auth/oauth/v2/token'

# Send a POST request to get the token back:
token_response = requests.post(('https://{}:{}@{}').format(api_key, shared_secret, auth_url), params=payload)

bearer_token = "Bearer " + token_response.json()['access_token']
print(bearer_token)