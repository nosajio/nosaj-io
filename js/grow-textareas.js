// For all textareas on screen, apply a .grow class on first focus, and keep it
// there until the page reloads
$('.textarea-field').forEach(focusEventListener.bind(null, addGrowClassName));

function focusEventListener(callback, field) {
  if (! callback || ! field) return;
  field.addEventListener('focus', function(event) {
    callback(event.target);
  });
}

function addGrowClassName(field) {
  field.classList.add('grow');
}
