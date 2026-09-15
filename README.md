# Government Scheme Finder (GOV-01) 🇮🇳

> **"Find government schemes you may be eligible for — quickly and easily."**

A complete, modern, citizen-facing web application prototype built for discovering Indian central and state government schemes using a local dataset and deterministic rule-based matching engine.

---

## 🛡️ Deterministic & Zero AI Declaration

> **"The prototype does not use an AI model, OpenAI API, Gemini API, or any paid API. It uses deterministic rule-based matching over a structured government-scheme dataset."**

- **100% Offline Capability**: Runs completely locally in the browser without external API dependencies or backend servers.
- **Zero Hallucinations**: Every match score and recommendation explanation is computed using strict rule logic.
- **Verified Data**: Schemes reference official Indian government portals (e.g., `https://pmkisan.gov.in`, `https://pmjay.gov.in`).

---

## 🌟 Key Features

1. **Attractive Civic Landing Page**:
   - High-contrast public service header and hero section.
   - Live prototype statistics bar (20+ Schemes, 12 Categories, Pan-India Coverage).
   - 3 Feature Cards: *Personalized Scheme Discovery*, *Eligibility Checking*, *Benefits & Application Information*.
   - How It Works 3-step visual guide.

2. **Citizen Details Form ("Find Schemes for Me")**:
   - Collects personal details (Age, Gender, State, District, Income, Occupation, Social Category).
   - Additional status checkboxes (Student, Farmer, Disability, Senior Citizen, BPL, Widow, Unemployed).
   - Interactive requirement category grid + natural language prompt box ("What support are you looking for?").
   - Clear visual distinction between required and optional fields.

3. **Rule-Based Matching & Scoring Engine**:
   - Calculates relevance score up to **100 points**:
     - Requirement / Category match: **40 pts** (Category match + keyword overlap)
     - Age eligibility: **15 pts**
     - Income ceiling: **15 pts**
     - State availability: **10 pts**
     - Occupation match: **10 pts**
     - Special condition match: **10 pts**
   - Categorizes into Tiers: **Highly Relevant** (≥80%), **Relevant** (60-79%), **Possibly Eligible** (40-59%).

4. **Transparent Recommendation Explanations**:
   - For every recommended scheme, explicitly lists green checkmarks (`✓`) explaining why it was matched (e.g. *"✓ Your age (22) satisfies scheme criteria 18-35"*, *"✓ Income is within ₹3,00,000 limit"*).

5. **No-Match Fallback Handler**:
   - If user inputs produce low match scores (<40%), displays helpful guidance, nearby categories to explore, and direct links to manual catalog search.

6. **Search & Filter Catalog**:
   - Client-side keyword search matching scheme names, descriptions, ministries, tags, and documents.
   - Filter by Category, State, Ministry, Beneficiary type, and Sort order (Alphabetical A-Z, Income Ceiling).

7. **Detailed Scheme View**:
   - Bulleted list of benefits.
   - Eligibility matrix checklist.
   - Mandatory document checklist.
   - Step-by-step application instructions.
   - Direct verified official portal link button.
   - Print/Save offline functionality.

8. **Demo-Friendly Profiles**:
   - 4 instant hackathon demo profiles (Student, Small Farmer, Senior Citizen BPL, Street Vendor / Entrepreneur) to test the complete matching pipeline in one click.

---

## 🚀 Technology Stack

- **Framework**: React.js (v18+)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Custom Modern Civic Vanilla CSS Design System (`src/index.css`)
- **Data Store**: Local JSON dataset (`src/data/schemes.json`)
- **Execution**: 100% Client-side JavaScript (No backend or external API key required)

---

## 📁 Project Structure

```
government-scheme-finder/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                   # Civic sticky navigation header with mobile drawer
│   │   ├── Footer.jsx                   # Public disclaimer, dataset info, and links
│   │   ├── SchemeCard.jsx               # Scheme result card with match score & progress bar
│   │   ├── EligibilityBadge.jsx         # Tier and eligibility badges
│   │   ├── SearchFilters.jsx            # Multi-criteria catalog filter bar
│   │   ├── RecommendationExplanation.jsx # "Why recommended" bullet points builder
│   │   └── DemoProfilesModal.jsx        # Quick persona switcher for testing
│   │
│   ├── pages/
│   │   ├── Home.jsx                     # Landing page with stats & feature cards
│   │   ├── FindSchemes.jsx              # Citizen details input form
│   │   ├── Results.jsx                  # Ranked recommendations & no-match handler
│   │   ├── BrowseSchemes.jsx            # Full scheme search & filter catalog
│   │   ├── SchemeDetails.jsx            # Detailed scheme view with application steps
│   │   └── About.jsx                    # System architecture & formula documentation
│   │
│   ├── data/
│   │   └── schemes.json                 # 21 realistic Indian government schemes
│   │
│   ├── utils/
│   │   ├── eligibility.js               # Strict eligibility rule checker
│   │   ├── matching.js                  # 100-point relevance scoring algorithm
│   │   └── search.js                    # Catalog filter and search functions
│   │
│   ├── App.jsx                          # Main router state manager
│   ├── main.jsx                         # React root entry point
│   └── index.css                        # Modern civic CSS design system
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📊 Dataset Structure (`src/data/schemes.json`)

Each scheme entry follows this schema:

```json
{
  "id": "SCH001",
  "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
  "hindiName": "प्रधानमंत्री किसान सम्मान निधि",
  "ministry": "Ministry of Agriculture and Farmers Welfare",
  "category": "Agriculture",
  "description": "Direct financial support of ₹6,000 per year...",
  "benefits": [
    "Financial assistance of ₹6,000 per annum paid in 3 instalments",
    "Direct Benefit Transfer (DBT) into linked Aadhaar bank account"
  ],
  "eligibility": {
    "minAge": 18,
    "maxAge": 75,
    "gender": "All",
    "incomeLimit": 300000,
    "states": ["All India"],
    "occupation": ["Farmer"],
    "categories": ["All"],
    "farmerOnly": true
  },
  "documents": [
    "Aadhaar Card",
    "Land Ownership Documents"
  ],
  "applicationMode": "Online & Offline",
  "officialWebsite": "https://pmkisan.gov.in",
  "tags": ["agriculture", "farmer", "kisan", "financial assistance"],
  "applicationSteps": [
    "Visit official PM-KISAN portal (pmkisan.gov.in)",
    "Select New Farmer Registration and enter Aadhaar number"
  ],
  "helpline": "155261 / 011-24300606"
}
```

---

## ⚙️ Rule-Based Scoring & Eligibility Logic

### 1. Relevance Scoring (`src/utils/matching.js`)

```js
function calculateSchemeRelevance(user, scheme) {
  let score = 0;
  // 1. Requirement / Category Match (up to 40 pts)
  // 2. Age Eligibility (15 pts)
  // 3. Income Ceiling (15 pts)
  // 4. State Availability (10 pts)
  // 5. Occupation Match (10 pts)
  // 6. Special Status Flags (10 pts)
  return { score, matchPercentage, matchTier, whyRecommended, eligibility };
}
```

### 2. Strict Eligibility Check (`src/utils/eligibility.js`)

```js
function checkEligibility(user, scheme) {
  const reasons = [];
  const warnings = [];

  if (scheme.eligibility.minAge && user.age < scheme.eligibility.minAge) {
    warnings.push(`Minimum age required is ${scheme.eligibility.minAge}`);
  }
  // Income, state, occupation, and special condition checks...

  return { eligible: warnings.length === 0, reasons, warnings };
}
```

---

## 🛠️ How to Add New Schemes

To add a new scheme, open `src/data/schemes.json` and append a new object adhering to the schema:

1. Specify a unique `"id"` (e.g. `"SCH022"`).
2. Set `"name"`, `"ministry"`, and `"category"`.
3. Fill `"eligibility"` parameters (`minAge`, `maxAge`, `incomeLimit`, `states`, `occupation`, `farmerOnly`, etc.).
4. Add array of `"benefits"`, `"documents"`, `"applicationSteps"`, and valid `"officialWebsite"`.

The application will automatically pick up the new scheme for search, filtering, and scoring without any code modifications.

---

## 💻 How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Launch

1. Clone or extract the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL (typically `http://localhost:5173`) in your web browser.

### Build Production Bundle
To build for production deployment:
```bash
npm run build
```

---

## 🔮 Limitations & Future Scope

### Current Limitations
- Operates on a static offline dataset of 21 sample schemes.
- Keyword search uses exact and partial text token matching rather than vector embeddings.

### Future Scope (Optional AI Expansion)
- **Multilingual Query Support**: Natural language queries in 22 official Indian languages using local speech-to-text models.
- **Document Verification OCR**: Automatic extraction of income limits from uploaded ration cards.
- **Conversational Chatbot**: Conversational assistant guiding citizens step-by-step through government portal forms.

---

## 📜 License & Disclaimer

*This prototype provides scheme information based on the available dataset and rule-based eligibility criteria. Final eligibility and application approval are determined by the respective government department.*
