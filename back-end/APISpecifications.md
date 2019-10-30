# API Specification

I want all microservices running on different ports. The microservices should be deployable. Add code and follow the API Sepcs **carefully**.
## Users Microservice

### /api/v1/users/login
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


    

    