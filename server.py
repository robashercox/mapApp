from flask import *
from flask.ext.cors import CORS
import psycopg2
import flask_restful
import json


app = Flask(__name__)
CORS(app)

conn = psycopg2.connect("host='localhost' dbname='ABS' user='app_user' password='password'")
cursor = conn.cursor()

@app.route('/')
def api_root():
    return 'Welcome'

@app.route('/query')
def tableQuery():
	# return 'yah'
    column = request.args['column'].encode('utf-8')
    print column
    print 'yah'
    cursor.execute("SELECT sa1_7digit, st_astext(the_geom), %s as data from abs_sa1_2011 as a join a2011census_b02_nsw_sa1_short as b on a.sa1_7digit::int = b.region_id::int;" %column)
    bigJson = json.dumps(cursor.fetchall()).encode('utf8')
    print bigJson
    return bigJson

    

# @app.route('/articles/<articleid>')
# def api_article(articleid):
#     return 'You are reading ' + articleid

if __name__ == '__main__':
    app.run()