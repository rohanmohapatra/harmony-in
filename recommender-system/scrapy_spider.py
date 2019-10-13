#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Oct 12 23:43:30 2019

@author: shailesh
"""



import scrapy


class QuotesSpider(scrapy.Spider):
	name = "propertyExtract"
	start_urls = [
	'https://www.magicbricks.com/property-for-sale/residential-real-estate?proptype=Multistorey-Apartment,Builder-Floor-Apartment,Penthouse,Studio-Apartment&cityName=Bangalore',
	]
	def parse(self, response):
#		page = response.url.split("/")[-2]
#		filename = 'quotes-%s.html' % page
#		with open(filename, 'wb') as f:
#			f.write(response.body)
		for container in response.css("div.m-srp-card__container"): 
			print('\n'*10 + 'hello')
			priceContainer = container.css("div.m-srp-card__info"); 
			price = priceContainer.css("div.m-srp-card__price::text").get() 
		#	print(text)
			
			descContainer = container.css("div.m-srp-card__desc")
			title = descContainer.css("span.m-srp-card__title::text").getall()
			BHK = descContainer.css("span.m-srp-card__title__bhk::text").get()
			socName = descContainer.css("a.m-srp-card__link::text").get()
	
			fieldList = []
			for summaryContainer in descContainer.css("div.m-srp-card__summary__item"):
				fieldName = summaryContainer.css("div.m-srp-card__summary__title::text").get()
				fieldValue = summaryContainer.css("div.m-srp-card__summary__info::text").get()
				fieldList.append([fieldName,fieldValue])
			
			yield{
					"price":price,
					"title":title,
					"bhk":BHK,
					"societyName":socName,
					"moreData":fieldList,
					
					}
		
		
		
		
		
		
		
		
		
		
#first = response.css("div.m-srp-card__container")[0]
#
#priceContainer = first.css("div.m-srp-card__info")
#
#priceContainer.css("div.m-srp-card__price::text").get() 




		