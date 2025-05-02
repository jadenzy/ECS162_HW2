## ECS162 Homework 2 – Jaden Yang

### I completed this assignment before realizing a partner is needed, so I just turn in my individual work 
### Github link: https://github.com/jadenzy/ECS162_HW2.git

### Running Instructions

- **Test `api.js` (frontend):**  
  ```bash
  cd frontend && npm test
  ```
- **Test backend:**  
  ```bash
  cd backend && pytest
  ```
- **Run Docker container:**  
  ```bash
  docker-compose up --build
  ```

---

### Branches

- **frontend** – contains all Svelte files, `api.js`, and Mocha test files
- **backend** – contains the backend code and Pytest files

---

## Frontend Structure

### `/src`

- #### `/lib`
  - **`api.js`** – API call implementation:
    - Fetches articles with parameters:
      - `begin_date` and `end_date` covering a 30-day range
      - `timesTag.location: Sacramento`: even I add this, but some return articles seems in other area, I tried to use other key words but not works well 
      - `sort = newest`
    - Uses the first **9 articles** from the response since the main section is default with 9 sections 
    - Returns the 9 articles and any error

- **`app.css`**
  - Carries over CSS files from Homework 1

- **`App.svelte`**
  - Converted HTML to Svelte
  - Added loading functions
  - Updated main class layout
  - Dynamically loads images only if available

### `/test`

- **`api.test.mjs`**
  - Mocha test for `api.js`
  - Tests a **single function:** verifies that the API call returns **more than 0 articles**

---

## Backend Structure

### `app.py`

- **No changes** made to the backend implementation

### `/test`

- **`test_app.py`**
  - Tests a `GET` request to `/api/key`
    - Checks for **status code 200** and **JSON format**
  - Mocks `fake.txt` with `app.send_from_directory()`:
    - Verifies the path exists
    - Sends a `GET` request to `fake.txt`
    - Checks if **status code 200** is returned

### `requirements.txt`

- Updated to include dependencies for **Pytest**

---

## Other Updates

- Updated `config.js` and `tsconfig` for Mocha configuration
- Updated `requirements.txt` for Pytest compatibility

