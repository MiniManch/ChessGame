# Set your Cloudinary credentials
# ==============================
from dotenv import load_dotenv

load_dotenv()

# Import the Cloudinary libraries
# ==============================
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Import to format the JSON responses
# ==============================
import json

# Set configuration parameter: return "https" URLs by setting secure=True
# ==============================
config = cloudinary.config(secure=True)


def upload_image(image_file):
	result = cloudinary.uploader.upload(image_file)
	return result['public_id']


def get_image(image_id):
	image_info = f'https://res.cloudinary.com/drzcke4vu/image/upload/v1683294873/{image_id}'
	return image_info



# import requests module
import requests
import os

def getReqInfo(url):
	r = requests.get(url)
	return (r.json())

# get game info
# getReqInfo('https://zsr.octane.gg/matches/6043152fa09e7fba40d2ae62')

# getReqInfo('https://zsr.octane.gg/players/5f3d8fdd95f40596eae23da5')

# Create model of team, region, players, game,stats and so on
def populatePlayers(listOfPlayers):
	i=0
	players = []
	for player in listOfPlayers['players']:
		if 'accounts' in player:
			print(player['accounts'][0]['id'])
# user = getReqInfo(f'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key={os.environ["STEAM_API_KEY"]}&steamids=76561197960435530')
# print(user['response']['players'][0]['avatarfull'])

populatePlayers(getReqInfo('https://zsr.octane.gg/players'))

