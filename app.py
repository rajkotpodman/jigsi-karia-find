# CyberDork OSINT Suite v7.0 - Python Backend Service Hooks
# Provides optional API endpoints for CORS proxying and Shodan integration

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "online",
        "service": "CyberDork OSINT API Proxy",
        "version": "7.0"
    })

@app.route('/api/osint/shodan', methods=['GET'])
def query_shodan():
    target = request.args.get('target', '9898048483')
    api_key = request.args.get('api_key', '')
    if not api_key:
        return jsonify({"error": "Shodan API key required"}), 400
    
    url = f"https://api.shodan.io/shodan/host/search?key={api_key}&query={target}"
    try:
        res = requests.get(url)
        return jsonify(res.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
