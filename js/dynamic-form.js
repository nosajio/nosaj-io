import $ from 'js/$';
import api from 'js/api-service.js';

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
  postFormToApi(postUrl, values)
    .then(function handleResponse(body) {
      if (body.success) {
        form.classList.add('form--success');
      }
    });
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
  const postData = values.reduce( function (acc, val) {
    acc[val.name] = val.value;
    return acc;
  }, {});
  return api(url, 'POST', postData).catch(handleError)
}


function handleError(err) {
  console.error(err);
}
