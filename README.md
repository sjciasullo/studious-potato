# studious-potato
A Ruby-on-Rails web application with React front-end designed for conducting personal experiments based on heart rate. 

# brain-storm
MVP (setup for without arduino)
  - user can sign in and out
    - dashboard shows maybe personal data -> resting heart rate over time?
  - user can CRUD an experiment
    - db
      - description of experiment
      - name of experiment
      - maybe a type column that is auto-suggested by from relevant words in description?
    - Questions:
      - Can I link different users experiments by type? so we can do big data visualization
  - user can CRUD entries for an experiment
    - db
      - average heart rate data for session
      - notes for the session
    - questions

More Features
  - use an arduino for heart rate monitoring to do live session and analysis
  - nonuser can see big data visualizations of all users experiments 
    - require settings in profile to make your data public or private
  - tutorial w arduino 
  - logging a session with arduino shows heart beat visualization
  - logging a session with arduino shows graph over time


Technologies
  - React front end w/ Redux
  - Ruby on Rails API
  - Authentication using Token
  - D3 for data visualization

# User Stories
  1. New user wants to register an account
      1. navigate to root page
      2. click register
      3. client enters account information
      4. client clicks save user
      5. client is signed in and redirected to dashboard
  2. Returning user wants to sign in
      1. from root page, enter credentials and click login
      2. redirected to dashboard
  3. Returning user wants to create a new experiment
      1. sign in from landing page
      2. click "Create a new Experiment"
      3. enter information in form that renders: title, description, keywords
      4. click save and is redirected to that experiment's page
  4. Returning user has an experiment ready and wants to add trials to it
      1. from dashboard after sign in, click on an experiment
      2. from that experiment's page, click add new session
          - do we call it session or trial? scientific or user-friendly
      3. 
          A) *MVP*: a form opens and user can enter date and time of session, average heart rate, notes about session; user clicks save to save the session and is redirected 
          
          B) *EXTRA*: new session view shows heart-rate bubble and a blank graph
              -- START and STOP Buttons to record data, save button to publish results to experiment and redirects to experiment page or to trials page?
  5. Returning user wants to get a printout of an experiment?
      1. clicks on experiment and clicks an email button? 
      2. do we want to keep track of email and check to see if it's valid upon registration?
      
