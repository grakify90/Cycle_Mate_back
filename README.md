## Cycle Mate Backend

# All Endpoints

**USER**

- POST /login = get token
- POST /signup = creates new user and get token
- 🔒 GET /me = get own data
- 🔒 PATCH /update = update own user data
- 🔒 PATCH /updatepassword = update own password

**TOPICS**

- GET /topics get = all topics (user (topic creator) included, replies included)
- GET /topics/:topicId = one topic (user (topic creator) included, replies included and user (reply creators) included)
- 🔒 POST /topics = create a topic for logged in user
- 🔒 PATCH /topics/:topicId = update a topic for logged in user

**REPLIES**

- 🔒 POST /replies/:topicId = create a reply to topic for logged in user
- 🔒 PATCH /replies/:replyId = update a reply for logged in user
- 🔒 DELETE /replies/:replyId = delete a reply for logged in user

**TRIPS**

- GET /trips = all trips including user (owner) and user (participants)
- GET /trips/:tripId = one trip including user (owner) and user (participants)
- 🔒 POST /trips = create a trip for logged in user and add user as first participant to this trip

**PARTICIPANTS**

- 🔒 POST /participants/:tripId = create new participant (logged in user) for specific trip
- 🔒 DELETE /participants/:tripId = delete participant (logged in user) for specific trip
