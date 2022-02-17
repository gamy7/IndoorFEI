#!/bin/bash
sleep 10 

gunicorn --bind :9000 IndoorApp.wsgi:application  --reload
