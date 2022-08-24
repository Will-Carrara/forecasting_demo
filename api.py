import json
import requests

def call_warp():
    """Using user specified inputs, returns data from OpenET's API.

    Args:
        args (dictionary): User specified arguments for api call

    Returns:
        result (dataframe): An pandas object with api data
    """

    # initialize request url
    url = 'https://openet-raster-api.org/experimental/forecast/warping'

    # create header
    header = {"admin_key": "hello"}

    # create payload
    args = {
        # security options
        'admin_key': 'hello',
        # temporal options            
        'end_date' : '2022-08-01',                  
        'interval' : 'monthly',   
        # spatial options
        'lon' : '-120.34557095073147',        
        'lat' : '37.543664330429905',            
        # OpenET options
        'variable'      : 'et',                       
        'model'         : 'ensemble',                    
        'ref_et_source' : 'gridmet',                                      
        # data processing options
        'units'              : 'metric',              
        'output_file_format' : 'json'              
    }

    # make request
    resp = requests.get(url=url, headers=header, params=args, verify=True)

    # turn response into dataframe
    data = json.loads(resp.text)
    return data   

call_warp()
