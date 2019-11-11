# API Specification

I want all microservices running on different ports. The microservices should be deployable. Add code and follow the API Sepcs **carefully**.
## Users Microservice

### /api/v1/users/login 
Method : `POST`
Input:
```
{
    "username" : "rohanmohapatra",
    "password" : "9671c73253cee9b18b8df367e3e627fab2863fe8"
}
```
Password is **Sha1 encrypted**, follow this, it will be sent from the front end.

Output:
```
{
    "token" : "IgBY8WWTY4"
}
```

### /api/v1/users/register
Method : `POST`
Input:
```
{  
    "firstname" : "Rohan",
    "lastname" : "Mohapatra",
    "username" : "rohanmohapatra",
    "email" : "rohanmohapatra@harmony.in",
    "password" : "9671c73253cee9b18b8df367e3e627fab2863fe8",
    "type" : "customer"
}
```
Type : `"customer", "broker", "landlord"`

Output:
```
{
    "status" : "success"
}

{
    "status" : "failed"
}
```

### /api/v1/users/authenticate
Method : `POST`
Input:
```
{
    "token" : "IgBY8WWTY4"
}
```

Output:
```
{
    "status" : "authenticated",
    "username" : "rohanmohapatra"
}
```

## Properties Microservices

###Get all properties
### /api/v1/properties/
Method : `POST`
Input:
```
{ 
    filters: []
}
```
Output:
```

[
    {
        "id" : "propsaleXX",
        "propertyName" : "Name of the property",
        "propertyAddress" : "Address",
        "price" : "45Lacs",
        "bhk": "4 BHK Flat",
        "moreData" : 
            {
                "carpet area", "632\u00a0sqft",
                "status" : "Ready to Move", 
                "floor" : "1 out of 12 floors",
                "transaction" : "New Property", 
                "furnishing": "Semi-Furnished", 
                "facing": "South", 
                "overlooking": "Garden/Park, Main Road", 
                "car parking", "1 Covered, 1 Open", 
                "bathroom" : "2", 
                "balcony" : "1",
                "ownership" :  "Freehold"
            }
    },

]
```

### Filter Properties based query string
### /api/v1/properties/
Input:
```
{ 
    filters: []
}
```
Output : should be ordered by filter using the recommender
### /api/v1/properties/add/
Method : `POST`
Input:
```
{
    "id" : "propsaleXX",
    "propertyName" : "Name of the property",
    "propertyAddress" : "Address",
    "price" : "45Lacs",
    "bhk": "4 BHK Flat",
    "moreData" : 
        {
            "carpet area", "632\u00a0sqft",
            "status" : "Ready to Move", 
            "floor" : "1 out of 12 floors",
            "transaction" : "New Property", 
            "furnishing": "Semi-Furnished", 
            "facing": "South", 
            "overlooking": "Garden/Park, Main Road", 
            "car parking", "1 Covered, 1 Open", 
            "bathroom" : "2", 
            "balcony" : "1",
            "ownership" :  "Freehold"
        }
}
```
### /api/v1/propIds/
Method: `GET`
Input:
```
{
}
```
Output:
```
[
	'prop0002',
	'prop0001',
	'prop0060',
]
```    
