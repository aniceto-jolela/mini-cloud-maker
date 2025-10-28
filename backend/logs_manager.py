import os, json, time
from logging import getLogger, FileHandler, Formatter, INFO

LOG_DIR = os.path.abspath("backend/logs")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "app.log")
EVENTS_FILE = os.path.join(LOG_DIR, "events.json")

logger = getLogger("minicloud")
logger.setLevel(INFO)
fh = FileHandler(LOG_FILE)
fh.setFormatter(Formatter("%(asctime)s %(levelname)s %(message)s"))
logger.addHandler(fh)

def load_events():
    if not os.path.exists(EVENTS_FILE):
        save_events([])
        return []
    try:
        with open(EVENTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except:
        return []

def save_events(items):
    with open(EVENTS_FILE, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=2)

def log_event(event_type, user, details=None):
    ts = int(time.time())
    item = {"ts": ts, "type": event_type, "user": user, "details": details}
    events = load_events()
    events.append(item)
    # keep last 1000
    if len(events) > 1000:
        events = events[-1000:]
    save_events(events)
    logger.info(f"{event_type} user={user} details={details}")
