# HS LAST: Frontend + deployed backend connection

This ZIP contains the React/Vite frontend source. It calls the separately deployed backend at:

`https://hs-backend-last-ts7x.onrender.com`

## How the connection works

- The offer checker sends `POST /api/analyze` with `{ "text": "..." }`.
- The frontend checks the response and saves it for the result screen.
- The result screen displays the returned risk, score, reasons, and recommendation instead of the old hardcoded High Risk verdict.
- The backend URL can be overridden with `VITE_API_BASE_URL` in a local `.env` file. Do not put secret API keys in frontend `VITE_` variables.

## Run locally

1. Extract the ZIP and open this folder in VS Code.
2. In a terminal, run `npm install`.
3. (Optional) Create `.env` containing `VITE_API_BASE_URL=https://hs-backend-last-ts7x.onrender.com`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite and test the “Paste Message / Text” tab.

## Deploy frontend

Push this folder to the Git repository connected to your frontend hosting provider and redeploy. The backend remains separately deployed on Render; this ZIP does not include the backend or database.

## Important limitations

- The current backend is rule-based, not a full AI model.
- Image/PDF OCR and voice transcription are not connected by this change; paste the offer text into the text tab.
- Browser requests require the backend CORS configuration to allow the frontend origin. The current backend code discussed in this project uses permissive CORS.
- A Low result is not proof that an offer is legitimate.
