from opencage.geocoder import OpenCageGeocode
from pprint import pprint

key = '3b05f59469c1468d96109388aea8385a'
geocoder = OpenCageGeocode(key)

results = geocoder.geocode("Pes University, Bangalore, India")
for i in range(len(results)):
    pprint(results[i]['formatted'])
    pprint(results[i]['geometry'])
    print("----------------------------------------------------------------------")

#OUTPUT
'''
('PES University, Pie R Cube, Hosakerehalli Ward, Bengaluru - 560085, '
 'Karnataka, India')
{'lat': 12.9345503, 'lng': 77.5342966}
----------------------------------------------------------------------
('PES University, M Srinivas Road, Hosakerehalli Ward, Bengaluru - 560039, '
 'Karnataka, India')
{'lat': 12.9348875, 'lng': 77.5321598}
----------------------------------------------------------------------
('PES Food Court, M Srinivas Road, Rajarajeshwari Nagar, Bengaluru - 560085, '
 'Karnataka, India')
{'lat': 12.9336327, 'lng': 77.5343127}
----------------------------------------------------------------------
('PES Boys Hostel, Pie R Cube, Hosakerehalli Ward, Bengaluru - 560085, '
 'Karnataka, India')
{'lat': 12.9330572, 'lng': 77.5346048}
----------------------------------------------------------------------
('Union Bank of India, M Srinivas Road, Hosakerehalli Ward, Bengaluru - '
 '560085, Karnataka, India')
{'lat': 12.9342211, 'lng': 77.5345124}
----------------------------------------------------------------------
('Campus Mart, Outer Ring Road, Hosakerehalli Ward, Bengaluru - 560085, '
 'Karnataka, India')
{'lat': 12.9357187, 'lng': 77.5345513}
----------------------------------------------------------------------
('Nescafe, Outer Ring Road, Hosakerehalli Ward, Bengaluru - 560085, Karnataka, '
 'India')
{'lat': 12.9355646, 'lng': 77.5345308}
----------------------------------------------------------------------
('Cafe Coffe Day Express, Outer Ring Road, Hosakerehalli Ward, Bengaluru - '
 '560085, Karnataka, India')
{'lat': 12.9335839, 'lng': 77.5344798}
----------------------------------------------------------------------
('Parking Lot, Outer Ring Road, Hosakerehalli Ward, Bengaluru - 560085, '
 'Karnataka, India')
{'lat': 12.9345388, 'lng': 77.5357021}
----------------------------------------------------------------------
('F-Block, 5th Cross Road, Hosakerehalli Ward, Bengaluru - 560085, Karnataka, '
 'India')
{'lat': 12.9333589, 'lng': 77.5357029}
----------------------------------------------------------------------
'''


#TODO
#Pass list of locations from scraped data 