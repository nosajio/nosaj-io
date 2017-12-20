/*eslint no-undef: 1*/

var formsOnPage = $('[data-dynamic-form]');

formsOnPage.forEach(handleFormSubmission);

function handleFormSubmission(form) {
  form.addEventListener('submit', handleSubmitForm)
}

function handleSubmitForm(event) {
  var form = event.target;
  var postUrl = form.action;
  
  // The action attribute on the form is needed to send the form dynamically
  if (postUrl === '') {
    return;
  }
  
  var fields = getFields(form);
  var values = getFieldValues(fields);
  postFormToApi(postUrl, values);
  event.preventDefault();
  return false;
}


function getFields(form) {
  return $(form, 'input, textarea');
}


function getFieldValues(fields) {
  var fieldsArr = Array.prototype.slice.call(fields);
  return fieldsArr.map(function (f) {
    return {
      target: f,
      name: f.name,
      value: f.value
    }
  })
}


function postFormToApi(url, values) {
  api(url, 'POST', values);
}
