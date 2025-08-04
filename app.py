from flask import Flask, request, send_file, jsonify
from pymongo import MongoClient
from flask_restful import Resource, Api
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId
from pprint import pprint
import pytz
import os


app = Flask(__name__)
api = Api(app=app)
cat_tz = pytz.timezone('Africa/Harare')

client = MongoClient("mongodb://localhost:27017/")
database = client.ai_poulty

users = database.users
flocks = database.flocks
feeding_schedules = database.feeding_schedules
CORS(app)

class Auth(Resource):
    #LOGIN FORM
    def post(self): 
        data = request.get_json()

        email  = data.get("email")
        password  = data.get("password")

        if not email and not password:
            return {
                "message" : "All fields are required"
            }, 203

        user = users.find_one({"email" : email })

        if user:
            if check_password_hash(user.get("password"), password):
                return {
                    "isValid" : True,
                    "message":  "Account found",
                    "user_id": str(user.get("_id")),
                    "name" : str(user.get("name"))
                }, 200
        
        return {
                "isValid" : False,
                "message":  "No account found"
            }, 200

    def put(self):
        data = request.get_json()
        if not data:
            return {
                "success": False,
                "message": "No input data provided"
            }, 400

        fullname = data.get("fullname", "").strip()
        email = data.get("email", "").strip().lower()
        password = data.get("password", "").strip()

        currentUser = users.find_one({"email" : email})
        if currentUser:
            return{
                "alreadyExists" : True,
                "mesaage" : "User will email already exists"
            }


        hashed_password = generate_password_hash(password)
        user_data = {
            "fullname": fullname,
            "email": email,
            "password": hashed_password,
            "joined_at": datetime.now(cat_tz)
        }

        try:
            result = users.insert_one(user_data)
            
            if result.inserted_id:
                return {
                    "success": True,
                    "message": "Account created successfully",
                    "user_id": str(result.inserted_id),
                    "name": fullname
                }, 201  

        except Exception as e:
            app.logger.error(f"Registration error: {str(e)}")
            return {
                "success": False,
                "message": "An error occurred during registration"
            }, 500

        return {
            "success": False,
            "message": "Registration failed"
        }, 400        

class Flocks(Resource):
    def __init__(self):
        self.breedTypes = {
            "broiler": "Broiler Chicken",
            "layer": "Layer Chicken",
            "free_range": "Free-Range Chicken",
            "roadrunner": "Roadrunner (Huku)",
            "quail": "Quail",
            "guinea_fowl": "Guinea Fowl",
            "turkey": "Turkey",
            "duck": "Duck"
        }
        self.flockPurposes = {
            "egg_production": "Egg production (Layers)",
            "meat_production" : "Meat production (Broilers)",
            "breeding": "Breeding", 
            "mixed_purposes":"Mixed Purposes",
        }

    def post(self):
        data = request.get_json()
        
        if not data:
            return {
                "success": False,
                "message": "Request body cannot be empty."
            }, 400

        
        required_fields = ["id", "flockName", "breedType", "numberOfBirds", "age", "locationCoop", "flockPurpose"]
        missing_fields = [field for field in required_fields if not data.get(field)]

        if missing_fields:
            return {
                "success": False,
                "message": f"Missing required fields: {', '.join(missing_fields)}"
            }, 400  
        
        flockData = {
            "flockOwner" : str(data.get("id")),
            "flockName": data["flockName"],
            "breedType": self.breedTypes.get(data["breedType"]),
            "numberOfBirds": data["numberOfBirds"],
            "age": data["age"],
            "locationCoop": data["locationCoop"],
            "flockPurpose": self.flockPurposes.get(data["flockPurpose"])
        }
        try:
            insert_result = flocks.insert_one(flockData)
            flockData["flockID"] = str(insert_result.inserted_id)

            flockData["_id"] = str(flockData["_id"]) 
            flockData.pop("flockOwner")

            pprint(flockData)
            return {
                "success": True,
                "flock": flockData,
                "message": "Flock added successfully."
            }, 200

        except Exception as e:
            app.logger.error(f"Error adding a flock: {e}")
            return {
                "success": False,
                "message": "An error occurred while adding the flock."
            }, 500

    def patch(self):
        try:
            data = request.get_json()
            if not data:
                return {
                    "success": False,
                    "message": "Request body cannot be empty."
                }, 400

            flock_id = data.get("id")
            flock = flocks.find_one({"_id": ObjectId(flock_id)})
            if not flock:
                return {
                    "success": False,
                    "message": "Flock not found."
                }, 404

            updatable_fields = ["flockName", "breedType", "numberOfBirds", "age", "locationCoop", "flockPurpose"]
            update_data = {}

            for field in updatable_fields:
                if field in data:
                    if field == "breedType":
                        update_data["breedType"] = self.breedTypes.get(data["breedType"])
                    elif field == "flockPurpose":
                        update_data["flockPurpose"] = self.flockPurposes.get(data["flockPurpose"])
                    else:
                        update_data[field] = data[field]

            if not update_data:
                return {
                    "success": False,
                    "message": "No valid fields provided for update."
                }, 400

            flocks.update_one({"_id": ObjectId(flock_id)}, {"$set": update_data})

            updated_flock = flocks.find_one({"_id": ObjectId(flock_id)})
            updated_flock["id"] = str(updated_flock["_id"])
            del updated_flock["_id"]

            return {
                "success": True,
                "flock": updated_flock,
                "message": "Flock updated successfully."
            }, 200

        except Exception as e:
            app.logger.error(f"Error updating flock: {e}")
            return {
                "success": False,
                "message": "An error occurred while updating the flock."
            }, 500

    def delete(self):
        try:
            flock_id = request.args.get("id")

            flock = flocks.find_one({"_id": ObjectId(flock_id)})
            if not flock:
                return {
                    "success": False,
                    "message": "Flock not found."
                }, 404

            flocks.delete_one({"_id": ObjectId(flock_id)})
            return {
                "success": True,
                "message": "Flock deleted successfully."
            }, 200

        except Exception as e:
            app.logger.error(f"Error deleting flock: {e}")
            return {
                "success": False,
                "message": "An error occurred while deleting the flock."
            }, 500
          

class FeedingSchedule(Resource):
    def put(self):
        data = request.get_json()
        if not data:
            return {"success": False, "message": "Missing data"}, 400

        flock =  flocks.find_one({"_id" : ObjectId(data.get("flock_id"))})

        if not flock:
            return {
                "success" : False,
                "message" :"Flock not registered in the system"
            }
        
        schedule = {
            "user_id": ObjectId(data["user_id"]),
            "flockName": flock.get("flockName"),
            "feed" : data.get("feed"),
            "amount" : data.get("ampunt"),
            "time": data["time"],
            "repeat": data.get("repeat", []),
            "notify": data.get("notify", False),
            "created_at": datetime.now()
        }
        res = feeding_schedules.insert_one(schedule)
        return {"success": True, "schedule_id": str(res.inserted_id)}, 201
    
    def get(self):
        user_id = request.args.get("id")
        schedules = list(feeding_schedules.find({"user_id": ObjectId(user_id)}))
        for s in schedules:
            s["_id"] = str(s["_id"])
        return {"success": True, "schedules": schedules}, 200
    
    def patch(self):
        data = request.get_json()
        if not data:
            return {
                "message" : "Missing information"
        }, 400

        schedule_id = data.get("schedule_id")
        notification_status = data.get("notify", False)

        feeding_schedules.update_one(
            {"_id": ObjectId(schedule_id)},
            {"$set": {"notify": notification_status}}
        )

        return {"success": True, "message": "Notification updated"}, 200


api.add_resource(Flocks, "/api/flocks")
api.add_resource(Auth, "/api/auth")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)