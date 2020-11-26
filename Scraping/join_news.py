#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Nov 19 11:44:52 2020

@author: florianpesce
"""

import pandas as pd

scraping = pd.read_csv("scraping_result.csv")
dataset = pd.read_csv("news.csv")

scraping.head(10)
dataset.head(10)
