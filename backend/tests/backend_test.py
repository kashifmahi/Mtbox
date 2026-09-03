"""MBtex Group backend API tests (Node/Express server.js behind python proxy).

Covers:
- root API health (/api/)
- contact inquiry CRUD-ish flow (POST /api/contact, GET /api/contact) + persistence
- validation (422) for bad payloads
"""
import os

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing from the process environment and /app/frontend/.env")
BASE_URL = base_url.rstrip("/")


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health / root API ---
class TestHealth:
    def test_root_api(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=30)
        assert r.status_code == 200, r.text[:300]
        assert r.json() == {"message": "MBtex Group API"}


# --- Contact inquiries ---
class TestContact:
    def test_create_and_persist(self, api_client):
        payload = {
            "name": "TEST_QA User",
            "email": "test_qa_user@example.com",
            "company": "TEST_QA Co",
            "interest": "textiles",
            "message": "TEST_QA automated regression message",
        }
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text[:300]
        data = r.json()
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["company"] == payload["company"]
        assert data["interest"] == payload["interest"]
        assert data["message"] == payload["message"]
        assert "created_at" in data
        assert "_id" not in data

        # verify persistence
        g = api_client.get(f"{BASE_URL}/api/contact", timeout=30)
        assert g.status_code == 200, g.text[:300]
        docs = g.json()
        assert isinstance(docs, list)
        assert all("_id" not in d for d in docs), "MongoDB _id leaked in GET /api/contact"
        match = [d for d in docs if d.get("id") == data["id"]]
        assert len(match) == 1, "created inquiry not persisted"
        assert match[0]["message"] == payload["message"]

    def test_optional_fields_default_null(self, api_client):
        payload = {"name": "TEST_QA Minimal", "email": "min_qa@example.com", "message": "TEST_QA minimal"}
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text[:300]
        d = r.json()
        assert d["company"] is None
        assert d["interest"] is None

    @pytest.mark.parametrize(
        "payload",
        [
            {"name": "TEST_QA", "email": "not-an-email", "message": "x"},
            {"name": "TEST_QA", "email": "a@b", "message": "x"},
            {"name": "", "email": "a@example.com", "message": "x"},
            {"name": "TEST_QA", "email": "a@example.com", "message": ""},
            {},
        ],
    )
    def test_invalid_payload_returns_422(self, api_client, payload):
        r = api_client.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)
        assert r.status_code == 422, f"expected 422 for {payload}, got {r.status_code}: {r.text[:200]}"
        assert "detail" in r.json()
