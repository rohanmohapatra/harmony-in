import requests

URL = "https://api.breezometer.com/air-quality/v2/current-conditions"

pollutants = {
'co': 'Carbon monoxide',
'c6h6': 'Benzene',
'ox': 'Photochemical oxidants',
'o3': 'Ozone',
'nh3':	'Ammonia',
'nmhc': 'Non-methane hydrocarbons',
'no': 'Nitrogen monoxide',
'nox':	'Nitrogen oxides',
'no2':	'Nitrogen dioxide',
'pm25': 'Fine particulate matter (<2.5µm)',
'pm10': 'Inhalable particulate matter (<10µm)',
'so2':	'Sulfur dioxide',
'trs':	'Total reduced sulfur'
}

def getAirQuality(lat, long):

    PARAMS = {'lat': lat, 'lon': long, 'key': "f7dd58c6c17440ceb9f574378e685d3f"}
    r = requests.get(url=URL, params=PARAMS)
    res = r.json()


    airQualityIndex = res['data']['indexes']['baqi']['aqi']
    airDescription = res['data']['indexes']['baqi']['category']
    airPollutant = res['data']['indexes']['baqi']['dominant_pollutant']

    return airDescription, airQualityIndex, pollutants[airPollutant]
