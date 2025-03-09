from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Izveido datubāzi, ja tā neeksistē
def init_db():
    with sqlite3.connect("plants.db") as conn:
        conn.execute("CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY, name TEXT)")
        conn.commit()

init_db()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/add_plant", methods=["POST"])
def add_plant():
    plant_name = request.json.get("name")
    if plant_name:
        with sqlite3.connect("plants.db") as conn:
            conn.execute("INSERT INTO plants (name) VALUES (?)", (plant_name,))
            conn.commit()
        return jsonify({"message": "Augs pievienots!", "name": plant_name})
    return jsonify({"error": "Auga nosaukums nav ievadīts"}), 400

@app.route("/get_plants")
def get_plants():
    with sqlite3.connect("plants.db") as conn:
        cursor = conn.execute("SELECT name FROM plants")
        plants = [row[0] for row in cursor.fetchall()]
    return jsonify(plants)

if __name__ == "__main__":
    app.run(debug=True)
