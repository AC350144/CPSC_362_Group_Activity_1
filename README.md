# InstantParty

### Watch a video demo of our [InstantParty Website](https://www.youtube.com/watch?v=uXWyvXYy-EQ&ab_channel=Amanda) !

### Product Vision

For solo performers, party havers, or anyone looking for a space to rent out (ranging from a small venue to a large lot), **InstantParty** is an online marketplace that connects customers with space lenders. It provides a seamless and secure platform to book or list properties. Unlike Airbnb, our product is highly automated and values customer feedback.

## Requirements

### Functional Requirements

- **User Authentication:**
  - Users must be able to log into their account using their ID and password.
  - Users can edit their account information, including ID, password, managing listings, and account deletion.
- **Listings Management:**
  - Users can post a listing of the space they want to rent out, including pictures, price, address, and a detailed description.
  - Moderators can remove listings that violate terms of service (e.g., scams).
- **User Ratings & Reviews:**
  - Each user has a rating score (separate scores for renters and rentees).
- **Search & Discovery:**
  - A map system enables users to view nearby spaces in their desired area.
  - Users can browse multiple listings before selecting one they want to learn more about.
- **Reservations & Payments:**
  - Users can view their reservation before confirming payment.
  - Users can pay after choosing a listing and confirm the purchase afterward.

### Non-Functional Requirements

- **User Engagement:**
  - Designed to maximize user interaction with an intuitive and interactive experience.
  - Includes mechanisms for collecting and analyzing user feedback (rating systems, surveys) to improve continuously.
  - Engagement metrics like session duration and retention rates should be monitored to ensure sustained user growth.
- **Security & Privacy:**
  - User data, including payment methods and personal information, must be securely stored and hidden.
- **Performance:**
  - The platform must run smoothly with no stutters, maintaining high frame rates and fast response times.
- **Cross-Platform Accessibility:**
  - The platform must be accessible on any device.
- **Usability:**
  - The system should be easy to understand and use for all users.

 ## Instructions for running the site

  - **Check out our [InstantParty Website](https://instantparty.onrender.com/login.html) , which is deployed on Render.**

  - **If you want to run it locally then follow these steps:**
## Steps to Run

### 1. Clone the Git Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Install Dependencies

We’ve made a `run.sh` file for Linux/Ubuntu users that will create a virtual environment and install the dependencies to run our app:

```bash
./run.sh
```

**If this doesn’t work for you**, manually install the following dependencies from `requirements.txt` using:

```bash
pip install "dependencyName"
```

#### Dependencies:
- `flask`, `flask-cors`
- `python3-venv`, `python-dotenv`
- `node.js`
- `express`
- `npm`
- `mongoose`, `bcrypt`, `supertest` (for backend testing)

### 3. Run the Application

> **Note:** If you ran the `run.sh` file, it will automatically start the server.  
> If you want to run it manually, navigate to the directory and run:

```bash
node backend/server.js
```

### 4. View the Application

Open a browser and go to:  
[http://localhost:10000](http://localhost:10000)

### 5. Run Backend Tests

To run backend tests with coverage:

```bash
npx jest --coverage
```

### Diagram of our site
![image](https://github.com/user-attachments/assets/58f887ef-2e93-4b2c-a332-b1f9ca65f015)

