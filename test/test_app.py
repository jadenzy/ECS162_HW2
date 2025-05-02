import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_get_api_key(client, mocker):
    mocker.patch("app.os.getenv", return_value="fake-api-key")
    response = client.get("/api/key")
    assert response.status_code == 200
    assert response.is_json
    assert response.get_json() == {"apiKey": "fake-api-key"}

def test_get_file(client, tmp_path, mocker):
    fake_file = tmp_path / "fake.txt"
    fake_file.write_text("hello")

    mocker.patch("os.path.exists", return_value=True)
    mocker.patch("app.send_from_directory", return_value=("hello", 200))

    response = client.get("/fake.txt")
    assert response.status_code == 200
