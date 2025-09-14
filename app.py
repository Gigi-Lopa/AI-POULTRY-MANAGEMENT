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
import json
import re
import ollama
from prompts import getDashboardDataPrompt, getSymptomSuggestions
#TEST USER ID 689301dbdcf6195cbe60e128
#ollama run  llama3.2:1b-instruct-q4_K_M 

app = Flask(__name__)
api = Api(app=app)
cat_tz = pytz.timezone('Africa/Harare')

client = MongoClient("mongodb://localhost:27017/")
database = client.ai_poulty

users = database.users
flocks = database.flocks
feeding_schedules = database.feeding_schedules
vaccination_collection = database.vaccination_collection
CORS(app)

MODEL_NAME = "llama3.2:1b-instruct-q4_K_M"

def fix_to_json(response_str: str):
    objects = re.findall(r"\{.*?\}", response_str, re.DOTALL)
    json_str = "[" + ",".join(objects) + "]"
    return json.loads(json_str)

def generate(prompt):
    for chunk in ollama.generate(
        model=MODEL_NAME,
        prompt=prompt,
        stream=True
    ):
        yield chunk.get("response", "")

def generate_full(prompt):
    output = ""
    for chunk in ollama.generate(model=MODEL_NAME, prompt=prompt, stream=True):
        output += chunk.get("response", "")
    return output

def cleanResponse(response):
    clean_text = response.replace("\n", " ").replace("\t", "").replace("*", "")
    return clean_text 

def getDashboardAISuggestions(FLOCKS, SCHEDULES, VACCINATIONS):
    prompt = getDashboardDataPrompt(FLOCKS, SCHEDULES, VACCINATIONS)
    output =  generate_full(prompt)
    json_response = fix_to_json(output)
    return json_response

class Dashboard(Resource):
    def get(self):
        flockOwner = request.args.get("id", None)
        if not flockOwner:
            return {
                "success": False,
                "message": "User id required",
            }, 400  
        try:
            flocksCount = flocks.count_documents({"flockOwner": str(flockOwner)})
            birdsCounts = 0

            flocks_data = list(flocks.find({"flockOwner": str(flockOwner)}))

            for flock in flocks_data:
                birdsCounts += int(flock.get("numberOfBirds", 0))

            return {
                "success" : True,
                "counts": {
                    "flocksCount": flocksCount,
                    "birdCounts": birdsCounts
                    }
                }, 200
        except Exception as e:
            app.logger.error(f"Error fetching dashboard data {e}")

class AI(Resource):
    def get(self):
        flockOwner = request.args.get("id", None)
        pprint("**** GETTING SUGGESTIONS ****")
        if not flockOwner:
            return {
                "success": False,
                "message": "User id required",
            }, 400

        try:
            flocks_data = list(
                flocks.find(
                    {"flockOwner": str(flockOwner)},
                    {"_id": 0}
                ).sort("created_at", -1).limit(3)
            )
            schedules = list(feeding_schedules.find({"scheduleOwner": flockOwner}, {"_id": 0}).sort("created_at", -1).limit(3))
            vaccinations = list(vaccination_collection.find({"scheduleOwner": flockOwner}, {"_id": 0}).sort("created_at", -1).limit(3))

            AI_RECOMMENDATIONS = getDashboardAISuggestions(flocks_data, schedules, vaccinations) if len(flocks_data) != 0 else []

            return {
                "success": True,
                "message": "Dashboard data retrieved successfully",
                "AI_RECOMMENDATIONS": AI_RECOMMENDATIONS
            }, 200

        except Exception as e:
            app.logger.error(f"An error occurred getting dashboard Information: {e}")
            return {
                "success": False,
                "message": "An error occurred getting data"
            }, 500

    def post(self):
        data = request.get_json()
        user_id = data.get("user_id", None)
        prompt  =  data.get("prompt", None)
        pprint("**** GETTING HEALTH  SOMETHING ****")

        if not user_id and not prompt:
            return {
                "message" : "User ID and prompt required"
            } , 400
        try:
            PROMPT = getSymptomSuggestions(prompt)
            output = generate_full(prompt=PROMPT)
            #cleanedResponse = cleanResponse(output)

            return {
                "success" : True,
                "response":  output
            }

        except Exception as e:
            app.logger.error(f"Error returning symptom analysis")
        
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
                "message" : "User will email already exists"
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
        payload = request.get_json()
        data = payload.get("data", None)
        if not data:
            return {
                "success": False,
                "message": "Request body cannot be empty."
            }, 400

        for flock in data:
            current_flock = flocks.find_one({
                "flockOwner": str(flock.get("flockOwner")),
                "flockName": flock["flockName"]
            })

            if current_flock:
                return {
                    "success": False,
                    "isExist": True,
                    "message": "Flock already exists"
                }, 400

        BATCH_FLOCKS = []
        for flock in data:
            flockData = {
                "flockOwner": str(flock.get("flockOwner")),
                "flockName": flock["flockName"],
                "breedType": flock["breedType"],
                "numberOfBirds": flock["numberOfBirds"],
                "age": flock["age"],
                "locationCoop": flock["locationCoop"],
                "flockPurpose": flock["flockPurpose"],
                "created_at": datetime.now(cat_tz)
            }
            BATCH_FLOCKS.append(flockData)

        try:
            insert_result = flocks.insert_many(BATCH_FLOCKS)

            inserted_flocks = []
            for flockData, inserted_id in zip(BATCH_FLOCKS, insert_result.inserted_ids):
                flockData["_id"] = str(inserted_id)
                flockData["breedType"] = str(flockData["breedType"]["label"])
                flockData["flockPurpose"] = str(flockData["flockPurpose"]["label"])
                flockData.pop("flockOwner", None)
                flockData.pop("created_at", None)
                inserted_flocks.append(flockData)
        
            pprint(inserted_flocks)
            return {
                "success": True,
                "results": inserted_flocks,
                "message": f"{len(inserted_flocks)} flock(s) added successfully."
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
            feeding_schedules.delete_one({"flockID" : flock_id})
            vaccination_collection.delete_one({"flock_id" : flock_id})

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
    
    def get(self):
        id = request.args.get("id")
        if not id:
            return {
                "success": False,
                "message": "User ID is required."
            }, 400
        
        try:
            flocks_ = list(flocks.find({"flockOwner" : str(id)}))
            for flock in flocks_:
                flock["_id"] = str(flock["_id"])
                flock["age"] = str(flock["age"])
                flock["numberOfBirds"] = str(flock["numberOfBirds"])
                flock["breedType"]= flock["breedType"]["label"]
                flock["flockPurpose"] = flock["flockPurpose"]["label"]
                flock.pop("created_at", None)

            return {
                "success" : True,
                "message" : "Flocks pulled successfully",
                "results" : flocks_
            }, 200
           
        except Exception as e:
            print(f"Error returning flocks: {e}")
            return { 
                "success" : False,
                "message" : "Error occurred returning flocks"
            }, 400
class SearchFlocks(Resource):
    def get(self):
        id = request.args.get("id", None)
        query = request.args.get("q", None)

        if not query or not id:
            return {
                "success": False,
                "message": "Both 'id' and 'q' (query) are required"
            }, 400

        try:
            results = list(
                flocks.find(
                    {
                        "flockOwner": str(id),
                        "flockName": {
                            "$regex": query,
                            "$options": "i"
                        }
                    },
                    {"_id": 1, "flockName": 1}
                ).limit(5)
            )
            pprint(results)

            for result in results:
                result["_id"] = str(result["_id"])
                result["label"] = str(result["flockName"])
                result.pop("flockName", None)
            
            return {
                "success": True,
                "message": "Flocks pulled successfully",
                "flocks": results
            }, 200

        except Exception as error:
            app.logger.error(f"Error fetching flocks: {error}")
            return {
                "success": False,
                "message": "An error occurred while fetching flocks"
            }, 500
class FeedingSchedule(Resource):
    def put(self):
        payload = request.get_json()
        data = payload.get("data", None)

        if not data:
            return {"success": False, "message": "Missing data"}, 400

        flock =  flocks.find_one({"_id" : ObjectId(data.get("flockID"))})

        if not flock:
            return {
                "success" : False,
                "message" :"Flock not registered in the system"
            }
        
        schedule = {
            "scheduleOwner": data["scheduleOwner"],
            "flockID": data.get("flockID"),
            "flockName": flock.get("flockName"),
            "feed" : data.get("feed"),
            "amount" : data.get("amount"),
            "time": data["time"],
            "repeat": data.get("repeat", []),
            "notify": data.get("notify", False),
            "created_at": datetime.now()
        }
        try:
            res = feeding_schedules.insert_one(schedule)
            return {
                "success": True, 
                "result" : {
                    "_id": str(res.inserted_id),
                    "flockID": data.get("flockID"),
                    "flockName": flock.get("flockName"),
                    "feed" : data.get("feed"),
                    "amount" : data.get("amount"),
                    "time": data["time"],
                    "repeat": data.get("repeat", []),
                    "notify": data.get("notify", False),
                }}, 201
        
        except Exception as e :
            app.logger.error(f"Error inserting schedule : {e}")
            return {
                "message"  :"An error occurred"
            }, 401

    def get(self):
        user_id = request.args.get("id")
        schedules = list(feeding_schedules.find({"scheduleOwner": str(user_id)}))
        for s in schedules:
            s["_id"] = str(s["_id"])
            s["scheduleOwner"] = str(s["scheduleOwner"])
            s.pop("created_at", None)
        
        return {
            "success": True, 
            "results": schedules
        }, 200
    
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

    def delete(self):
        id = request.args.get("id", None)

        if not id:
            return{
                "message" : "Id not found"
            }, 400
        
        try:
            schedule = feeding_schedules.find_one({"_id": ObjectId(id)})
            if not schedule:
                return {
                    "success": False,
                    "message": "Schedule not found."
                }, 404

            feeding_schedules.delete_one({"_id": ObjectId(id)})
            return {
                "success": True,
                "message": "Schedule deleted successfully."
            }, 200
        
        except Exception as e:
            app.logger.error(f"An error occurred deleting schedule: {e}")
            return {
                "success" : False,
                "message" : "An error occurred deleting schedule"
            }, 500

class Vaccinations(Resource):
    def get(self):
        vaccinationOwner = request.args.get("id", None)

        if not ObjectId.is_valid(vaccinationOwner):
                return {"message": "Invalid vaccination owner ID"}, 400
        try:
            vaccinations = list(
                vaccination_collection.find({"vaccinationOwner": vaccinationOwner})
            )

            for v in vaccinations:
                flock = flocks.find_one({"_id" : ObjectId(v.get("flock_id"))})
                v["_id"] = str(v["_id"])
                v["vaccinationOwner"] = str(v["vaccinationOwner"])
                v["flockName"] = flock.get("flockName") if flock else "Unknown"
                v.pop("created_at", None)

            return {
                "success": True,
                "count": len(vaccinations),
                "results": vaccinations
            }, 200

        except Exception as e:
            app.logger.exception("Error fetching vaccination records")
            return {"message": "Error occurred while fetching vaccination records"}, 500
    
    def put(self):
        payload = request.get_json()
        data = payload.get("data", None)
        
        if not data :
            return{
                "message" : "Empty body"
            }, 400
        
        flock = flocks.find_one({"_id" : ObjectId( data.get("flockID"))})
        vaccination_doc = {
            "flock_id" : data.get("flockID", None),
            "vaccinationOwner": data.get("vaccinationOwner",),
            "vaccineName" : data.get("vaccineName"),
            "vaccineType" : data.get("vaccineType"),
            "manufacturer"  : data.get("manufacturer"),
            "dosage" : data.get("dosage"),
            "route" : data.get("route"),
            "created_at"  : datetime.now(cat_tz)
        }
        try:
            vaccination = vaccination_collection.insert_one(vaccination_doc)
            
            if vaccination.inserted_id:
                vaccination_doc["_id"] = str(vaccination.inserted_id)
                vaccination_doc["flockName"] = flock.get("flockName", "N/A")
                vaccination_doc.pop("created_at", None)

                return{
                    "success" : True,
                    "message" : "Vaccination successfully registered",
                    "vaccination"  : vaccination_doc
                }, 200
            
        except Exception as e:
            app.logger.error(f"An error occurred inserting vaccination {e}")
            return {
                "message" :"Error occurred inserting vaccination record"
            }, 500

    def delete(self):
        vaccination_id = request.args.get("id", None)
        if not ObjectId.is_valid(vaccination_id):
            return {
                "message": "Vaccination Id required"
            }, 400
        try:
            result = vaccination_collection.delete_one({"_id": ObjectId(vaccination_id)})
            if result.deleted_count == 0:
                return {"message": "Vaccination record not found"}, 404

            return {
                "success": True,
                "message": "Vaccination successfully deleted",
                "deleted_id": vaccination_id
            }, 200

        except Exception as e:
            app.logger.exception("Error deleting vaccination record")
            return {"message": "Error occurred while deleting vaccination record"}, 500

class System(Resource):
    def get(self):
        return {
            "success": True,
            "message": "System is up and running"
        }, 200
    
api.add_resource(AI, "/api/ai")
api.add_resource(Dashboard, "/api/dashboard")
api.add_resource(Flocks, "/api/flocks")
api.add_resource(Auth, "/api/auth")
api.add_resource(FeedingSchedule, "/api/feeding")
api.add_resource(SearchFlocks, "/api/flocks/s")
api.add_resource(Vaccinations, "/api/vaccinations")
api.add_resource(System, "/api/system")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    