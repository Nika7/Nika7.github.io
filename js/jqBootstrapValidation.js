<input type="email" id="email" required>
<input 
  name="emailAgain"
  data-validation-matches-match="email" 
  data-validation-matches-message=
    "Must match email address entered above" 
>
<input 
  type="checkbox" 
  name="terms-and-conditions" 
  required 
  data-validation-required-message=
    "You must agree to the terms and conditions"
>
<input type="checkbox"
  name="qualityControl[]"
  value="fast"
  minchecked="2"
  data-validation-minchecked-message="Choose two"
  maxchecked="2"
  data-validation-maxchecked-message=
    "You can't have it all ways"
>