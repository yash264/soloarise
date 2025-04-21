import random

#  performance database
performance_DB = {
    "easy": [
        { 
            "type": "squat",
            "value": 15, 
            "tips": "Keep your chest up and back straight",
        },
        { 
            "type": "squat",
            "value": 25, 
            "tips": "Keep your chest up and back straight",
        },
        { 
            "type": "pushUps", 
            "value": 10,
            "tips": "Keep body in a straight line (don’t sag!)",
        },
        { 
            "type": "pushUps", 
            "value": 20,
            "tips": "Keep body in a straight line (don’t sag!)",
        },
        { 
            "type": "bicepsCurl",
            "value": 20, 
            "tips": "Don’t swing your arms — keep your elbows close to your torso",
        },
        { 
            "type": "bicepsCurl",
            "value": 30, 
            "tips": "Don’t swing your arms — keep your elbows close to your torso",
        },
        { 
            "type": "plank",
            "value": 30, 
            "tips": "Keep a straight line from shoulders to ankles",
        },
        { 
            "type": "plank",
            "value": 45, 
            "tips": "Keep a straight line from shoulders to ankles",
        },
    ],
    "medium": [
        {
            "type": "squat",
            "value": 45,
            "tips": "Push through heels as you come up"
        },
        {
            "type": "squat",
            "value": 60,
            "tips": "Push through heels as you come up"
        },
        {
            "type": "pushUps",
            "value": 30,
            "tips": "Don’t flare elbows too wide — keep them at 45° angle"
        },
        {
            "type": "pushUps",
            "value": 45,
            "tips": "Don’t flare elbows too wide — keep them at 45° angle"
        },
        {
            "type": "bicepsCurl",
            "value": 60,
            "tips": "Control both upward and downward motion"
        },
        {
            "type": "bicepsCurl",
            "value": 80,
            "tips": "Control both upward and downward motion"
        },
        {
            "type": "planks",
            "value": 75,
            "tips": "Press through forearms and squeeze glutes. Breathe deeply — don’t hold your breath"
        },
        {
            "type": "planks",
            "value": 90,
            "tips": "Press through forearms and squeeze glutes. Breathe deeply — don’t hold your breath"
        },
    ],
    "hard": [
        {
            "type": "squat",
            "value": 90,
            "exercise": "5 sets of 20 weighted squats (use dumbbells/barbell/backpack). 4 sets of jump squats to failure (max reps). 3 rounds of squat + hold (15 squats + 20s hold)",
            "tips": "Go below parallel (ass-to-grass depth if form allows). Keep chest up, spine neutral even with weight"
        },
        {
            "type": "pushUps",
            "value": 100,
            "exercise": "5 sets of 20–25 strict push-ups. Add variations: archer push-ups, clapping push-ups, pseudo-planche. Do push-up ladder: 1 → 10 reps, no break (55 total reps)",
            "tips": "Maintain tight plank posture throughout. Use a metronome tempo (e.g., 3s down, 1s up) for difficulty"
        },
        {
            "type": "bicepsCurl",
            "value": 150,
            "exercise": "6 sets of 30 reps using heavy dumbbells (max effort). Do slow negatives: 2s up, 4s down. Superset with pull-ups or resistance band curls",
            "tips": "Add drop sets: reduce weight mid-set and continue curling. Use a full range of motion — full extension to contraction"
        },
        {
            "type": "plank",
            "value": 150,
            "exercise": "Hold plank for 2–3 minutes. Add weighted plank (plate or weight on back). Perform dynamic planks: plank to push-up, side planks with leg raise",
            "tips": "Engage everything: abs, glutes, legs, shoulders. Mix in stability tools ( stability ball ) for advanced core control"
        },
    ],
}

def recommend_tasks(level):
    suggestions = performance_DB.get(level.lower())
    if suggestions:
        return random.sample(suggestions, 1)  # Recommend 1 random suggestions
    return []