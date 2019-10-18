# SETTING UP DJANGO

## Requirements 
```
django
djangorestframework
django-rest-auth
jsonfield
django-cors-headers
```

## Install django with pip3 

```
pip3 install django

# if the pip command fails try adding a flag --user
```

## Install django rest framework

```
pip3 install djangorestframework
```

## Install djangocorsheaders

```
pip3 install django-cors-headers
```


## Install httpie

```
pip3 install httpie
```
This is a tool to test API's in the command line. A much better curl.## Install httpie

```
pip3 install httpie
```
This is a tool to test API's in the command line. A much better curl

https://httpie.org

## Instructions to run the server

### Start off with running 

```
cd backend/ 
python3 manage.py makemigrations properties
```
*these make the migrations file that allow you to setup or modify your database*

**FIRST ENSURE THAT THERE WAS NO ERROR AND THEN**

```
python3 manage.py migrate
```
*this should make a db.sqlite3 file in current dir*
### Run the server with

```
python3 manage.py runserver
```
