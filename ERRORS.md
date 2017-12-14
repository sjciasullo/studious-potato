# Errors

### Template
  - Trigger: "how to replicate error"
  - Location: "where in code"
  - Message: "what error message shows"
  - Solution: "how was error solved"
  - Problem: "what was the problem"

### Controlled component error
  - Trigger: upon typing in LoginForm on client, updates do not show
  - Location: client/src/components/Home.jsx
  - Message: n/a
  - Solution: change this.setState = {} to this.setState({})
  - Problem: syntax error using function setState()

### Syntax Error in sessions_controller
  - Trigger: submit login form from react app
  - Location: app/controllers/sessions_controller
  - Message: 500 error "internal server error" "expecting keyword_end head: ok"
  - Solution: "head: ok" to "head :ok"
  - Problem: typo