#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Nov 20 10:09:54 2019

@author: shailesh
"""
import requests
import shutil
import json
import os

def parsePathRetCity(path):
	last = path.split('/')[-1]
	city = last.split('.')[0]
	return city

folderPath = "/home/shailesh/Documents/sem7/SE/harmony-in/LocationData"

for filePath in os.listdir(folderPath):
#filePath = "/home/shailesh/Documents/sem7/SE/harmony-in/LocationData/Bangalore.json"
#	fullPath = 
	propertyList = json.loads(open(folderPath+'/'+filePath).read())
	# This is the image url.
	counter = 0
	city = parsePathRetCity(filePath)
	print(city)
	for prop in propertyList:
		print(counter)
		url = prop['imgURL']
		resp = requests.get(url, stream=True)
		imgPath = 'Images/'+ city + '_' + str(counter)+'.jpg'
		counter+=1
	# Open the url image, set stream to True, this will return the stream content.
		resp = requests.get(url, stream=True)
	
	# Open a local file with wb ( write binary ) permission.
		local_file = open(imgPath, 'wb')
	
	# Set decode_content value to True, otherwise the downloaded image file's size will be zero.
		resp.raw.decode_content = True
	
	# Copy the response stream raw data to local image file.
		shutil.copyfileobj(resp.raw, local_file)
	
	# Remove the image url response object.
		del resp
		