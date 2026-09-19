"""
API du chatbot (fonction Python Vercel).

  GET /api/chatbot            -> message d'accueil + liste des questions
  GET /api/chatbot?id=<id>    -> réponse à la question choisie
"""
import json
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

from _chatbot_data import QUESTIONS, MESSAGE_ACCUEIL

PAR_ID = {q["id"]: q for q in QUESTIONS}


def construire_reponse(question_id):
    if not question_id:
        return 200, {
            "welcome": MESSAGE_ACCUEIL,
            "questions": [{"id": q["id"], "question": q["question"]} for q in QUESTIONS],
        }
    q = PAR_ID.get(question_id)
    if q is None:
        return 404, {"error": "Question inconnue."}
    answer = q["answer"]
    if callable(answer):
        answer = answer()
    return 200, {"id": q["id"], "answer": answer, "links": q.get("links", [])}


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        params = parse_qs(urlparse(self.path).query)
        status, payload = construire_reponse((params.get("id") or [None])[0])
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "s-maxage=300, stale-while-revalidate")
        self.end_headers()
        self.wfile.write(body)
