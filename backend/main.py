# import os
# import requests
# from dotenv import load_dotenv
# from flask import Flask, jsonify, request
# from flask_cors import CORS

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# def fetch_call_details(call_id):
#     url = f"https://api.vapi.ai/call/{call_id}"
#     headers = {
#         "Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}"
#     }
#     response = requests.get(url, headers=headers)
#     return response.json()

# @app.route("/call-details", methods=["GET"])
# def get_call_details():
#     call_id = request.args.get("call_id")
#     if not call_id:
#         return jsonify({"error": "Call ID is required"}), 400
    
#     try:
#         response = fetch_call_details(call_id)
#         print(response)
#         summary = response.get("summary")
#         analysis = response.get("analysis")
#         return jsonify({"analysis": analysis, "summary": summary}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
    
# if __name__ == "__main__":
#     app.run(debug=True)


import os
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Server static files from the "dist" folder under the "frontend" directory
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)

def fetch_call_details(call_id):
    """Fetch call details from the Vapi API"""
    url = f"https://api.vapi.ai/call/{call_id}"
    headers = {
        "Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.json()

@app.route("/", methods=["GET"])
def home():
    """Root endpoint to check if API is running"""
    return jsonify({"message": "API is running. Use /call-details?call_id=YOUR_CALL_ID to get call details."}), 200

@app.route("/call-details", methods=["GET"])
def get_call_details():
    """Endpoint to get call details by call_id"""
    call_id = request.args.get("call_id")
    if not call_id:
        return jsonify({"error": "Call ID is required"}), 400
    
    try:
        response = fetch_call_details(call_id)
        print("API Response:", response)
        
        summary = response.get("summary")
        analysis = response.get("analysis")
        
        return jsonify({
            "analysis": analysis, 
            "summary": summary
        }), 200
    except requests.exceptions.HTTPError as e:
        return jsonify({"error": f"API Error: {str(e)}"}), e.response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request Error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Unexpected Error: {str(e)}"}), 500

# Define the app variable for WSGI compatibility
main = app

if __name__ == "__main__":
    app.run(debug=True)