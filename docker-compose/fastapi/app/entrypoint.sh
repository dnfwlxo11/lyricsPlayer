#!/bin/bash

python model_download.py
uvicorn main:app --host 0.0.0.0 --reload