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

Technologies
  - React front end w/ Redux
  - Ruby on Rails API
  - Authentication using Token
  - D3 for data visualization